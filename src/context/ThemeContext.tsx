"use client";

// Contexte de thème (clair / sombre) partagé par toute l'application.
// Le ThemeProvider englobe l'app dans `layout.tsx` ; n'importe quel composant
// peut ensuite lire le thème avec le hook `useTheme()`.

import { createContext, useContext, useEffect, useState } from "react";

// Les deux seules valeurs possibles pour le thème.
type Theme = "light" | "dark";

// Ce que le contexte expose aux composants enfants.
type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

// Le contexte vaut `null` tant qu'aucun ThemeProvider ne l'entoure :
// cela permet à `useTheme()` de détecter l'oubli du Provider.
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // État du thème, clair au démarrage.
  const [theme, setTheme] = useState<Theme>("light");

  // Passe du clair au sombre, et inversement.
  function toggleTheme() {
    setTheme((actuel) => (actuel === "light" ? "dark" : "light"));
  }

  // Recopie le thème sur la balise <html> : <html data-theme="dark">.
  // globals.css redéfinit alors les variables de couleur, ce qui repeint
  // toute l'application d'un seul coup (accueil, produits, panier, contact).
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

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
