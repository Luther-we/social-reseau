const flatten = require('flat')

export default flatten({
    empty: 'a',
    form: {
        firstname: "Prénom",
        lastname: "Nom",
        pseudo: 'Pseudo',
        password: "Mot de passe",
        toConnect: "Se connecter",
        email: "Adresse Email",
        confirmPassword: "Confirmation du mot de passe",
        age: "Age",
        city: "Ville",
        zipCode: "Code Postal",
        cellPhone: "Téléphone mobile",
        confirmEmail: 'Confirmation Email',
        birthday: 'Date de naissance'
    },
    button: {
        toLogin: "Se connecter",
        signIn: 'Créer un compte',
        submit: "Valider",
        yetAccount: 'Vous-avez déjà un compte ?',
        toAccount: 'Voir mon compte'
    },
    caption: {
        noAccount: 'Pas encore de compte ?',
        yetAccount: 'Vous-avez déjà un compte ?'
    },
    title: {
        signIn: 'Créer un compte',
        connectTo: 'Connexion',
        friends: 'Amis'
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
        confirmEmail: 'Le mail et sa confirmation ne sont pas identiques',
        email: 'Est-ce vraiment une adresse mail valide ?',
        passwordRequire: 'Mot de passe requis',
        userNotExist: 'Couple mail / mot de passe erroné',
        genderRequired: 'Veuillez indiquer votre composition',
        ageRequired: 'Veuillez enregistrer votre age',
        cityRequired: 'Veuillez préciser une ville',
        confirmPasswordRequire: 'Veuillez confirmer le mot de passe',
        pseudoRequire: 'Veuillez entrer un pseudo',
        firstnameRequire: 'Veuillez entrer votre prénom',
        lastnameRequire: 'Veuillez entrer votre nom',
        emailExist: 'Cet Email est déjà enregistré, veuillez en renseigner un autre, connectez vous avec cette' +
            ' adresse mail ou réinitialisez votre mot de passe',
        somethingWrong: 'Quelque chose ne tourne pas rond, repassez plus tard',
        noDeleteAccount: 'Une erreur durant la procédure a eu lieu, merci de recommencer',
        emailNotSame: 'L\'adresse email renseignée n\'est pas celle du compte en cours'
    },
    valid: {
        userCreated: 'Le nouveau compte a bien été crée, ne reste plus qu\'à vous connecter',
        connect: 'Vous êtes bien connecté',
        deleteAccount: 'Votre compte a bien été supprimé. Vous nous manquez déjà'
    },
    user: {
        waitingIValidAFriend: ' vous a demandé en ami, gérez vos demandes pour accèder à son compte',
        waitingValidation1: 'Vous avez déjà demandé ',
        waitingValidation2: ' vous pourrez voir ce compte quand il aura accepté votre demande'
    }
})
