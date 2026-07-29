"use client"; // Nécessaire : écoute d'événements navigateur + localStorage

import { useEffect, useState } from "react";
import { HiDownload } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useInstalledDate } from "@/providers/InstalledDateProvider";

// Type de l'événement beforeinstallprompt (non standard dans les libs DOM)
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>; // Affiche la boîte d'installation native
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>; // Choix de l'utilisateur
}

export default function InstallPrompt() {
  const { t } = useTranslation("common");

  // L'événement capturé pour déclencher l'installation plus tard
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  // Date de dernière fermeture de la bannière (epoch en secondes)
  const [installDate, setInstallDate] = useInstalledDate();
  // Horodatage courant au montage (évite de recalculer Date.now() à chaque rendu)
  const [currentDate] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    // Intercepte l'événement PWA avant que le navigateur n'affiche son propre prompt
    const getInstallPrompt = (event: Event) => {
      event.preventDefault(); // Empêche le mini-infobar par défaut (Chrome)
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", getInstallPrompt);

    // Nettoyage : retire l'écouteur au démontage
    return () => {
      window.removeEventListener("beforeinstallprompt", getInstallPrompt);
    };
  }, []);

  // Fermeture manuelle : masque la bannière et mémorise la date (délai 24 h)
  const handleClose = () => {
    setInstallPrompt(null);
    setInstallDate(currentDate);
  };

  // Lance le dialogue d'installation du navigateur
  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    // Si accepté, on retire la bannière immédiatement
    if (outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  // Masqué si : pas d'événement PWA, OU moins de 86400 s (24 h) depuis la fermeture
  if (!installPrompt || currentDate - installDate < 86400) {
    return null;
  }

  return (
    <div className="container-app mt-2">
      {/* Couleurs branchées sur les variables de thème : la bannière suit le
          mode clair / sombre du site, contrairement au style slate du cours. */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 shadow-sm">
        <button
          type="button"
          onClick={handleInstall}
          className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
        >
          <HiDownload className="text-xl text-[var(--color-accent)]" />
          {t("pwa.install")}
        </button>

        <button
          type="button"
          onClick={handleClose}
          className="text-2xl text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          aria-label={t("pwa.close")}
        >
          <IoIosCloseCircle />
        </button>
      </div>
    </div>
  );
}
