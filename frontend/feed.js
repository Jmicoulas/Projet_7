let user = sessionStorage.getItem("userLogin") ? JSON.parse(sessionStorage.getItem("userLogin")) : [];

 $(document).ready(function() {
    let imagesPreview = function(input, placeToInsertImagePreview) {
      if (input.files) {
        let filesAmount = input.files.length;
        for (i = 0; i < filesAmount; i++) {
          let reader = new FileReader();
          reader.onload = function(event) {
            $($.parseHTML("<img>"))
              .attr("src", event.target.result)
              .appendTo(placeToInsertImagePreview);
          };
          reader.readAsDataURL(input.files[i]);
        }
      }
    };
    $("#input-files").on("change", function() {
      imagesPreview(this, "div.preview-images");
    });
  });


//function publierPost(){
// postParam ={
//   textpost: document.getElementById("message").value,
//   linkimage: document.getElementById("addedImage").file[0]
//   }
// console.log(postParam.linkimage);
// fetch("http://localhost:8000/api/publishPost", {
//     method: "POST",
//     body: JSON.stringify(postParam),
//     headers: { "Content-type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((response) => console.log("Bingo!", JSON.stringify(response)))
//     .catch((error) => console.error("Error:", error));
//}

function logOff(){
  sessionStorage.clear();
  window.location.replace("index.html");
}

$(document).ready(function () {
  $(".leftmenutrigger").on("click", function(e) {
    $(".side-nav").toggleClass("open");
    e.preventDefault();
  });
});


  // <!--- \\\\\\\Post-->
  // <div class="row justify-content-md-center mt-4">
  //   <div class="col-7">
  //     <div class="card gedf-card">
  //       <div class="card-header">
  //         <div class="d-flex justify-content-between align-items-center">
  //           <div class="d-flex justify-content-between align-items-center">
  //             <div class="ml-2">
  //               <div class="h5 m-0" id="postingUserName"></div>
  //               <div class="h7 text-muted" id="postingUserPosition"></div>
  //             </div>
  //           </div>
  //           <div>
  //             <div class="dropdown">
  //               <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown"
  //                 aria-haspopup="true" aria-expanded="false">
  //                 <i class="fa fa-ellipsis-h"></i>
  //                 Option
  //               </button>
  //               <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
  //                 <a class="dropdown-item" href="#">Supprimer ma publication</a>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div class="card-body">
  //         <div class="text-muted h7 mb-2" id="postingDate"> <i class="fa fa-clock-o"></i></div>
  //         <p class="card-text" id="postContent">
  //         </p>
  //       </div>
  //       <!-- <div class="card-footer">
  //         <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
  //         <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
  //       </div> -->
  //     </div>
  //   </div>
  // </div>
  // <!-- Post /////-->