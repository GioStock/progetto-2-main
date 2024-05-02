
const controlloPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/i;
            
let username= document.querySelector("#username"); 
let password=document.querySelector("#password");

function controlloPass() {

    if (password.value.match(controlloPassword)) {
        localStorage.setItem("password",password)
        return true
    }else{
        document.getElementById("erroriPassword").innerHTML=`<ul class="text-danger">
        <li class="point">La tua password deve contenere:</li>
        <li>Almeno 8 caratteri</li>
        <li>Almeno una maiuscola</li>
        <li>Almeno un numero ed un carattere speciale (!,?,%,£...)</li></ul>`;
        return false
    }
 }
 let btnLogin =document.querySelector("#btnLogin");
  btnLogin.addEventListener("click",creaUtente);




function controlloUser(){

     
    if(username.value.length< 5){
        document.getElementById("erroriUser").innerHTML=`<p class="text-danger">
        l'username deve contere 5 caratteri minimo!</p>`;
        return false
    }else if(username.value.length > 15){
        document.getElementById("erroriUser").innerHTML=`<p class="text-danger">
        l'username deve contere 15 caratteri massimo!</p>`;
        return false
    }else{
        return true

    }
}


function creaUtente() {

    let passwordOk = controlloPass()
    let usernameOk = controlloUser()
    if (passwordOk && usernameOk) {
        
        let nuovoUtente = new Utente(username.value,password.value,[]);
        localStorage.setItem('utente',JSON.stringify(nuovoUtente));
        console.log(nuovoUtente);
    }else{event.preventDefault()}
    
}

  
class  Utente {
            
    constructor(username,password,carrello){

        this.username = username;
        this.password = password;
        this.carrello=carrello;

    }

}