## Documentation des modifications - Fonctionnalite Panier et Menu Mobile

### 1. Objectif de la tache

L'objectif de cette partie du projet etait d'ajouter une fonctionnalite de panier fonctionnelle a la boutique de chaussures, puis d'ameliorer l'experience mobile avec un menu de navigation plus moderne.

Le panier devait permettre a l'utilisateur de :

- choisir une variante d'un produit ;
- ajouter cette variante au panier ;
- consulter les articles ajoutes ;
- modifier les quantites ;
- supprimer un article ;
- voir le total de la commande ;
- conserver le panier apres un rafraichissement de la page.

Le menu mobile devait permettre a l'utilisateur de naviguer plus facilement sur petit ecran, avec un bouton place a droite du header et un menu lateral occupant une partie de l'ecran.

---

### 2. Analyse du code existant

Avant la realisation, le projet possedait deja :

- une page d'accueil ;
- une page catalogue ;
- une page detail produit ;
- des donnees produits statiques dans `src/data/products.ts` ;
- des variantes de produits avec couleur, pointure, prix, image et stock ;
- un header avec des liens de navigation ;
- un bouton "Ajouter au panier" present dans la page detail produit.

Cependant, certaines parties n'etaient pas encore fonctionnelles :

- le bouton "Ajouter au panier" n'avait pas encore d'action ;
- la page panier n'etait pas encore creee ;
- le lien "Panier" du header ne menait pas encore vers un vrai affichage ;
- aucun etat global ne permettait de partager le panier entre les composants ;
- le panier n'etait pas sauvegarde apres rechargement de la page.

---

### 3. Choix technique

Pour gerer le panier, nous avons choisi d'utiliser **React Context**.

Ce choix est adapte au projet parce que :

- le projet est frontend uniquement ;
- aucune base de donnees n'est utilisee ;
- les donnees produits sont deja stockees dans des fichiers TypeScript ;
- plusieurs composants doivent acceder au panier, par exemple le header, la page detail produit et la page panier ;
- React Context permet d'avoir un etat global simple sans ajouter de librairie externe.

Pour conserver le panier apres un rafraichissement de la page, nous avons utilise **localStorage**.

---

### 4. Creation du contexte du panier

Un fichier a ete ajoute :

