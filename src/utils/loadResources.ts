// Importe les traductions françaises.
import commonFr from "@/locales/fr/common.json";
import headerFr from "@/locales/fr/header.json";
import contactFr from "@/locales/fr/contact.json";
import footerFr from "@/locales/fr/footer.json";
import homeFr from "@/locales/fr/home.json";
import productsFr from "@/locales/fr/products.json";
import cartFr from "@/locales/fr/cart.json";

// Importe les traductions anglaises.
import commonEn from "@/locales/en/common.json";
import headerEn from "@/locales/en/header.json";
import contactEn from "@/locales/en/contact.json";
import footerEn from "@/locales/en/footer.json";
import homeEn from "@/locales/en/home.json";
import productsEn from "@/locales/en/products.json";
import cartEn from "@/locales/en/cart.json";

// Regroupe les traductions par langue et par namespace.
const resources = {
    fr: {
        common: commonFr,
        header: headerFr,
        contact: contactFr,
        footer: footerFr,
        home: homeFr,
        products: productsFr,
        cart: cartFr,
    },
    en: {
        common: commonEn,
        header: headerEn,
        contact: contactEn,
        footer: footerEn,
        home: homeEn,
        products: productsEn,
        cart: cartEn,
    },
};

// Retourne toutes les ressources utilisées par i18next.
export function loadResources() {
    return resources;
}