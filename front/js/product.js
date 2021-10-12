// Fonction récupération ID
let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
function getArticleId() {
  return new URL(location.href).searchParams.get("id")
}

const articleId = getArticleId() 

fetch(`http://localhost:3000/api/products/${articleId}`)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    createArticle(value);  
    color(value); 
    createObject(value);
})
.catch(function(error) {
    // Une erreur est survenue
});

function createArticle(value) {

  // Image

  let articleImg = document.createElement("img");
  articleImg.classList.add("article-Img");
  articleImg = new Image (300, 500);
  articleImg.src = item__img.appendChild(articleImg).imgContent = value.imageUrl;

  // Nom produit

  let productName = document.createElement("h1");
  productName.classList.add("productName");

  title.appendChild(productName).textContent = value.name;


  // Prix produit

  let articlePrice = document.createElement("span");
  articlePrice.classList.add("article-price");

  price.appendChild(articlePrice).textContent = value.price/100;

  // Description produit

  let productDescription = document.createElement("p");
  productDescription.classList.add("product-description");

  description.appendChild(productDescription).textContent = value.description;

}

// Couleur produit

function color(value) {
  for (let i = 0; i < value.colors.length; i++) { // index 0, Condition, incrémentation de l'index

  var sel = document.getElementById("colors");

  var opt = document.createElement("option");
  opt.value = i+1;
  opt.text = "Couleur : " + value.colors[i];

  sel.add(opt, sel.options[i+1]);
  }
}

//-------------------Gestion du Panier


// Selection bouton ajouter panier
const btn_envoyerPanier = document.getElementById("addToCart");
btn_envoyerPanier.addEventListener("click", (event)=>{
  event.preventDefault();

  // Choix couleur
  const colorProd = document.getElementById("colors");
  const colorChoice = colorProd.value;

  // Choix quantité

  const quantityProd = document.getElementById("quantity");
  const quantityChoice = quantityProd.value;


  // Récuperation valeur produit

  
  let produits = {
    idProduit : articleId, 
    colors : colorChoice,
    quantite : quantityChoice,
  }

  //-------------------Le local Storage

  if (colorChoice == 0) {
    btn_envoyerPanier.innerHTML = "Choisissez une couleur !";
    return 0;
  }
  else{
    btn_envoyerPanier.innerHTML = "Produit ajouté au panier !";
    const ajoutProduitLocalStorage = () => {
      produitDansLocalStorage.push(produits);
      localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
    }

    if(produitDansLocalStorage) {

      ajoutProduitLocalStorage();
      
    }else{

      produitDansLocalStorage = [];
      ajoutProduitLocalStorage();
    }
    
  }  
   // Si le local storage n'est pas vide, cela recherche les memes ID d'articles pour les cumulés lors de l'ajout.

 if(produitDansLocalStorage) {
  for (let i = 0; i < produitDansLocalStorage.length; i++) { // index 0, Condition, incrémentation de l'index


    let k = produitDansLocalStorage.length - 1;
    console.log(k);
    if (produitDansLocalStorage[i].idProduit == produitDansLocalStorage[k].idProduit){

      const quantityAdd = parseInt(produitDansLocalStorage[i].quantite) + parseInt(produitDansLocalStorage[k].quantite);
      let produitsAdd = {
        idProduit : articleId, 
        colors : colorChoice,
        quantite : quantityAdd,
      }  

        localStorage.removeItem(produitDansLocalStorage.quantite);
        console.log('salut')
        produitDansLocalStorage.push(produitsAdd);
        localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
        return 1;
    }
  }
}
})







