# Notelife

Ce projet est une application web pour la prise de note et son organisation.

## Lancement de l'application

UI : Run `npm start`. Navigate to `http://localhost:4200/`
Server : Run `npm run back`. 

## Explication

Voici le document détaillé : `https://docs.google.com/document/d/1r5QSeuZ1etI_HLiwjgGVzNUovFs61_81/edit`

J'ai utilisé Angular en front et NodeJS avec mongoDB en back.

Avancé au 15/01/2024 :

    - CRUD utilisateur terminé : inscription, connexion, affichage utilisateur (profil), modification et suppression utilisateur. Utilisation du JWT pour la gestion de l'utilisateur. Pour des raisons de sécurité le mot de passe est hashé, utilisation du sanitize html et des cors. Gestion de la déconnexion du token par expiration et par le bouton logout de la page profil. Ouverture d'une modale de confirmation pour la suppression de l'utilisateur (avertissement pour la supression des notes liées à l'utilisateur). Possibilité de modifier le pseudo mais pas l'email ni le mot de passe pour des raisons de sécurité. La connexion est requise directement après l'inscription pour des soucis de sécurité également.
    
    - J'ai pris à coeur de gérer toutes les vérifications nécessaires à la connexion et à l'inscription côté server et côté UI : champs requis, email valide, confirmation du mot de passe, mot de passe supérieur à 6 caractères, message d'erreur qui apparaît aux différents niveau pour aider au mieux l'utilisateur au niveau de l'inscription et de la connexion sans pour autant en affecter la sécurité (email ou mot de passe invalide au niveau de la connexion pour éviter l'attaque d'un des champs en particulier).
