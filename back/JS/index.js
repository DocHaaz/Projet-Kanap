// fonction pour créer la card des produit à afficher
const createCards = (items) => {
    const itemIndex = document.getElementById('items')
    const itemAHref = document.createElement('a')
    const article = document.createElement('article')
    const itemImg = document.createElement('img');
    const title = document.createElement('h3');
    const itemParagraphe = document.createElement('p')

    itemAHref.setAttribute('href', `./product.html?id=${items._id}`)
    itemIndex.appendChild(itemAHref)
    itemAHref.appendChild(article)
    itemImg.setAttribute('src', items.imageUrl)
    itemImg.setAttribute('alt', items.altTxt)
    article.appendChild(itemImg)
    title.classList.add('productName');
    title.textContent = items.name;
    article.appendChild(title)
    itemParagraphe.classList.add('productDescription')
    itemParagraphe.textContent = items.description
    article.appendChild(itemParagraphe)
}

// fonction pour afficher les produits au chargement
const index = async () => {
    const itemsData = await getItemData()

    itemsData.forEach(item => {
        createCards(item)
    });
}

index()