const db = require("../mysqlParam");

exports.publishPost = (req, res, next) => {
  const userId = req.body.userId;
  let postParam = {
    postingUser: userId,
    textPost: req.body.text,
    linkImage : null
  };
  if(req.file != undefined){
    postParam.linkImage =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  db.query("INSERT INTO post SET ?", postParam, (error, response) => {
    if (error) {
      return res.status(400).json({ error });
    }
    return res.status(201).json({ Post: "Votre Post a été publié !" });
  });
};

exports.getAllPost = (req, res, next) => {
  db.query("SELECT User.prenom, User.nom, post.textPost, post.postingDate, post.linkImage, post.id FROM Post INNER JOIN User ON Post.postingUser = User.id ORDER BY post.postingDate DESC", (error, response) => {
    let string = JSON.stringify(response);
        let json = JSON.parse(string);
    if (error) {
      return res.status(400).json({ error });
    }
    if(json[0]!= null){
      return res.status(200).json(json);
    }else{
      return res.status(404).json({message : "Aucun post disponible"});
    }
  });
};

exports.getOnePost = (req, res, next) => {
  db.query("SELECT User.prenom, User.nom, User.email, User.roles, post.textPost, post.postingDate, post.linkImage, post.id FROM Post INNER JOIN User ON Post.postingUser = User.id WHERE Post.postingUser = ? ORDER BY post.postingDate DESC", req.body.idUser, (error, response) => {
    let string = JSON.stringify(response);
        let json = JSON.parse(string);
    if (error) {
      return res.status(400).json({ error });
    }
    if(json[0]!= null){
      return res.status(200).json(json);
    }else{
      return res.status(404).json({message : "Aucun post disponible"});
    }
  });
};

exports.deletePost = (req, res, next) => {
  db.query("DELETE FROM Post WHERE id= ?",req.body.idpost , (error, response) => {
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