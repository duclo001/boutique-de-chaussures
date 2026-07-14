// Constantes du thème, partagées entre le serveur et le client.
//
// ⚠️ Ce fichier ne porte VOLONTAIREMENT pas la directive "use client".
// Il est importé à la fois par `layout.tsx` (composant serveur) et par
// `context/ThemeContext.tsx` (composant client). Si la constante vivait dans
// le fichier "use client", le layout n'en recevrait pas la valeur mais une
// référence client : la clé injectée dans le script inline serait erronée.

/** Clé du localStorage où le thème est mémorisé (cf. "boutique-cart"). */
export const THEME_STORAGE_KEY = "boutique-theme";
