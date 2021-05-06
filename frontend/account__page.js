const user = sessionStorage.getItem("token")
  ? JSON.parse(sessionStorage.getItem("token"))
  : [];
let userId = user.userId;

fetch("http://localhost:8000/api/getOnePost", {
  method: "POST",
  headers: {
    Authorization: `token ${user.token}`,
    "Content-type": "application/json",
  },
  body: JSON.stringify({ idUser: userId }),
})
  .then((res) => {
    if (res.status == 404) {
      main.innerHTML +=
        '<p class="text-center">Aucun post créer pour le moment sur ce compte!</p>';
      resultrqt = false;
    } else {
      resultrqt = true;
    }
    return res.json();
  })
  .then((posts) => {
    console.log(posts);
    if (resultrqt) {
      for (var i = 0; i < posts.length; i++) {
        let itemHtml = displayPost(posts[i]);
        main.innerHTML += itemHtml;
        let postId = posts[0].id;
        deletePost(postId);
        modifyPassword(user);
      }
    }
  })
  .catch((error) => console.error("Error:", error));

function logOff() {
  sessionStorage.clear();
  window.location.replace("index.html");
}

function deletePost(postId) {
  let inputDelete = document.getElementById("deleteBtn");
  inputDelete.addEventListener("click", () => {
    fetch("http://localhost:8000/api/deletePost", {
      method: "DELETE",
      headers: {
        Authorization: `token ${user.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ "idpost": postId }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Bingo!", JSON.stringify(response));
        document.location.reload();
      })
      .catch((error) => console.error("Error:", error));
  });
}

function deleteAccount() {
    let inputDelete = document.getElementById("accountBtn");
  inputDelete.addEventListener("click", () => {
  fetch("http://localhost:8000/api/auth/deleteUser", {
    method: "POST",
    headers: {
      Authorization: `token ${user.token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ "idUser": userId }),
  })
    .then((res) =>res.json())
    .then((response) => {
       window.location.replace("index.html")
    })
    .catch((error) => console.error("Error:", error));
    })
}

function modifyPassword() {
let inputDelete = document.getElementById("passwordBtn");
inputDelete.addEventListener("click", () => {
let form = new FormData();
form.append("password", document.getElementById("modifiedPassword").value);
form.append("email", user.email);
fetch("http://localhost:8000/api/auth/updateUser", {
  method: "POST",
  headers: {Authorization: `token ${user.token}`},
  body: form,
})
.then((res) => res.json())
        .then((response) => {
            console.log("Bingo!", JSON.stringify(response));
        })
        .catch((error) => console.error("Error:", error));
})
}

function displayPost(post) {
  let postModel = `
    <div class="col-5 mx-auto card text-center">
        <div class="card-header">
            Détails de votre compte
        </div>
        <div class="card-body">
            <h5 class="card-title">${post.prenom} ${post.nom}</h5>
            <p class="card-text">${post.email}</p>
            <button type="button" id="modifPassword" class="btn mt-2" data-toggle="modal" data-target="#modifyPassword">Modifier votre mot de passe <i class="fas fa-user-edit"></i></button>
            <button type="button" id="confirAccount" class="btn mt-2" data-toggle="modal" data-target="#SupprAccount">Supprimer votre compte <i class="fas fa-user-times"></i></button>
        </div>
    </div>
    <p class="text-center">Historique de vos publications</p>
    <div class="row justify-content-md-center m-1">
      <div class="col-5">
        <div class="card gedf-card">
        <img src="${
          post.linkImage
        }" class="card-img-top w-25 mx-auto" alt="Image joint au post de ">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex justify-content-between align-items-center">
                <div class="ml-2">
                  <div class="h5 m-0" id="postingUserName">${post.prenom} ${
    post.nom
  }</div>
                  <div class="h7 text-muted" id="postingUserPosition"></div>
                </div>
              </div>
                <button type="button" id="confirmation" class="btn mt-2" data-toggle="modal" data-target="#SupprPost"><i class="fas fa-backspace"></i></button>
            </div>
          </div>
          <div class="card-body">
            <div class="text-muted h7 mb-2" id="postingDate">${post.postingDate.split(
              "T"
            )}</div>
            <p class="card-text" id="postContent">
            ${post.textPost}
            </p>
          </div>
          <!-- <div class="card-footer">
            <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
            <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
          </div> -->
        </div>
      </div>
    </div>`;

  return postModel;
}

//bootstrap sidemenu
$(document).ready(function () {
  $(".leftmenutrigger").on("click", function (e) {
    $(".side-nav").toggleClass("open");
    e.preventDefault();
  });
});
