# Pr�paration du projet � Boutique de chaussures

## Objectif du projet
Cr�er un site e-commerce simple pour une boutique de vente de chaussures.
L'objectif est d'avoir une page d'accueil, une galerie de produits, un panier et une navigation claire.

## Stack technique
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Pr�requis
- Node.js install� (version 18+ recommand�e)
- npm disponible
- Connaissance basique de React / Next.js

## Commandes principales
- `npm install` : installer les d�pendances
- `npm run dev` : lancer le serveur de d�veloppement
- `npm run build` : construire pour la production
- `npm run start` : d�marrer l'application en production

## Structure du projet
- `src/app/page.tsx` : page d'accueil actuelle � remplacer par ta page boutique
- `src/app/layout.tsx` : structure globale et styles partag�s
- `src/app/globals.css` : styles globaux et configuration Tailwind
- `public/` : images et assets statiques

## Pages / routes � pr�voir
- `/` : page d'accueil avec pr�sentation de la boutique
- `/produits` ou `/collections` : liste des chaussures disponibles
- `/produit/[id]` : page d�tail d'un produit
- `/panier` : page du panier avec montant total et validation
- `/contact` : page contact ou informations de boutique

## Fonctionnalit�s essentielles
- affichage des produits avec image, nom, prix et description
- ajout au panier
- visualisation du panier avec quantit� et total
- navigation simple et responsive
- header et pied de page

## Contenu utile pour d�marrer
- logo ou nom de la boutique
- cat�gories de chaussures (homme, femme, enfant, sport)
- descriptions courtes pour chaque produit
- contact / adresse / r�seaux sociaux

## Prochaines �tapes
1. remplacer le contenu de `src/app/page.tsx` par une page d'accueil personnalis�e
2. cr�er une liste de produits (data statique ou JSON)
3. ajouter une page de catalogue et une page d�tail produit
4. impl�menter un panier basique en local state

## Conseils
- commencer par une version statique avant de g�rer le panier dynamique
- utiliser Tailwind pour un rendu rapide et responsive
- garder le design simple et clair
- tester sur mobile et desktop
