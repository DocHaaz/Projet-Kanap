// fonction fetch pour récupérer les donners de l'API
const getItemData = () => fetch('http://localhost:3000/api/products') 
    .then( function(res) {
        try {
            return res.json()
        }
        catch {
            alert("impossible de se connecter au serveur")
        }
    })

// fonction fetch pour récupérer les donners de l'API en fonction de l'ID de l'article
const getItemDataId = () => fetch('http://localhost:3000/api/products/'+itemId) 
        .then( function(res) {
            try {
                return res.json()
            }
            catch {
                alert("impossible de se connecter au serveur")
            }
        })
        
// fonction fetch pour envoyer le panier puis rediriger vers la page confirmation
function sendUserData (data, dataId) {
    const userData = fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({contact: data, products: dataId})
        
    })

    userData.then(async(res) =>{
        try{
            const orderData = await res.json();
            if (orderData) {
                window.location.href = "./confirmation.html?id="+orderData.orderId;
                localStorage.clear('')
            }   
        }
        catch {
            alert("impossible de se connecter au serveur")
        }
    })
}

