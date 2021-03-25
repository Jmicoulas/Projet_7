fetch("http://localhost:8000/api/auth/signup")
  .then(response => response.json())
  .then(items => {})


    signup = () => {
        //mettre au panier au click de l'utilisateur
        let btnSignUp = document.getElementById("ajouterProduitPanier");
        btnSignUp.addEventListener("click", () => {})
    };