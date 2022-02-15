let params = new URLSearchParams(window.location.search)
let orderId = params.get('id');

// fonction pour afficher l'id de la commande
const getOrder = function(orderId) {
    let orderIdTxt = document.getElementById('orderId')
    orderIdTxt.textContent = `${orderId}`
}
getOrder(orderId)