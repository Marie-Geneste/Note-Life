require("dotenv").config({ path: "config.env"})
const User = require('../models/User')
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');

// Function to hash a given password
async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const userController = {

    // Function to handle sign up form submission
    async handleSignUpFormSubmission(req, res) {

        const {
            email,
            password,
            passwordConfirm,
            pseudo
        } = req.body;

        // Sanitize user inputs to prevent XSS attacks
        const cleanUsername = sanitizeHtml(pseudo);
        const cleanEmail = sanitizeHtml(email);

        // Check if all fields are filled
        if (!cleanUsername || !cleanEmail || !password || !passwordConfirm) {
            return res.status(400).json({ errorMessage: "Please fill in all fields" });
        }

        // Validate email format
        if (!emailValidator.validate(cleanEmail)) {
            return res.status(400).json({ errorMessage: "Invalid email format" });
        }

        // Check if password and password confirmation match
        if (password !== passwordConfirm) {
            return res.status(400).json({ errorMessage: `Password confirmation does not match the password entered` });
        }

        try {

            // Check if the user already exists
            const alreadyExistingUser = await User.findOne({
                    email: cleanEmail
            });

            if (alreadyExistingUser) {
                return res.status(400).json({ errorMessage: `The email ${cleanEmail} is already in use` });
            }

            // Hash the user's password
            const hashedPassword = await hashPassword(password);

            // Create a new user
            const newUser = await User.create({
                email: cleanEmail,
                password: hashedPassword,
                pseudo: cleanUsername
            });

            // Send a success response with user information
            res.status(201).json({
                user: {
                    id: newUser.id,
                    pseudo: newUser.pseudo,
                    email: newUser.email,
                },
            });

        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: "Server error" });
        }
    },

    // Methode pour le formulaire de login (recuperer les infos du front email + password)
    // Vérification email et password :
    // 1: Les 2 champs email + password remplis, si ok = continue, sinon  res.status(400) avec l'erreur.
    // 2: Verification que l'user existe dans la bdd si ok = continue, sinon res.status(400) avec l'erreur.
    // 3: Si User existe on compare le mdp envoyer dans le form avec celui haser en bdd si ok = continue, 

    async handleLoginFormSubmission(req, res) {
        // On récupère  les champs du formulaire
        const { email, password } = req.body;

        // On vérifie que tous les champs du form sont remplis sinon renvois d'une erreur
        if (!email || !password) {
            return res.status(400).json({ errorMessage: "Veuillez remplir tous les champ" });
        }

        // On véfifie que le user qui tente de se connecter existe bien en DB
        try {
            const existingUser = await User.findOne({
                    email
            });

            // Si le user n'existe pas, on renvoie un message d'erreur
            if (!existingUser) {
                return res.status(400).json({ errorMessage: "Email ou mot de passe incorrect" });
            }

            // Si il existe, on compare le mdp récupéré du form de connexion avec le hash enregistré dans la DB
            const hashedPassword = existingUser.password;

            // On utilise la méthode de bcrypt dédiée pour comparé le mdp du form avec celui qu'on a récup en DB de notre user existant, qui est censé correspondre
            const passwordValidation = await bcrypt.compare(password, hashedPassword);

            // Si le mdp est erroné, on stop tout et on envoie un message à l'utilisateur.
            if (!passwordValidation) {
                return res.status(400).json({ errorMessage: "Email ou mot de passe incorrect" });
            }

            //Utilisatation d'un token avec jwt pour enregistrer le user et l'envoyer au front
            const payload = {
                sub: existingUser.id
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "12h",
            });

            // res.cookie("jwt", token, {
            //     httpOnly: true,
            //     secure: true,
            //     maxAge: 3600000,
            //     sameSite: "none",
            // });

            res.status(200).json({
                message: "Connexion réussie !",
                token
            });

        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: "Erreur serveur" });
        }
    },

    //logout(req, res) {
        //res.clearCookie("jwt") si utilisation d'un cookie pour le token
        //on peut aussi renvoyer une réponse JSON indiquant que l'utilisateur a été déconnecté
        //res.json({ message: "Utilisateur déconnecté" });
   // },

    //middleware qui récupère les info du user à partir de l'id précédent
    async getUserInfo(req, res) {
        const userId = req.token.sub;
        //trouver l'user correspondant à l'id
        const userFound = await User.findById(userId);
        
        //renvoyer les infos voulues du user trouvé dans la réponse json
        res.json({ id: userFound.id, email: userFound.email, pseudo : userFound.pseudo })
    },

    async updateUser(req, res) {
        //on destructure les infos du user
        const { pseudo } = req.body;

        const userId = req.token.sub;
        //trouver l'user correspondant à l'id
        const userToUpdate = await User.findById(userId);

        if (pseudo !== undefined) { // Si il y a un nouveau pseudo
            userToUpdate.pseudo = pseudo;
        }

        await userToUpdate.save();

        // Réponse
        res.status(204).end();
    },

    async deleteUser(req, res) {
        const userId = req.token.sub;
        const userToDelete = await User.findById(userId);

        if (!userToDelete) {
            return res.status(404).json({ error: "User not found. Please verify the provided id." });
        }

        await userToDelete.deleteOne();

        // Réponse
        res.status(204).end();
    }
};

module.exports = userController;