"use client";

import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18next";

type I18nProviderProps = {
    children: ReactNode;
};

export default function I18nProvider({
    children,
}: I18nProviderProps) {
    useEffect(() => {
        function updateDocumentLanguage(language: string) {
            document.documentElement.lang = language.startsWith("en") ? "en" : "fr";
        }

        i18n.on("languageChanged", updateDocumentLanguage);

        // Récupère la préférence après l'hydratation.
        const storedLanguage = localStorage.getItem("i18nextLng");
        const detectedLanguage = storedLanguage ?? navigator.language;

        const language = detectedLanguage.startsWith("en") ? "en" : "fr";

        updateDocumentLanguage(language);
        void i18n.changeLanguage(language);

        return () => {
            i18n.off("languageChanged", updateDocumentLanguage);
        };
    }, []);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}