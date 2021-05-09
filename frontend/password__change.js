const user = sessionStorage.getItem("token")? JSON.parse(sessionStorage.getItem("token")): [];

let email;
let password;
let modification;

let formulaire_1 = document.getElementById("form_1")
let formulaire_2 = document.getElementById("form_2")
formulaire_2.style.display = "none";

function emailCheck(){
  email = document.getElementById("email").value;
  if (email == "" ){
    alert("- Veuillez renseigner votre adresse email afin de valider le changement de mot de passe");
      } else if(email != user.email){
        alert("- L'adresse email renseignée n'est pas la même que celle avec laquelle vous vous êtes connecté");
      }else{
            formulaire_2.style.display = "block";
            formulaire_1.style.display = "none";
      }
}

let inputModify = document.getElementById("btnModify");
        inputModify.addEventListener("click", () => {
        modifPassword();
        });

function modifPassword() {
        password = document.getElementById("password").value;
        modification = {
          email: email,
          password: password ,
        };
        fetch("http://localhost:8000/api/auth/updateUser", {
          method: "POST",
          headers: { Authorization: `token ${user.token}`,
          "Content-type": "application/json"
        },
          body: JSON.stringify(modification),
        })
          .then((res) => {
            if(res.status = 200){ 
              resultrqt = true;
          } res.json()
        })
          .then((response) => {
            if(resultrqt){
              alert("Votre mot de passe a bien été modifié");
              window.location.replace("account__page.html")
            }
            console.log("Bingo!", JSON.stringify(response));
          })
          .catch((error) => console.error("Error:", error));
}