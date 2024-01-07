const express = require('express');

const route = express.Router();

// routes pour l'utilisateur
//router.post('/user',  userController.handleSignUpFormSubmission);
router.get('/user/me',  userMiddleware.isUserLogged, userController.getUserInfo);
//router.patch('/user/me',  userMiddleware.isUserLogged, userController.updateUser);
//router.delete('/user/me',  userMiddleware.isUserLogged, userController.deleteUser);

//router.post('/login',  userController.handleLoginFormSubmission);


module.exports = route