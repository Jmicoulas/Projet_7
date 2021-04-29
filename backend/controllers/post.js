const db = require("../mysqlParam");

exports.publishPost = (req, res, next) => {
// console.log("fichier "+req.file.filename);
  const userId = req.body.userId;
  let postParam = {
    postingUser: userId,
    textPost: req.body.text,
    linkImage:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  };
  db.query("INSERT INTO post SET ?", postParam, (error, response) => {
    if (error) {
      return res.status(400).json({ error });
    }
    return res.status(201).json({ Post: "Votre Post a été publié !" });
  });
};

exports.getAllPost = (req, res, next) => {
  db.query("SELECT * FROM Post ORDER BY postingDate DESC", (error, response) => {
    let string = JSON.stringify(response);
        let json = JSON.parse(string);
    if (error) {
      return res.status(400).json({ error });
    }
    if(json[0]!= null){
      return res.status(200).json(json);
    }else{
      return res.status(200).json({message : "Aucun post disponible"});
    }
  });
};

exports.getOnePost = (req, res, next) => {
  db.query("SELECT * FROM Post WHERE id= ?", req.params.id, (error, response) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json();
    }
  );
};

exports.deletePost = (req, res, next) => {
  console.log(req.body);
  db.query("DELETE FROM Post WHERE id= ?",req.params.id , (error, response) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json({ Post: "Votre Post a été supprimé !" });
    }
  );
};

exports.updatePost = (req, res, next) => {
  const Post = req.body.Post;
  const id = req.body.id;
  db.query(`UPDATE Post SET Post='${Post}' WHERE id=${id}`, (error, response) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json({ Post: "Votre Post a été modifié !" });
    }
  );
};