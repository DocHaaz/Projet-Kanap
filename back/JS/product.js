// on récupère l'id du product pour fetch uniquement le product avec une id similaire
let params = new URLSearchParams(window.location.search)
let itemId = params.get('id');


// fonction pour créer la card d'un article à afficher
const createCards = (item) => {

    document.title = item.name 
    const itemImg = document.createElement('img')
    const itemImgDiv = document.querySelector('.item__img')
    const itemTitle = document.getElementById('title')
    const itemPrice = document.getElementById('price')
    const itemParagraphe = document.getElementById('description')
    itemImg.setAttribute('src', item.imageUrl)
    itemImg.setAttribute('alt', item.altTxt)
    itemImgDiv.appendChild(itemImg)
    itemTitle.textContent = item.name
    itemPrice.textContent = item.price
    itemParagraphe.textContent = item.description
}

// fonction pour créée le selecteur de couleur
const colorChosen = (item) => {
    
    item.colors.forEach(color => {
        option = document.createElement('option')
        option.value = color;
        option.textContent = color;
        colors.appendChild(option)
        
    });
    
}

// fonction pour afficher l'article au chargement
const product = async () => {
    const itemData = await getItemDataId()

    createCards(itemData)
    colorChosen(itemData)
}
product()

// fonction pour ajouter un article au panier au click du bouton addToCart
addToCart.addEventListener('click', function() {
    let itemQuantity = document.getElementById('quantity').value
    let quantityRegExp = new RegExp("^[1-9]$|^[1-9][0-9]$|^(100)$");
    const colors = document.getElementById('colors');
    if (!colors.value) {
        alert('Veuillez choisir une couleur')
    } else if (quantityRegExp.test(itemQuantity) == false) {
        alert('Veuillez entrez un nombre entre 1-100')
    } else {
        itemInfo = {
            id: itemId,
            colors: colors.value,
            quantity: parseInt(itemQuantity)
        };
        compareProduct();
    }
})

// fonction pour vérifier si un article n'est pas déjà dans le panier
const compareProduct = function() {
    let cartInfo = JSON.parse(localStorage.getItem('cart'));
    if (cartInfo) {
        let findIndex = cartInfo.findIndex(product => product.id == itemInfo.id && product.colors == itemInfo.colors)
        if (findIndex != -1) {
            cartInfo[findIndex].quantity = parseInt(cartInfo[findIndex].quantity) + parseInt(itemInfo.quantity)
            localStorage.setItem('cart', JSON.stringify(cartInfo))
            alert(`L'article a été ajouté à votre panier`)
        } else {
            cartInfo.push(itemInfo);
            localStorage.setItem('cart', JSON.stringify(cartInfo))
            alert(`L'article a été ajouté à votre panier`)
        }
    } else {
        cartInfo = [];
        cartInfo.push(itemInfo);
        localStorage.setItem('cart', JSON.stringify(cartInfo))
        alert(`L'article a été ajouté à votre panier`)
    }
}