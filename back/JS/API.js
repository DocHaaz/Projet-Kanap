// fonction fetch pour récupérer les donners de l'API
const getItemData = () => fetch('http://localhost:3000/api/products') 
        .then(function(res) {
            return res.json()
        })
        .catch(function(err) {
            alert("impossible de se connecter au serveur")
        })

// fonction fetch pour récupérer les donners de l'API en fonction de l'ID de l'article
const getItemDataId = () => fetch('http://localhost:3000/api/products/'+itemId) 
        .then( function(res) {
        return res.json()
        })
        .catch(function(err) {
            alert("impossible de se connecter au serveur")
        })
        
const sendUserData = (user, userCart) => fetch('http://localhost:3000/api/products/order', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    // body: JSON.stringify(user, userCart)
    body: JSON.stringify({key:"what"})
})
