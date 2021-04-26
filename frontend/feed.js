const user = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")): [];

fetch("http://localhost:8000/api/getAllPosts/")
  .then((response) => response.json())
  .then((posts) => {
    console.log(posts);
    let main = document.getElementById("main");
    const objectArray = Object.entries(posts);
    console.log(objectArray);
    objectArray.forEach(post =>{
      let itemHtml = displayAllPost(post);
      main.innerHTML += itemHtml;
    })
  })
  .catch((error) => console.error("Error:", error));


function publishPost(){
      const formData = new FormData();
      formData.append("file",document.getElementById("fileInput").files[0]);
      formData.append("text",document.getElementById("message").value);
      formData.append("userId", user.userId);
    console.log(formData);
    fetch("http://localhost:8000/api/publishPost", {
        method: "POST",
        body: formData        
      })
        .then((res) => res.json())
        .then((response) => console.log("Bingo!", JSON.stringify(response)))
        .catch((error) => console.error("Error:", error));
    }

function logOff() {
  sessionStorage.clear();
  window.location.replace("index.html");
};

$(document).ready(function () {
  $(".leftmenutrigger").on("click", function (e) {
    $(".side-nav").toggleClass("open");
    e.preventDefault();
  });
});

function displayAllPost(post){
    let postModel = `
    <div class="row justify-content-md-center m-1">
      <div class="col-7">
        <div class="card gedf-card">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex justify-content-between align-items-center">
                <div class="ml-2">
                  <div class="h5 m-0" id="postingUserName"></div>
                  <div class="h7 text-muted" id="postingUserPosition"></div>
                </div>
              </div>
              <div>
                <div class="dropdown">
                  <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-ellipsis-h"></i>
                    Option
                  </button>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                    <a class="dropdown-item" href="#">Supprimer ma publication</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="text-muted h7 mb-2" id="postingDate">${post.date}</div>
            <p class="card-text" id="postContent">
            ${post.text},
            ${post.image}
            </p>
          </div>
          <!-- <div class="card-footer">
            <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
            <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
          </div> -->
        </div>
      </div>
    </div>`

    return postModel;
};

// // fetch de l'API du produit souhaité, les ourson en peluche dans le cas présents
// fetch("http://localhost:3000/api/teddies/")
//   .then(response => response.json())
//   .then(items => {
//     let main = document.getElementById("main");
//     items.forEach(item => {
//       let itemHtml = displayElement(item);
//       main.innerHTML += itemHtml; // penser à l'afficher dans le main
//     });
//   })
//   .catch(error => {  // Affiche un message d'erreur à l'utilisateur en cas de problème de chargement de l'API
//     document.getElementById('main').innerHTML = "<p class='col mx-auto' id='error'>Erreur lors du chargement de l'API, veuillez recommencer</p>";
//   });

// // afficher chaque produit dans des balises cards
// function displayElement(item) {
//   let itemHtml = `<div class="card w-50 h-75 my-4 pt-5 mx-auto">
//                           <div>
//                             <img src="${item.imageUrl}" class="card-img-top mx-auto d-block" alt="image du produit">
//                           </div>
//                           <div class="card-body">
//                             <h2>${item.name}</h2>
//                             <p>${item.price / 100} euros</p>
//                             <a href="product__page.html?id=${item._id}" class="btn btn-outline-danger">Voir les détails du produit</a>
//                           </div>
//                       </div>`
//   return itemHtml;
// };