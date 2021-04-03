let user;

signup = () => {
        let btnSignUp = document.getElementById("btnSignUp");
        btnSignUp.addEventListener("click", () => {
          checkInput();
          userSignup(user);
        })
    };
  

  //Test du nom => aucun chiffre ou charactère spécial permis
function checkNom() {
  formNom = document.getElementById("signUpNom").value;
  if (checkNumber.test(formNom) == true || checkSpecialCharacter.test(formNom) == true) {
    checkMessage += "\n" + "Nom de famille invalide, vérifier votre nom de famille";
  } else if (formNom == "") {
    checkMessage += "\n" + "Renseigner votre nom de famille afin de valider la commande";
  }
};

//Test du prenom => aucun chiffre ou charactère spécial permis
function checkPrenom() {
  formPrenom = document.getElementById("signUpPrenom").value;
  if (checkNumber.test(formPrenom) == true || checkSpecialCharacter.test(formPrenom) == true) {
    checkMessage += "\n" + "Prénom invalide, vérifier votre prénom";
  } else if (formPrenom == "") {
    checkMessage += "\n" + "Renseigner votre prénom afin de valider la commande";
  }
};

function checkInput() {
  checkNom();
  checkPrenom();
  user = {
    email : document.getElementById("signUpMail"),
    password: document.getElementById("signUpPassword"),
    nom: formNom,
    prenom: formPrenom,
    roles : 2
  };
};

function userSignup(user) {
  fetch('http://localhost:8000/api/auth/signup',{
  method: "POST",
  body: JSON.stringify(user),
  headers: { "Content-type": "application/json" }
   })
  .then(res => res.json())
  .then(response => console.log('Bingo!', JSON.stringify(response)))
  .catch(error => console.error('Error:', error))
  };