const user = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : [];
let main = document.getElementById("main");
if (user == ""){
  window.location.replace("index.html");
}

fetch("http://localhost:8000/api/getAllPosts/")
    .then((res) => {
      if(res.status == 404){
            main.innerHTML += '<p class="text-center">Aucun post créer pour le moment, soyez le premier à partager!</p>'
            resultrqt = false;
          }else{
            resultrqt = true;
          }
        return res.json();
    })
    .then((posts) => {
        console.log(posts);
        if(resultrqt){        
          for (var i = 0; i < posts.length; i++) {
            let itemHtml = displayAllPost(posts[i]);
            main.innerHTML += itemHtml;
        let postId = posts[0].id;
        deletePost(postId);
            }
        }
    })
    .catch((error) => console.error("Error:", error));
    
function publishPost() {
    const formData = new FormData();
    formData.append("file", document.getElementById("fileInput").files[0]);
    formData.append("text", document.getElementById("message").value);
    formData.append("userId", user.userId);
    console.log(formData);
    fetch("http://localhost:8000/api/publishPost", {
            method: "POST",
            body: formData,
        })
        .then((res) => res.json())
        .then((response) => {
            console.log("Bingo!", JSON.stringify(response));
            document.location.reload();
        })
        .catch((error) => console.error("Error:", error));
}

function deletePost(postId){
  let inputDelete = document.getElementById("deleteBtn");
  inputDelete.addEventListener("click", () => {
  console.log("deletePost"+postId)
      fetch("http://localhost:8000/api/deletePost", {
              method: "DELETE",
              headers: {
                Authorization: `token ${user.token}`,
                "Content-type": "application/json"
              },
              body: JSON.stringify({"idpost": postId})
          })
          .then((res) => res.json())
          .then((response) => {
              console.log("Bingo!", JSON.stringify(response));
              document.location.reload();
          })
          .catch((error) => console.error("Error:", error));
  });
}

function logOff() {
    sessionStorage.clear();
    window.location.replace("index.html");
}

function displayAllPost(post) {
    let postModel = `
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
                  <div class="h5 m-0" id="postingUserName">${post.prenom} ${post.nom}</div>
                  <div class="h7 text-muted" id="postingUserPosition"></div>
                </div>
              </div>
              <!--<button type="button" id="modifier" class="btn mt-2"><i class="fas fa-edit"></i></button>-->
                <button type="button" id="confirmation" class="btn mt-2" data-toggle="modal" data-target="#confirmationSuppr"><i class="fas fa-backspace"></i></button>
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
$(document).ready(function() {
    $(".leftmenutrigger").on("click", function(e) {
        $(".side-nav").toggleClass("open");
        e.preventDefault();
    });
});

//bootstrap tooltips
$(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

//bootstrap modal
$("#confirmationSuppr").on("shown.bs.modal", function() {
    $("#confirmation").trigger("focus");
});