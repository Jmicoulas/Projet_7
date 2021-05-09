let user;
let checkMessage = "";
let loginUser;

//Controle Regex
const checkString = /[a-zA-Z]/;
const checkNumber = /[0-9]/;
const checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

function Inscription() {
  checkInput();
  if (checkMessage != "") {
    alert("Attention :" + "\n" + checkMessage);
    checkMessage = "";
  }else{
  userSignup(user);
  }
}

//Test du nom => aucun chiffre ou charactère spécial permis
function checkNom() {
  formNom = document.getElementById("signUpNom").value;
  if (
    checkNumber.test(formNom) == true ||
    checkSpecialCharacter.test(formNom) == true
  ) {
    checkMessage +=
      "\n" + "Le champ Nom de familles contient des caractères invalides, vérifier votre nom de famille";
  } else if (formNom == "") {
    checkMessage +=
      "\n" + "- Veuillez renseigner votre nom de famille afin de créer votre compte";
  }
}

//Test du prenom => aucun chiffre ou charactère spécial permis
function checkPrenom() {
  formPrenom = document.getElementById("signUpPrenom").value;
  if (
    checkNumber.test(formPrenom) == true ||
    checkSpecialCharacter.test(formPrenom) == true
  ) {
    checkMessage += "\n" + "Le champ Prénom contient des caractères invalides, vérifier votre prénom";
  } else if (formPrenom == "") {
    checkMessage +=
      "\n" + "- Veuillez renseigner votre prénom afin de créer votre compte";
  }
}

function checkInput() {
  checkNom();
  checkPrenom();
  let email = document.getElementById("signUpEmail").value;
  if (email == "" ){
    checkMessage +=
    "\n" + "- Veuillez renseigner une adresse email afin de créer votre compte";
  }
  let password = document.getElementById("signUpPassword").value;
  if (password == "" ){
    checkMessage +=
    "\n" + "- Veuillez renseigner un mot de passe contenant au moins 6 charactères dont une majuscule, un chiffre et un symbole afin de créer votre compte";
  }else {
  user = {
    email: email,
    password: password ,
    nom: formNom,
    prenom: formPrenom,
    roles: 2,
  };
 }
}

function userSignup(user) {
  fetch("http://localhost:8000/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => {
      if (res.status == 400){
        alert("Cette adresse email a déjà un compte créer avec celle-ci");
        resultrqt = false;
        }else{ 
          resultrqt = true;
        }
        res.json();
    })
    .then((response) => {
     if(resultrqt) {
        alert("Votre compte a bien été créer avec l'adresse mail suivante : " + user.email + ".\nVous pouvez désormais vous connecter avec celle-ci.");
      }
    })
    .catch((error) => {
      alert("Error:", error);
    });
}

function Connexion() {
  checkLogin();
  if (checkMessage != "") {
    alert("Attention :" + "\n" + checkMessage);
    checkMessage = "";
  }else{
  userLogin(loginUser);
  }
}

function checkLogin(){
  let email = document.getElementById("loginEmail").value;
  if (email == "" ){
    checkMessage +=
    "\n" + "- Veuillez renseigner votre adresse email afin de vous connecter";
  }
  let password = document.getElementById("loginPassword").value;
  if (password == "" ){
    checkMessage +=
    "\n" + "- Veuillez renseigner votre mot de passe afin de vous connecter";
  }else {
    loginUser = {
    email: email,
    password: password,
    };
  }
}

function userLogin(loginUser) {
  var resultrqt = false;
  fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    body: JSON.stringify(loginUser),
    headers: { "Content-type": "application/json" },
  })
    .then((res) =>{
      if(res.status == 401){
        // affichage erreur login retour user
        alert("Email ou mot de passe incorrect");
        resultrqt = false;
        }else if(res.status == 500){
          // serveur injoignable
          alert("Erreur de connexion au serveur, veuillez reessayer plus tard!")
          resultrqt = false;
        }else{
          resultrqt = true;
        }
      return res.json()})
    .then((json) => {   
      if(resultrqt){
        sessionStorage.setItem("token", JSON.stringify(json));
        window.location.replace("feed.html");
      }
    })
    .catch((error) => console.error("Error:", error));
}
