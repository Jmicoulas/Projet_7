function ajoutUser(){
    db.query('INSERT INTO user SET ?'),
    function (err, result) { 
        if (err) throw err;
        console.log(result);
      }
};

function lirerUser(){
    db.query('SELECT * FROM User WHERE id = ?'),
    function (err, result) { 
        if (err) throw err;
        console.log(result);
      }
};

function modifierUser(){
    db.query('UPDATE user SET ? WHERE id = ?'),
    function (err, result) { 
        if (err) throw err;
        console.log(result);
      }
};

function supprimerUser(){
    db.query('DELETE FROM user WHERE id = ?'),
    function (err, result) { 
        if (err) throw err;
        console.log(result);
      }
};

module.exports = {ajoutUser, lirerUser, modifierUser, supprimerUser}