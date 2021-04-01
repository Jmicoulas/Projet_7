exports.postPost = (req, res, next) => {
  const date = new Date();
  const currentDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const userId = req.body.id;
  const nomFichier = userId + "-" + currentDate;
  const postParam = {
    postingUser: userId,
    linkWebsite: req.body.linkWebsite,
    linkImage: nomFichier + ".gif",
    textPost: req.body.text
  };
  db.query("INSERT INTO post SET ?", postParam, (error, res) => {
    if (error) {
      return res.status(400).json({ error });
    }
    return res.status(201).json({ Post: "Votre Post a été publié !" });
  });
};

exports.getAllPost = (req, res, next) => {
  db.query("SELECT * FROM Post ORDER BY created_at DESC", (error, res) => {
    if (error) {
      return res.status(400).json({ error });
    }
    return res.status(200).json(result);
  });
};

exports.getOnePost = (req, res, next) => {
  db.query("SELECT * FROM Post WHERE id= ?", req.params.id, (error, res) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    }
  );
};

exports.deletePost = (req, res, next) => {
  db.query("DELETE FROM Post WHERE id= ?", req.body.id, (error, res) => {
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
  console.log(Post);
  console.log(id);
  db.query(`UPDATE Post SET Post='${Post}' WHERE id=${id}`, (error, res) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json({ Post: "Votre Post a été modifié !" });
    }
  );
};