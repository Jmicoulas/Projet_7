let user;

//Controle Regex
const checkString = /[a-zA-Z]/;
const checkNumber = /[0-9]/;
const checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

function Inscription() {
  checkInput();
  userSignup(user);
}

//Test du nom => aucun chiffre ou charactère spécial permis
function checkNom() {
  formNom = document.getElementById("signUpNom").value;
  if (
    checkNumber.test(formNom) == true ||
    checkSpecialCharacter.test(formNom) == true
  ) {
    checkMessage +=
      "\n" + "Nom de famille invalide, vérifier votre nom de famille";
  } else if (formNom == "") {
    checkMessage +=
      "\n" + "Renseigner votre nom de famille afin de valider la commande";
  }
}

//Test du prenom => aucun chiffre ou charactère spécial permis
function checkPrenom() {
  formPrenom = document.getElementById("signUpPrenom").value;
  if (
    checkNumber.test(formPrenom) == true ||
    checkSpecialCharacter.test(formPrenom) == true
  ) {
    checkMessage += "\n" + "Prénom invalide, vérifier votre prénom";
  } else if (formPrenom == "") {
    checkMessage +=
      "\n" + "Renseigner votre prénom afin de valider la commande";
  }
}

function checkInput() {
  checkNom();
  checkPrenom();
  user = {
    email: document.getElementById("signUpEmail").value,
    password: document.getElementById("signUpPassword").value,
    nom: formNom,
    prenom: formPrenom,
    roles: 2,
  };
}

function userSignup(user) {
  console.log(JSON.stringify(user));
  fetch("http://localhost:8000/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {console.log("Bingo!", JSON.stringify(response))})
    .catch((error) => console.error("Error:", error));
}

function userLogin() {
  let userLogin = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value,
  };
  fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    body: JSON.stringify(userLogin),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("Bingo!"); 
      console.log(json);
      sessionStorage.setItem("token", JSON.stringify(json));
      window.location.replace("feed.html");
    })
    .catch((error) => console.error("Error:", error));
}
