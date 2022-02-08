// fonction pour créée la card des article a afficher
const createCards = (item) => {

    if (item.name == "Panier vide") {
        // on créée une card Panier vide
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
        // on créée les elements de le card cart__items
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

        // création de l'article
        article.classList.add('cart__item');
        article.setAttribute('data-id', item.id);
        article.setAttribute('data-color', item.colors)
        cardItem.appendChild(article)

        // création de la div cart__item__img
        cardItemImgDiv.classList.add('cart__item__img')
        article.appendChild(cardItemImgDiv)
        cardItemImg.setAttribute('src', item.imageUrl)
        cardItemImg.setAttribute('alt', item.altTxt)
        cardItemImgDiv.appendChild(cardItemImg)

        // création de la div cart__item__content
        cardItemContent.classList.add('cart__item__content')
        article.appendChild(cardItemContent)

        // création de la div cart__item__content__description
        cardItemContentDescription.classList.add('cart__item__content__description')
        cardItemContent.appendChild(cardItemContentDescription)
        cardItemContentTitle.textContent = item.name
        cardItemContentDescription.appendChild(cardItemContentTitle)
        cardItemContentParagraphe.textContent = item.color
        cardItemContentDescription.appendChild(cardItemContentParagraphe)
        cardItemContentPrice.textContent = `${item.price} €`
        cardItemContentDescription.appendChild(cardItemContentPrice)

        // création de la div cart__item__content__settings (uniquement si le panier n'est pas vide)

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
    removeItem()
    numberOfItem()
    priceOfCart()
    quantityModifier()
    orderForm()
}
displayCart()

// const removeItem = function(position) {
//     let cart = JSON.parse(localStorage.getItem('cart'))
//     cart.splice(position, 1)
//     localStorage.setItem('cart', JSON.stringify(cart))
// }

// fonction pour supprimer un article
const removeItem = function() {
    let deleteItem = document.querySelectorAll(".deleteItem");
    let article = document.getElementsByClassName('cart__item')
    let cart = JSON.parse(localStorage.getItem('cart'))
    // console.log(deleteItem)
    for (let i = 0; i < cart.length; i += 1) {
        deleteItem[i].addEventListener('click', function() {
            cart.splice(i, 1);
            article[i].remove()
            console.log(deleteItem)
            // console.log(cart)
            // console.log(i)
            // console.log(article[i])
            localStorage.setItem('cart', JSON.stringify(cart))
            if(cart.length == 0) {
                localStorage.clear('')
                index()
            }
            numberOfItem()
            priceOfCart()
        })
    }
}

// fonction pour faire la quantité d'article
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

// fonction pour faire le total de prix des article
const priceOfCart= async () => {
    const itemsData = await getItemData()
    let itemsDataStorage = JSON.parse(localStorage.getItem('cart'));
    let totalPrice = 0
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
        let displayPrice = document.getElementById('totalPrice')
        displayPrice.textContent =  totalPrice
    }
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


// fonction pour vérifier le contenu du formulaire
const orderForm = function() {
    let cartOrder = document.getElementById('order')
    cartOrder.addEventListener('click', function(e) {
        e.preventDefault();
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
    let InputRegExp = new RegExp('^[A-Z][a-z]+$')
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
