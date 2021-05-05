# Projet_7
 Projet_7

💻 # groupomania Création réseau social

Les fonctionnalités importantes :

mis en ligne d'un gif + un message
Supprimer le message
modifier / supprimer un compte
identifier / créer un compte
Un compte admin pour gérer les utilisateurs


Cloner le repository 

Ensuite rendez-vous dans le dossier Groupomania à l'aide du terminal ou de l'invite de commande :

cd Groupomania

#########################################

➡️ Backend:

dans le terminal (ou l'invite de commande ) lancer la commande : cd backend

Puis lancer la commande suivante :

1)npm install 
2)npm install -g nodemon
une fois toute ces étapes réalisés lancer la commande :

3)nodemon server
Le serveur backend est à present fonctionnel

#########################################

✔️ Frontend:

se rendre dans le dossier frontend : cd frontend

et lancer la commande suivante :

npm install
une fois l'installation terminé lancer la commande :

npm run serve
##########################

Pour créer un compte admin :

Créer un compte normal en vous inscrivant sur l'application

ensuite dans la base de données sql taper la commande sql suivante :

UPDATE user SET isAdmin = ‘1’ WHERE id = ‘(l’id du compte à transformer en admin)’;

Par défaut le serveur client est accessible en local via le port 8080: http://localhost:8080/

Bonne navigation !
