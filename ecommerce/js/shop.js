const URLphone = "https://dummyjson.com/products/category/smartphones";
const prodottoSingolo = document.querySelector("#prodottoSingolo");

function telefoni(telefono) {
  fetch(URLphone)
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      const prodotti = response.products;
      console.log(prodotti);
      prodotti.forEach((prodotto) => {
        
        let card = `
          <div class="col">
            <div class="card shadow-sm">
              <img src="${prodotto.images[0]}" width="100%" height="225" alt="">

              <div class="card-body">
                <p class="card-text">${prodotto.title}</p>
                <p class="card-text">${prodotto.description}</p>
                <p class="card-price" id="card-price">${prodotto.price}€</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Aggiungi al carrello</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Compra Ora</button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        `;
        prodottoSingolo.innerHTML += card;
      });

      // Aggiungi event listener per "Aggiungi al carrello" su tutti i bottoni
      document.querySelectorAll(".aggiungi-carrello").forEach((btn) => {
        btn.addEventListener("click", function () {
          // Ottieni l'ID del prodotto dalla data attributo del bottone
          const prodottoId = this.getAttribute("data-id");
          // Esegui la logica per aggiungere il prodotto al carrello
          aggiungiProdottoAlCarrello(prodottoId);
        });
      });
    });
}
telefoni();