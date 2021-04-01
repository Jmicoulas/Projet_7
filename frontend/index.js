

signup = () => {
        //mettre au panier au click de l'utilisateur
        let btnSignUp = document.getElementById("ajouterProduitPanier");
        btnSignUp.addEventListener("click", () => {
          
        })
    };

  //   contact = {
  //     firstName: formNom,
  //     lastName: formPrenom,
  //     address: formAdresse,
  //     city: formVille,
  //     email: formMail
  //   };
  // };
  
  // Validation et fetch de la commande
  // function validationBasket(contact) {
  //   fetch('http://localhost:8000/api/auth/signup', {
  //     method: "POST",
  //     body: JSON.stringify({ products, contact }),
  //     headers: { "Content-type": "application/json; charset=UTF-8" }
  //   }).then(response => response.json())
  //   .then(json => {
  //     sessionStorage.setItem('order', JSON.stringify(json));
  //     window.location.replace("validation__commande.html");
  //   })