# Préparation du projet — Boutique de chaussures

> Cours : Programmation web avancée — IFM29991  
> Projet : Application web e-commerce (frontend uniquement)  
> Équipe : wildguins Duclona et Rufin Derrick Keyanla Nodem Tchoupou
> Date de début : Semaine du 06 mai 2026

---

## 1. Description du projet

Le projet consiste à développer une **boutique de chaussures en ligne** sous forme d'application web *frontend uniquement*. Le site permet à un visiteur de :

- découvrir la boutique via une page d'accueil moderne (hero, produits en vedette) ;
- parcourir le catalogue complet des chaussures ;
- consulter la fiche détaillée d'un produit (images, description, variantes) ;
- choisir une **variante** (pointure et/ou couleur) qui modifie dynamiquement le **prix** et l'**image** affichés ;
- ajouter un produit au **panier**, modifier les quantités, supprimer des items, et voir le total.

Aucune base de données ni appel backend n'est utilisé : toutes les données proviennent de fichiers **JSON / TypeScript** stockés dans le projet.

### Technologies imposées
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- État global du panier via **React Context**

### Contraintes
- Pas de base de données, pas d'API externe.
- Interface **responsive** (mobile-first).
- Code propre, composants **réutilisables**, bonnes pratiques.
- Site destiné à figurer dans un portfolio → design soigné et professionnel.

---

## 2. Public cible

- Adultes 18-45 ans cherchant des chaussures tendance (sport, ville, casual).
- Utilisateurs majoritairement sur **mobile** → priorité au design responsive.

---

## 3. Architecture des pages

| Page | Route | Contenu principal |
|------|-------|-------------------|
| Accueil | `/` | Hero, présentation, produits en vedette, catégories |
| Catalogue | `/produits` | Liste de tous les produits (image, nom, prix de base) |
| Détail produit | `/produits/[id]` | Images, description, sélection variantes, ajout panier |
| Panier | `/panier` | Liste des items, modif. quantité, suppression, total |
| À propos *(optionnel)* | `/a-propos` | Présentation de la marque |
| Contact *(optionnel)* | `/contact` | Formulaire statique |

---

## 4. Structure des données (aperçu)

Exemple de structure d'un produit (`src/data/products.ts`) :

```ts
type Variant = {
  id: string;
  color: string;
  size: number;
  price: number;
  image: string;
  stock: number;
};

type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  images: string[];
  category: "sport" | "ville" | "casual" | "elegant";
  variants: Variant[];
};
```

---

## 5. Identité visuelle

### Palette de couleurs

| Rôle | Couleur | Hex |
|------|---------|-----|
| Fond principal | Blanc cassé | `#FAFAF7` |
| Fond secondaire | Sable clair | `#F1ECE4` |
| Texte principal | Noir profond | `#111111` |
| Texte secondaire | Gris foncé | `#4B4B4B` |
| Accent (CTA, prix) | Terracotta | `#C2410C` |
| Accent secondaire | Vert forêt | `#1F4D3A` |
| Bordures / séparateurs | Gris clair | `#E5E5E5` |

> Ambiance recherchée : **épurée, premium, chaleureuse** — beaucoup de blanc, typographie forte, photos produits en vedette.

### Typographie
- Titres : **Inter** ou **Geist Sans** (déjà fournie par Next.js), graisse 600-700.
- Corps : **Inter / Geist Sans**, graisse 400.
- Accents/prix : possiblement une serif élégante (ex. *Playfair Display*) on doit le valider.

