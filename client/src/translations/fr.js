const flatten = require('flat')

export default flatten({
    form: {
        firstname: "Prénom",
        lastname: "Nom",
        password: "Mot de passe",
        submit: "Valider",
        toConnect: "Se connecter",
        email: "Adresse Email",
        confirmPassword: "Confirmation du mot de passe",
        age: "Age",
        city: "Ville",
        zipCode: "Code Postal",
        cellPhone: "Téléphone mobile"
    },
    title: {
        createAccount: "Créer un compte",
        connectTo: 'Connexion'
    },
    language: {
        fr: "français",
        en: "anglais",
        title: "Language"
    },
    gender: {
        title: "Genre",
        man: "garçon / homme",
        woman: "fille / femme",
        cyborg: "androïd / cyborg",
        between: "multigenre"
    },
    error: {
        passwordElement: 'Votre mot de passe doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre et doit-être d\'une' +
            ' longeur de 8 à 12 caractères',
        confirmPassword: 'Le mot de passe et sa confirmation ne sont pas similaires',
        email: 'Est-ce vraiment une adresse mail valide ?'
    }
})
