const appConst = {
    // TAB DE VALEURS
    genderTab: ['man', 'woman', 'between', 'cyborg'],
    languagePref: ['fr', 'en'],

    // REGEX DE VALIDATION
    regExPassword: new RegExp(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/g),
    regExEmail: new RegExp(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/),

    // ADRESSAGE SYSTEME
    server: 'localhost:5000'
}

export default appConst