### Iconographie
- Bibliothèque envisagée : **lucide-react** (on doit valider avec l'enseignant).

---

## 6. Wireframes (esquisses)

> Wireframes textuels — des maquettes plus détaillées (Figma / papier) seront ajoutées avant la Semaine 2.

### 6.1 Page d'accueil
```
┌──────────────────────────────────────────────┐
│  LOGO        Accueil  Produits  Panier       │
├──────────────────────────────────────────────┤
│                                              │
│   HERO : grande image + slogan + bouton CTA  │
│   « Découvrir la collection »                │
│                                              │
├──────────────────────────────────────────────┤
│   Produits en vedette                        │
│   [card] [card] [card] [card]                │
├──────────────────────────────────────────────┤
│   Catégories (sport / ville / casual)        │
├──────────────────────────────────────────────┤
│   FOOTER  (liens, réseaux, © 2026)           │
└──────────────────────────────────────────────┘
```

### 6.2 Page catalogue (`/produits`)
```
┌──────────────────────────────────────────────┐
│  HEADER                                      │
├──────────────────────────────────────────────┤
│  Filtres (catégorie)   |   Tri (prix, nom)   │
├──────────────────────────────────────────────┤
│  [card] [card] [card] [card]                 │
│  [card] [card] [card] [card]                 │
│  [card] [card] [card] [card]                 │
├──────────────────────────────────────────────┤
│  FOOTER                                      │
└──────────────────────────────────────────────┘
```

### 6.3 Page détail produit (`/produits/[id]`)
```
┌──────────────────────────────────────────────┐
│  HEADER                                      │
├──────────────────────────────────────────────┤
│  ┌────────────┐    Nom du produit            │
│  │            │    Prix : 129,99 $           │
│  │   IMAGE    │    Description...            │
│  │  (variante)│                              │
│  │            │    Couleur : [●][●][●]       │
│  │            │    Pointure : [38][39][40]   │
│  └────────────┘    Quantité : [- 1 +]        │
│  [thumb][thumb]    [ Ajouter au panier ]     │
├──────────────────────────────────────────────┤
│  FOOTER                                      │
└──────────────────────────────────────────────┘
```

### 6.4 Page panier (`/panier`)
```
┌──────────────────────────────────────────────┐
│  HEADER                                      │
├──────────────────────────────────────────────┤
│  Mon panier                                  │
│  ┌────┐ Nom — Couleur/Taille   Prix   [- + ] │
│  │img │                                  [X] │
│  └────┘                                      │
│  ...                                         │
├──────────────────────────────────────────────┤
│                       Total : 259,98 $       │
│                       [ Passer commande ]    │
├──────────────────────────────────────────────┤
│  FOOTER                                      │
└──────────────────────────────────────────────┘
```

---

## 7. Sites web de référence

Sources d'inspiration pour le design, l'UX et la mise en page :

- [Nike](https://www.nike.com/) — hero impactant, fiches produit riches.
- [Adidas](https://www.adidas.ca/) — sélecteurs de variantes (couleur/taille) clairs.
- [Allbirds](https://www.allbirds.com/) — minimalisme et palette chaleureuse.
- [Veja](https://www.veja-store.com/) — typographie soignée, photos produit nettes.
- [Aldo](https://www.aldoshoes.com/) — navigation responsive, filtres.
- [On Running](https://www.on.com/) — animations subtiles et structure de fiche produit.
- [Awwwards — E-commerce](https://www.awwwards.com/websites/e-commerce/) — galerie d'inspirations.

---

## 8. Organisation de l'équipe

- **Dépôt GitHub** : `boutique-de-chaussures`
- **Branches** : `main` (protégée) + branches de fonctionnalité (`feat/...`)
- **Workflow** : Pull Request + revue par l'autre coéquipier avant merge.
- **Collaborateurs** : tous les membres + compte du professeur (reviewer).
- Commits clairs, suivant un format type *Conventional Commits* simplifié (`feat:`, `fix:`, `docs:`, `style:`...).

---

## 9. Planification (échéancier officiel)

| Semaine | Objectif |
|---------|----------|
| **1** | Setup projet, GitHub, `preparation.md`, design |
| **2** | Page d'accueil + layout (header, footer, nav) |
| **3** | Pages Produits + Détail + Variantes |
| **4** | Panier (Context global), responsive, finitions, bonnes pratiques |

---

## 10. À valider avec l'enseignant

- [ ] Choix du thème (chaussures) confirmé
- [ ] Librairies externes envisagées : `lucide-react` (icônes)
- [ ] Polices Google Fonts supplémentaires (ex. Playfair Display)
