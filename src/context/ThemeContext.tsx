"use client";

// Contexte de thème (clair / sombre) partagé par toute l'application.
// Le ThemeProvider englobe l'app dans `layout.tsx` ; n'importe quel composant
// peut ensuite lire le thème avec le hook `useTheme()`.
//
// Le thème est persisté dans le localStorage : il survit au rechargement.
// Au tout premier passage, on suit la préférence système de l'utilisateur.
//
// La source de vérité n'est PAS un useState, mais l'attribut `data-theme`
// posé sur <html>. On le lit avec `useSyncExternalStore`, exactement comme
// le panier lit le localStorage dans `src/lib/cartStore.ts`. Avantages :
//   - pas de setState dans un useEffect (rendus en cascade) ;
//   - pas d'erreur d'hydratation : React utilise `getServerSnapshot` tant que
//     la page n'est pas hydratée, puis bascule sur la vraie valeur.

import { createContext, useContext, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

// Les deux seules valeurs possibles pour le thème.
type Theme = "light" | "dark";

// Ce que le contexte expose aux composants enfants.
type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

// ── Store externe : l'attribut data-theme de <html> ────────────────

const abonnes = new Set<() => void>();

function notifier() {
  for (const ecouteur of abonnes) ecouteur();
}

/** Abonne un composant aux changements de thème (et aux autres onglets). */
function subscribe(callback: () => void): () => void {
  abonnes.add(callback);

  // Si l'utilisateur change le thème dans un autre onglet, on s'aligne.
  function onStorage(event: StorageEvent) {
    if (event.key === THEME_STORAGE_KEY) {
      document.documentElement.dataset.theme =
        event.newValue === "dark" ? "dark" : "light";
      callback();
    }
  }
  window.addEventListener("storage", onStorage);

  return () => {
    abonnes.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

/** Thème réellement appliqué (posé par le script inline de layout.tsx). */
function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** Côté serveur, aucun DOM ni localStorage : on annonce le mode clair. */
function getServerSnapshot(): Theme {
  return "light";
}

/** Applique un thème : <html data-theme>, localStorage, puis notification. */
function appliquerTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // ignore (localStorage indisponible : navigation privée, etc.)
  }

  notifier();
}

// ── Contexte ───────────────────────────────────────────────────────

// Le contexte vaut `null` tant qu'aucun ThemeProvider ne l'entoure :
// cela permet à `useTheme()` de détecter l'oubli du Provider.
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lit le thème appliqué. Se re-rend tout seul à chaque bascule.
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Passe du clair au sombre, et inversement.
  function toggleTheme() {
    appliquerTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook maison : donne accès au thème et à la fonction de bascule.
export function useTheme() {
  const context = useContext(ThemeContext);

  // Garde-fou : signale clairement l'oubli du ThemeProvider.
  if (!context) {
    throw new Error("useTheme doit être utilisé à l'intérieur d'un ThemeProvider.");
  }

  return context;
}
