
module.exports = (req,res,next) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if(regexEmail.test(req.body.email)) {
        if(regexPassword.test(req.body.password)) {
            next();
        } else {
           return res.status(401).json({ message: "Le mot de passe doit être d'au moins 6 caractères"
            +" et posséder au moins un chiffre, une lettre majuscule, une lettre minuscule et un symbole"});
        }
    } else {
        return res.status(400).json({ message: "L'adresse email est invalide'"});
    }
}