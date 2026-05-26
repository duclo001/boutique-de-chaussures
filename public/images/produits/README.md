# Images produits

Toutes les images sont dans ce dossier — **structure plate, pas de sous-dossiers**.

## Convention de nommage

```
{id-produit}-{couleur}-{taille}.{ext}       ← image d'une variante
{id-produit}-{numero}.{ext}                 ← image de galerie du produit
```

- `{couleur}` : en minuscules, sans accents ni espaces  
  → "Blanc" → `blanc`, "Marron foncé" → `marron-fonce`
- `{taille}` : pointure européenne (ex. `42`)
- `{ext}` : `.jpg` de préférence (`.png`, `.webp` acceptés)

## Exemples

| Fichier                              | Correspond à                          |
|--------------------------------------|---------------------------------------|
| `sneaker-urbain-blanc-40.jpg`        | Sneaker Urbain — Blanc, taille 40     |
| `sneaker-urbain-noir-42.jpg`         | Sneaker Urbain — Noir, taille 42      |
| `sneaker-urbain-1.jpg`               | Sneaker Urbain — photo galerie n°1    |
| `runner-sport-orange-41.jpg`         | Runner Performance — Orange, taille 41|
| `derby-cuir-marron-42.jpg`           | Derby en Cuir — Marron, taille 42     |
| `boots-cuir-noir-41.jpg`             | Boots Cuir — Noir, taille 41          |

## Utilisation dans products.ts

```ts
// Image d'une variante
image: "/images/produits/sneaker-urbain-blanc-40.jpg"

// Image de galerie
images: [
  "/images/produits/sneaker-urbain-1.jpg",
  "/images/produits/sneaker-urbain-2.jpg",
]
```

## Taille recommandée

- **900 × 900 px** minimum (format carré)
- Poids : < 300 Ko par image (compresser sur [squoosh.app](https://squoosh.app))
