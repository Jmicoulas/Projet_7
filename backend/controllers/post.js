const db = require("../mysqlParam");

exports.publishPost = (req, res, next) => {
// console.log("fichier "+req.file.filename);
  const date = new Date();
  const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const userId = req.body.userId;
  let postParam = {
    postingUser: userId,
    textPost: req.body.text,
    linkImage:currentDate + `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
    return res.status(200).json({
      postId:json[0].id,
      userId: json[0].postingUser,
      image: json[0].linkImage,
      text: json[0].textPost,
      date: json[0].postingDate
    });
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
  db.query("DELETE FROM Post WHERE id= ?", req.body.id, (error, response) => {
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