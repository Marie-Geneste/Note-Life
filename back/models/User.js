const mongoose = require('mongoose');
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, `Une adresse mail est obligatoire`],
        validate: [isEmail, 'Ajouter une adresse mail valide']
    },
    password: {
        type: String,
        required: [true, `Un mot de passe est obligatoire`],
        minlength: [6, `Minimum 6 caractères`]
    },
    pseudo: {
        type: String
    },
},
{
    timestamps: true
}
);

const User = mongoose.model('users', userSchema);

module.exports = User;