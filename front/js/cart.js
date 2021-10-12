let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

// Si le panier est vide

function createCart (produitDansLocalStorage) {
    if(produitDansLocalStorage === null) {
        let panierVide = document.createElement("p");
        panierVide.classList.add("panier-vide");

        cart__items.appendChild(panierVide).innerText = "Le panier est vide";

    // Si le panier contient des articles    
    }else{
        let produitPanier = [];
        for (let i = 0; i < produitDansLocalStorage.length; i++) { // index 0, Condition, incrémentation de l'index

            // Création article

            let article = document.createElement("article");
            article.classList.add("cart__item");

            cart__items.appendChild(article);

            // Création div img

            let divImg = document.createElement("div");
            divImg.classList.add("cart__item__img");

            article.appendChild(divImg);  

            // Création div cart item content
            
            let cartItemContent = document.createElement("div");
            cartItemContent.classList.add("cart__item__content");

            article.appendChild(cartItemContent);

            // Création cart__item__content__titlePrice

            let cartItemContentTitlePrice = document.createElement("div");
            cartItemContentTitlePrice.classList.add("cart__item__content__titlePrice");

            cartItemContent.appendChild(cartItemContentTitlePrice);

            // Création div cart__item__content__settings

            let cartItemContentSettings = document.createElement("div");
            cartItemContentSettings.classList.add("cart__item__content__settings");

            cartItemContent.appendChild(cartItemContentSettings);

            // Création div class="cart__item__content__settings__quantity

            let cartItemContentSettingsQuantity = document.createElement("div");
            cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")

            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

            // Quantité

            let quantity = document.createElement("p");
            cartItemContentSettingsQuantity.appendChild(quantity).textContent = "Qté : " + produitDansLocalStorage[i].quantite;

            // div supprimer

            let cartItemContentSettingsDelete = document.createElement("div");
            cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");

            cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

            // deleteItem

            let deleteItem = document.createElement("p");
            deleteItem.classList.add("deleteItem");

            cartItemContentSettingsDelete.appendChild(deleteItem).textContent = "Supprimer";

            
            
            fetch(`http://localhost:3000/api/products/${produitDansLocalStorage[i].idProduit}`)
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function(value) {
                createArticle(value);  
            })
            .catch(function(error) {
                // Une erreur est survenue
            });

            //Fonction qui récupere les valeurs dans l'API

            function createArticle(value) {

                //IMG
                let articleImg = document.createElement("img");
                articleImg.classList.add("article-Img");
                articleImg = new Image (300, 200);
                articleImg.src = divImg.appendChild(articleImg).imgContent = value.imageUrl;

                //Nom du produit
                let productName = document.createElement("h2");
                cartItemContentTitlePrice.appendChild(productName).textContent = value.name;

                //Prix produit
                let productPrice = document.createElement("p")
                cartItemContentTitlePrice.appendChild(productPrice).textContent = value.price / 100 + " €"
            }
        }
    }
}

createCart (produitDansLocalStorage);

// total des quantités
let totalQuantity = 0 
if (produitDansLocalStorage != null) {
    for (let j = 0; j < produitDansLocalStorage.length; j++) {
        totalQuantity += parseInt(produitDansLocalStorage[j].quantite);

        document.getElementById("totalQuantity").textContent = totalQuantity;
    }

    // Prix total

    for (let k = 0; k < produitDansLocalStorage.length; k++) { // index 0, Condition, incrémentation de l'index

        fetch(`http://localhost:3000/api/products/${produitDansLocalStorage[k].idProduit}`)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            totalPrices(value);  
        })
        .catch(function(error) {
            // Une erreur est survenue
        });
        function totalPrices(value) {
            let totalPrice = 0 
            for (let j = 0; j < produitDansLocalStorage.length; j++) {
                totalPrice += parseInt(produitDansLocalStorage[j].quantite) * parseInt(value.price);

                document.getElementById("totalPrice").textContent = totalPrice / 100;
            }
        }
    }
}



// bouton supprimer 

//const btnSupprimer = document.getElementById("deleteItem");
    
//for (let j = 0; j < btnSupprimer.length; j++) {
    //btnSupprimer[j].addEventListener("click" , (event) => {
        //event.preventDefault();

    //})
//}
