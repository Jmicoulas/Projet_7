
module.exports = (req,res,next) => {
  
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (regexPassword.test(req.body.password == false)){
        return res.status(401).json({message : "Le mot de passe doit être d'au moins 6 caractères et posséder au moins un chiffre, une lettre majuscule, une lettre minuscule et un symbole"});
    } else { 
        next();
    }
    
}
