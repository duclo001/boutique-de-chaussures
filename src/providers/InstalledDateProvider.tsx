"use client"; // Composant client : nécessaire pour utiliser localStorage et le state

import { createContext, useContext, useState } from "react";

// Le contexte stocke un tuple : [dateEpoch, fonctionDeMiseÀJour]
type InstalledDateContextValue = [number, (date: number) => void];

// null tant que le Provider n'enveloppe pas le composant
const InstalledDateContext = createContext<InstalledDateContextValue | null>(
  null
);

const STORAGE_KEY = "installedDate"; // Clé unique dans localStorage

export function InstalledDateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialisation paresseuse : on lit localStorage une seule fois au montage
  const [installedDate, setInstalledDate] = useState(() => {
    // Pendant le rendu serveur (SSR), window n'existe pas
    if (typeof window === "undefined") {
      return 0;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    // Convertit la chaîne sauvegardée en nombre (epoch en secondes)
    return saved ? Number(saved) : 0;
  });

  return (
    // Partage la date et le setter avec tous les enfants
    <InstalledDateContext.Provider value={[installedDate, setInstalledDate]}>
      {children}
    </InstalledDateContext.Provider>
  );
}

// Hook personnalisé : point d'accès unique pour lire / écrire la date
export function useInstalledDate() {
  const context = useContext(InstalledDateContext);

  // Sécurité : le hook doit être appelé sous le Provider
  if (!context) {
    throw new Error(
      "useInstalledDate doit être utilisé dans InstalledDateProvider"
    );
  }

  const [installedDate, setInstalledDate] = context;

  // Wrapper : synchronise React state ET localStorage
  const setInstalledDateWithStorage = (date: number) => {
    localStorage.setItem(STORAGE_KEY, String(date));
    setInstalledDate(date);
  };

  // as const : TypeScript conserve le tuple [number, function]
  return [installedDate, setInstalledDateWithStorage] as const;
}
