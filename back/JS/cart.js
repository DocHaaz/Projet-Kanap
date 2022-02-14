// fonction pour afficher le panier au chargement
const displayCart = async () => {
    const itemsData = await getItemData()
    let itemsDataStorage = JSON.parse(localStorage.getItem('cart'));
    if(itemsDataStorage) {
        itemsDataStorage.forEach(item => {
                let findItem = itemsData.find(element=> element._id == item.id)
                if(findItem) {
                    let cartCards = {
                        id : item.id,
                        color : item.colors,
                        quantity : item.quantity,
                        name : findItem.name,
                        price : findItem.price,
                        imageUrl : findItem.imageUrl,
                        price : findItem.price,
                        altTxt : findItem.altTxt
                    }
                    createCards(cartCards)
                }
        });
    } else {
        let emptyCart = {
            name : "Panier vide",
            altTxt : ""
        }
        createCards(emptyCart)
    }
    findItemToRemove()
    numberOfItem()
    priceOfCart()
    quantityModifier()
    orderForm()
}
displayCart()

// fonction pour créer la card des article à afficher
const createCards = (item) => {

    if (item.name == "Panier vide") {
        const cardItem = document.getElementById('cart__items')
        const article = document.createElement('article')
        const cardItemContent = document.createElement('div');
        const cardItemContentDescription = document.createElement('div')
        const cardItemContentTitle = document.createElement('h1')
        cardItem.appendChild(article)
        article.appendChild(cardItemContent)
        cardItemContent.appendChild(cardItemContentDescription)
        cardItemContentTitle.textContent = item.name
        cardItemContentDescription.appendChild(cardItemContentTitle)
    } else {
        const cardItem = document.getElementById('cart__items')
        const article = document.createElement('article')
        const cardItemImgDiv = document.createElement('div')
        const cardItemImg = document.createElement('img');
        const cardItemContent = document.createElement('div');
        const cardItemContentDescription = document.createElement('div')
        const cardItemContentTitle = document.createElement('h2')
        const cardItemContentParagraphe = document.createElement('p')
        const cardItemContentPrice = document.createElement('p')
        const cardItemContentSettings = document.createElement('div')
        const cardItemContentSettingsQuantity = document.createElement('div')
        const cardItemContentQuantity = document.createElement('p')
        const cardItemContentQuantityInput = document.createElement('input')
        const cardItemContentSettingsDelete = document.createElement('div')
        const cardItemContentDelete = document.createElement('p')

        article.classList.add('cart__item');
        article.setAttribute('data-id', item.id);
        article.setAttribute('data-color', item.color)
        cardItem.appendChild(article)

        cardItemImgDiv.classList.add('cart__item__img')
        article.appendChild(cardItemImgDiv)
        cardItemImg.setAttribute('src', item.imageUrl)
        cardItemImg.setAttribute('alt', item.altTxt)
        cardItemImgDiv.appendChild(cardItemImg)

        cardItemContent.classList.add('cart__item__content')
        article.appendChild(cardItemContent)

        cardItemContentDescription.classList.add('cart__item__content__description')
        cardItemContent.appendChild(cardItemContentDescription)
        cardItemContentTitle.textContent = item.name
        cardItemContentDescription.appendChild(cardItemContentTitle)
        cardItemContentParagraphe.textContent = item.color
        cardItemContentDescription.appendChild(cardItemContentParagraphe)
        cardItemContentPrice.textContent = `${item.price} €`
        cardItemContentDescription.appendChild(cardItemContentPrice)

        cardItemContentSettings.classList.add('cart__item__content__settings')
        cardItemContent.appendChild(cardItemContentSettings)
        cardItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity')
        cardItemContentSettings.appendChild(cardItemContentSettingsQuantity)
        cardItemContentQuantity.textContent = 'Qté :'
        cardItemContentSettingsQuantity.appendChild(cardItemContentQuantity)
        cardItemContentQuantityInput.classList.add('itemQuantity')
        cardItemContentQuantityInput.setAttribute('type', 'number')
        cardItemContentQuantityInput.setAttribute('name', 'itemQuantity')
        cardItemContentQuantityInput.setAttribute('min', '1')
        cardItemContentQuantityInput.setAttribute('max', '100')
        cardItemContentQuantityInput.setAttribute('value', item.quantity)
        cardItemContentSettingsQuantity.appendChild(cardItemContentQuantityInput)
        cardItemContentSettingsDelete.classList.add('cart__item__content__settings__delete')
        cardItemContentSettings.appendChild(cardItemContentSettingsDelete)
        cardItemContentDelete.classList.add('deleteItem')
        cardItemContentDelete.textContent = 'Supprimer'
        cardItemContentSettingsDelete.appendChild(cardItemContentDelete)
    }
}

// fonction pour supprimer un article du panier
const removeItem = function(item) {
    let itemsDataStorage = JSON.parse(localStorage.getItem('cart'))
    let article = document.querySelectorAll('.cart__item')
    let position = itemsDataStorage.findIndex(element => element.id == item.id && element.colors == item.colors)
    itemsDataStorage.splice(position, 1)
    article[position].remove()
    console.log(itemsDataStorage)
    localStorage.setItem('cart', JSON.stringify(itemsDataStorage))
    if(itemsDataStorage.length == 0) {
        localStorage.clear('')
        displayCart()
    }
}

