const URLphone = "https://dummyjson.com/products/category/smartphones";
const cardProdotto = document.querySelector("#cardProdotto");

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
          <div class="swiper-slide" id="cardPro${prodotto.id}">
              <div class="card">
                  <div style="background-image: url(${prodotto.images[0]})" class="imgProd"></div>
                  <div class="card-body">
                      <h5 class="card-title" card-title="${prodotto.title}">${prodotto.title}</h5>
                      <p class="card-text" id="card-text">${prodotto.description}</p>
                      <p class="card-price" id="card-price">${prodotto.price}€</p>
                      <button class="aggiungi-carrello btn btn-primary" data-id="${prodotto.id}">Aggiungi al carrello</button>
                      <a class="AggiungiADesideri" role="button">
                         <i class="bi bi-heart"></i>
                         </a>

                  </div>
              </div>
          </div>
        `;
        cardProdotto.innerHTML += card;
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

function aggiungiProdottoAlCarrello(prodottoId) {
  // Recupera il carrello dell'utente dal localStorage
  let utente = JSON.parse(localStorage.getItem("utente")) || { carrello: [] };
  // Aggiungi l'ID del prodotto al carrello dell'utente
  fetch("https://dummyjson.com/products/" + prodottoId)
    .then((response) => response.json())
    .then((prodotto) => {
      utente.carrello.push(prodotto);

      // Salva l'aggiornamento del carrello dell'utente nel localStorage
      localStorage.setItem("utente", JSON.stringify(utente));
      // Esegui eventuali altre operazioni, come aggiornare l'interfaccia utente
      console.log(prodotto);
      //richiama la funzione
      // showCarrello();

      //whishlist
      //////////ADD EVENT LISTENER BOTTONE LISTA DEI DESIDERI
      document.querySelectorAll('.AggiungiADesideri').forEach(iconaCuore => {
      iconaCuore.addEventListener('click', funzioneAggiungiADesideri);
    })

    });

    
}

/////////////FUNZIONE AGGIUNGI LISTA DESIDERI


 let toastElementInterno = document.querySelector('.toast');
 let toastElement = document.querySelector('.divToast');
 let perStampaToast = document.getElementById('perStampaToast');
function funzioneAggiungiADesideri (){
  console.log("oddioooo");
  console.log(toastElementInterno);
  perStampaToast.style.display = "block";

  // questa parte imposta la sparizione del "toast" dopo 3 secondi
  setTimeout(() => {
    toastElementInterno.style.display = "none";
  }, 3000);
//parte per stampare la carta nel modal Lista dei Desideri
  let elCarta = event.target.closest('.swiper-slide');
  let modalBody = document.querySelector('#listaDesideriModal .modal-body');
  let cartaClonata = elCarta.cloneNode(true);
  modalBody.appendChild(cartaClonata);

  //nascondo l'icona del cuore dalla card stampata
  let iconaCuoreClonata = cartaClonata.querySelector('.AggiungiADesideri');
  iconaCuoreClonata.style.display = "none";

  
  
}

// Chiamata per ottenere e visualizzare i prodotti
telefoni(URLphone);

let utente = JSON.parse(localStorage.getItem("utente"));

let welcame = document.querySelector("#welcome");
let utenteBenvenuto = document.querySelector("#utenteBenvenuto");

let btnLogout = document.querySelector("#btnLogout");

const URLJSON = "http://localhost:3000/utenti";

btnLogout.addEventListener("click", function () {
  fetch(URLJSON, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      utente,
    }),
  });
  localStorage.removeItem(utente);
  localStorage.clear();
});

let loginProva = document.getElementById("loginProva");

function funzione() {
  console.log(localStorage.getItem("utente"));
  if (localStorage.getItem("utente") != null) {
    console.log("connesso");
    loginProva.style = "display:none";
    welcame.innerHTML = `<i class=""></i><span>  ${utente.username}! <br> Solo per Oggi!</span>`;
    utenteBenvenuto.innerHTML = `<i class=""></i><span> Benvenuto ${utente.username}!</span>`;
    // TODO con boIcon su class aggiungi icona
  } else {
    console.log("non connesso");
    btnLogout.style = "display:none";
    loginProva.style = "display:";

    // window.location.href = "http://127.0.0.1:5500/ecommerce/index.html";
  }
}
loginProva.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/ecommerce/index.html";
});
funzione();

let elencoCarrelloPieno = document.getElementById("elencoCarrelloPieno");

let checkout = document.getElementById("checkout");
checkout.addEventListener("click", showCarrello);

/* -------------------------------------------------------------------------- */
/*                                showCarrello                                */
/* -------------------------------------------------------------------------- */
function showCarrello() {
  elencoCarrelloPieno.innerHTML = "";
  let carrelloPieno = localStorage.getItem("utente", "carrello");
  let JsonCarrelloPieno = JSON.parse(carrelloPieno);
  console.log(JsonCarrelloPieno);

  JsonCarrelloPieno.carrello.forEach((prodotto) => {
    console.log(prodotto);
    let prodottoCard = `
    <div class="col-lg-6 mb-4" id="cardCarrello${prodotto.id}">
    <div class="card h-100">
    <div style="background-image: url(${prodotto.images[0]})" class="imgProd"></div>
    <div class="card-body">
    <h5 class="card-title" card-title="${prodotto.title}">${prodotto.title}</h5>
    <p class="card-text" id="card-text">${prodotto.description}</p>
    <p class="card-price btn btn-danger" id="card-price">${prodotto.price}€</p>
    <p><button class="rimuovi-prodotto btn btn-danger" car-id=${prodotto.id}>Rimuovi</button></p>
    </div>
    </div>
    </div>
    `;

    elencoCarrelloPieno.innerHTML += prodottoCard;
    // Aggiungi un listener per "Rimuovi" su tutti i pulsanti

    // Aggiungi un listener per "Rimuovi" su tutti i pulsanti

    let bottoni = document.querySelectorAll(`.rimuovi-prodotto`);
    bottoni.forEach((bottone) => {
      bottone.addEventListener("click", function () {
        let prodottoId = this.getAttribute("car-id");
        rimuoviProdottoDalCarrelloStorage(prodottoId);
        showCarrello();
      });
    });
  });
}

function rimuoviProdottoDalCarrelloStorage(prodottoId) {
  // Recupera il carrello dell'utente dall'localStorage
  let utente = JSON.parse(localStorage.getItem("utente")) || {
    carrello: [],
  };
  // Rimuovi il prodotto dal carrello dell'utente
  utente.carrello = utente.carrello.filter((c) => c.id != prodottoId);
  // Aggiorna il carrello dell'utente nell'localStorage
  localStorage.setItem("utente", JSON.stringify(utente));
}
