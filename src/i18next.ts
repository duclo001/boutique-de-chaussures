"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { loadResources } from "@/utils/loadResources";

// Initialise i18next une seule fois dans le navigateur.
if (!i18n.isInitialized) {
    void i18n
        // Détecte la langue préférée de l'utilisateur.
        .use(LanguageDetector)

        // Rend les traductions disponibles dans les composants React.
        .use(initReactI18next)

        // Configure les langues et les ressources de traduction.
        .init({
            resources: loadResources(),
            // Utilise la même langue pendant le rendu serveur et l'hydratation.
            lng: "fr",

            // Langue utilisée lorsqu'aucune préférence n'est disponible.
            fallbackLng: "fr",

            // Langues disponibles dans l'application.
            supportedLngs: ["fr", "en"],

            // Transforme notamment "fr-CA" en "fr".
            load: "languageOnly",

            // Namespaces disponibles.
            ns: ["common", "header", "contact", "footer", "home", "products", "cart"],


            // Namespace utilisé lorsqu'aucun namespace n'est précisé.
            defaultNS: "common",

            // React protège déjà les textes contre les injections HTML.
            interpolation: {
                escapeValue: false,
            },

            // Évite l'utilisation de Suspense pendant le chargement.
            react: {
                useSuspense: false,
            },

            // Ordre utilisé pour déterminer la langue.
            detection: {
                order: ["localStorage", "navigator"],
                caches: ["localStorage"],
            },

        });
}

export default i18n;

// initReactI18next connecte i18next à React ;
// LanguageDetector détecte la langue du navigateur ;
// fallbackLng: "fr" conserve le français comme langue par défaut ;
// localStorage mémorise le choix de l’utilisateur ;
// loadResources() fournit les six fichiers JSON.