// fonction pour trouver quel item supprimer au click du bouton deleteItem
const findItemToRemove = function() {
    let deleteItem = document.querySelectorAll(".cart__item");
    let itemsDataStorage = JSON.parse(localStorage.getItem('cart'))
    deleteItem.forEach(element => element.addEventListener('click', function(e) {
        let deleteItemBtn = e.target.closest('.deleteItem')
        if(deleteItemBtn) {
            let deleteItemId = element.getAttribute("data-id")
            let deleteItemColor = element.getAttribute("data-color")
            let findItem = itemsDataStorage.find(element=> element.id == deleteItemId && element.colors == deleteItemColor) 
            removeItem(findItem)
            numberOfItem()
            priceOfCart()
        }
    }))

}

// fonction pour calculer la quantité d'article
const numberOfItem = function() {
    let itemsDataStorage = JSON.parse(localStorage.getItem('cart'));
    let numberOfProduct = document.querySelectorAll(".cart__item")
    let totalQuantity = document.getElementById('totalQuantity')
    let itemQuantity = 0
    for (let i = 0; i < numberOfProduct.length; i += 1) {
        itemQuantity = itemQuantity + itemsDataStorage[i].quantity
    }
    totalQuantity.textContent = itemQuantity
}

// fonction pour calculer le total de prix des article
const priceOfCart= async () => {
    const itemsData = await getItemData()
    let itemsDataStorage = JSON.parse(localStorage.getItem('cart'));
    let totalPrice = 0
    let displayPrice = document.getElementById('totalPrice')
    displayPrice.textContent =  totalPrice
    if(itemsDataStorage) {
        itemsDataStorage.forEach(item => {
                let findItem = itemsData.find(element=> element._id == item.id)
                if(findItem) {
                    let product = {
                        quantity : item.quantity,
                        price : findItem.price
                    }
                    totalPrice = totalPrice + (product.price * product.quantity)
                }
        });
    }
    displayPrice.textContent =  totalPrice
}

// fonction pour modifier la quantité d'un article dans le panier
const quantityModifier = function() {
    let inputOfQuantity = document.querySelectorAll(".itemQuantity")
    let quantityInCart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < inputOfQuantity.length; i += 1) {
        inputOfQuantity[i].addEventListener('input', function() {
            quantityInCart[i].quantity = parseInt(inputOfQuantity[i].value)
            localStorage.setItem('cart', JSON.stringify(quantityInCart))
            numberOfItem()
            priceOfCart()
        })
    }
}

// fonction pour valider la quantité d'un article
const validQuantity = function () {
    let itemName = document.querySelectorAll("h2")
    let itemColor = document.querySelectorAll(".cart__item")
    let itemQuantity = document.querySelectorAll(".itemQuantity")
    for (let i = 0; i < itemQuantity.length; i += 1) {
            let quantityRegExp = new RegExp("^[1-9]$|^[1-9][0-9]$|^(100)$");
            if (quantityRegExp.test(itemQuantity[i].value) == false) {
                alert(`Veuillez entrez un nombre entre 1-100 pour l'article ${itemName[i].textContent} ${itemColor[i].getAttribute("data-color")}`)
            }
    }
}

// fonction pour vérifier le contenu du formulaire
const orderForm = function() {
    let cartOrder = document.getElementById('order')
    cartOrder.addEventListener('click', function(e) {
        e.preventDefault();
        validQuantity()
        let form = document.querySelector('.cart__order__form')
        if(validName(form.firstName) == true && validName(form.lastName) == true && validAddress(form.address) == true && validCity(form.city) == true && validEmail(form.email) == true) {
            let user = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                address: form.address.value,
                city: form.city.value,
                email: form.email.value
            }
            let itemsDataStorage = JSON.parse(localStorage.getItem('cart'));
            let userCart = []
            if (itemsDataStorage) {
                itemsDataStorage.forEach(item => {
                    userCart.push(item.id)
                })
            }
            console.log(user)
            console.log(userCart)
            sendUserData(user, userCart)
        }
    })
}

// fonction pour valider le nom /  prénom
const validName = function(input) {
    let InputRegExp = new RegExp('^[A-Za-z ]+$')
    let testRegExp = InputRegExp.test(input.value)
    let errorMsg = input.nextElementSibling;
    if (testRegExp == false) {
        errorMsg.textContent = 'invalide'
    } else {
        errorMsg.textContent = ''
        return true
    }
}

// fonction pour valider l'adresse
const validAddress = function(input) {
    let InputRegExp = new RegExp("^[A-Za-z0-9-', ]+$")
    let testRegExp = InputRegExp.test(input.value)
    let errorMsg = input.nextElementSibling;
    if (testRegExp == false) {
        errorMsg.textContent = 'invalide'
    } else {
        errorMsg.textContent = ''
        return true
    }
}

// fonction pour valider la ville
const validCity = function(input) {
    let InputRegExp = new RegExp('^[A-Z][A-Z{1} a-z-]+$')
    let testRegExp = InputRegExp.test(input.value)
    let errorMsg = input.nextElementSibling;
    if (testRegExp == false) {
        errorMsg.textContent = 'invalide'
    } else {
        errorMsg.textContent = ''
        return true
    }
}

// fonction pour valider l'email
const validEmail = function(input) {
    let InputRegExp = new RegExp('^[A-Za-z0-9.-_]+[@]{1}[A-Za-z]+[.]{1}[a-z]+$')
    let testRegExp = InputRegExp.test(input.value)
    let errorMsg = input.nextElementSibling;
    if (testRegExp == false) {
        errorMsg.textContent = 'invalide'
    } else {
        errorMsg.textContent = ''
        return true
    }
}


/////// reste a faire ///////

// fonction pour envoyer le formulaire