```txt
src/context/CartContext.tsx
Ce fichier contient :

le type CartItem ;
le contexte React du panier ;
le composant CartProvider ;
le hook personnalise useCart.
Le type CartItem represente un article dans le panier :

export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  color: string;
  size: number;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};
Chaque article du panier est base sur une variante precise du produit. Le champ variantId est utilise comme identifiant unique, car un meme produit peut exister en plusieurs couleurs ou pointures.

Le contexte fournit les fonctions suivantes :

addItem(item)
removeItem(variantId)
increaseQuantity(variantId)
decreaseQuantity(variantId)
clearCart()
Il fournit aussi deux valeurs calculees :

totalItems
totalPrice
totalItems sert a afficher le nombre total d'articles dans le panier.

totalPrice sert a afficher le total de la commande.

5. Persistance avec localStorage
Le panier est sauvegarde dans le navigateur avec la cle :

boutique-cart
Cela permet de conserver les articles meme si l'utilisateur recharge la page.

L'initialisation du panier se fait directement dans useState afin d'eviter les avertissements ESLint lies a l'utilisation de setState dans un useEffect.

Exemple de logique utilisee :

const [items, setItems] = useState<CartItem[]>(() => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    return JSON.parse(savedCart) as CartItem[];
  } catch {
    return [];
  }
});
La sauvegarde est ensuite faite a chaque changement du panier :

useEffect(() => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}, [items]);
6. Integration du provider dans l'application
Le CartProvider a ete ajoute autour de l'application dans :

src/app/layout.tsx
Cela permet a tous les composants enfants d'utiliser le panier avec le hook useCart.

Structure generale :

<CartProvider>
  <Header setPage={setPage} />

  <main className="flex-1">
    ...
  </main>

  <Footer />
</CartProvider>
7. Ajout au panier depuis la page detail produit
Le composant modifie est :

src/components/produits/ProduitDetail.tsx
Le hook useCart a ete importe :

import { useCart } from "@/context/CartContext";
Puis la fonction addItem a ete recuperee :

const { addItem } = useCart();
Lorsque l'utilisateur choisit une variante puis clique sur le bouton "Ajouter au panier", l'article est ajoute au panier avec les informations necessaires :

addItem({
  productId: produit.id,
  variantId: varianteChoisie.id,
  name: produit.name,
  color: varianteChoisie.color,
  size: varianteChoisie.size,
  price: varianteChoisie.price,
  image: varianteChoisie.image,
  quantity: 1,
  stock: varianteChoisie.stock,
});
Apres l'ajout, l'utilisateur est redirige vers la page panier :

setPage("panier");
8. Creation de la page panier
Un nouveau composant a ete cree :

src/components/panier/Panier.tsx
Cette page affiche deux etats principaux.

Premier etat : panier vide.

Dans ce cas, un message informe l'utilisateur que son panier est vide et un bouton permet de retourner au catalogue.

Deuxieme etat : panier avec articles.

Dans ce cas, la page affiche :

l'image du produit ;
le nom du produit ;
la couleur choisie ;
la taille choisie ;
le prix unitaire ;
la quantite ;
le total de la ligne ;
un bouton pour augmenter la quantite ;
un bouton pour diminuer la quantite ;
un bouton pour supprimer l'article ;
un resume de commande avec le total.
Les quantites sont limitees par le stock disponible de la variante.

9. Integration de la page panier dans la navigation
Le composant modifie est :

src/app/layout.tsx
Un nouveau cas a ete ajoute dans le rendu conditionnel :

page === "panier"
Cela permet d'afficher le composant Panier lorsque l'utilisateur clique sur le lien panier.

Exemple :

) : page === "panier" ? (
  <Panier setPage={setPage} />
) : (
10. Ajout du badge panier dans le header
Le composant modifie est :

src/components/layout/Header.tsx
Le hook useCart a ete utilise pour recuperer totalItems.

const { totalItems } = useCart();
Un badge est affiche sur l'icone du panier lorsque le panier contient au moins un article.

Exemple :

{totalItems > 0 && (
  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-xs font-bold text-white">
    {totalItems}
  </span>
)}
Ce badge permet a l'utilisateur de voir rapidement combien d'articles sont dans son panier.

11. Amelioration du menu mobile
Le header a aussi ete modifie pour ameliorer la navigation sur mobile.

Objectifs :

placer le bouton menu a l'extremite droite du header ;
ouvrir un menu vertical au clic ;
afficher un menu lateral moderne ;
faire en sorte que le menu occupe seulement une partie de l'ecran ;
permettre la fermeture du menu en cliquant sur la zone sombre.
Le bouton menu mobile ne doit pas avoir w-full, car cela lui ferait prendre toute la largeur du header. Il doit plutot etre un bouton carre.

Classe utilisee :

className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-accent)] md:hidden"
Le menu lateral utilise :

className="fixed inset-0 z-50 md:hidden"
Cela permet au menu de couvrir toute la hauteur et toute la largeur de l'ecran.

La partie visible de la navigation utilise :

className="relative flex h-screen w-1/2 flex-col bg-[var(--color-bg)] px-6 py-6 shadow-xl"
Explication :

h-screen : le menu prend toute la hauteur de l'ecran ;
w-1/2 : le menu prend la moitie de la largeur ;
flex-col : les liens sont affiches verticalement ;
shadow-xl : ajoute une ombre pour separer le menu du reste de la page.
Une zone sombre est ajoutee avec :

className="absolute inset-0 bg-black/30"
Cette zone permet aussi de fermer le menu lorsqu'on clique dessus.

12. Tests effectues
Plusieurs tests fonctionnels ont ete prevus pour verifier que le panier fonctionne correctement.

Test d'ajout au panier
Etapes :

Ouvrir le catalogue.
Cliquer sur un produit.
Choisir une variante.
Cliquer sur "Ajouter au panier".
Resultat attendu :

l'utilisateur est dirige vers la page panier ;
le produit apparait dans le panier ;
la couleur, la taille, le prix et l'image correspondent a la variante choisie.
Test des quantites
Etapes :

Cliquer sur le bouton +.
Verifier que la quantite augmente.
Cliquer sur le bouton -.
Verifier que la quantite diminue.
Resultat attendu :

le total de la ligne est mis a jour ;
le total general est mis a jour ;
la quantite ne depasse pas le stock disponible.
Test de suppression
Etapes :

Cliquer sur le bouton "Supprimer".
Resultat attendu :

l'article est retire du panier ;
le total est recalcule ;
si le panier est vide, un message de panier vide est affiche.
Test du badge panier
Etapes :

Ajouter un article au panier.
Observer l'icone panier dans le header.
Resultat attendu :

le badge affiche le nombre total d'articles ;
le badge se met a jour quand la quantite change ;
le badge disparait si le panier est vide.
Test de persistance
Etapes :

Ajouter un produit au panier.
Recharger la page.
Retourner au panier.
Resultat attendu :

le produit est encore present dans le panier grace a localStorage.
Test du menu mobile
Etapes :

Reduire la fenetre en format mobile.
Cliquer sur le bouton menu.
Verifier l'affichage du menu lateral.
Cliquer sur un lien.
Cliquer sur la zone sombre.
Resultat attendu :

le bouton menu est bien a droite ;
le menu s'ouvre verticalement ;
le menu prend la moitie de l'ecran ;
le menu occupe toute la hauteur ;
les liens sont affiches de haut en bas ;
le menu se ferme apres un clic sur un lien ou sur la zone sombre.
13. Commandes de verification
Pour verifier le code :

npm.cmd run lint
Pour lancer le projet :

npm.cmd run dev
Puis ouvrir dans le navigateur :

http://localhost:3000
14. Limites actuelles
Le projet utilise actuellement une navigation geree avec useState dans layout.tsx, plutot que les routes Next.js completes.

Cela fonctionne pour le projet actuel, mais cela signifie que certaines pages ne sont pas de vraies URL independantes.

Amelioration possible plus tard :

src/app/produits/page.tsx
src/app/produits/[id]/page.tsx
src/app/panier/page.tsx
Cette amelioration permettrait d'avoir de vraies routes comme :

/produits
/produits/sneaker-urbain-blanc
/panier
15. Conclusion
Cette modification ajoute une vraie base de panier e-commerce au projet. Le panier est maintenant global, reutilisable, sauvegarde dans le navigateur et connecte a la page detail produit ainsi qu'au header.

L'experience mobile a aussi ete amelioree avec un menu lateral plus clair, mieux positionne et plus adapte aux petits ecrans.