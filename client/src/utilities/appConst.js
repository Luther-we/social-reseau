const appConst = {
    // TAB DE VALEURS
    genderTab: ['man', 'woman', 'between', 'cyborg'],
    languagePref: ['fr', 'en'],

    // REGEX DE VALIDATION
    regExPassword: new RegExp(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/g),
    regExEmail: new RegExp(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/),

    //LIMIT
    limitDisplayProfileFriends: 6,


    //DEFAULT VALUE
    defaultProfileCover: "https://previews.123rf.com/images/chekat/chekat1512/chekat151200014/49320319-seamless-de-bananes-m%C3%BBres-jaunes-sur-un-fond-bleu.jpg",
    defaultProfilePicture: "https://www.hominides.com/data/images/illus/grands_singes/gorille-genome-sequence.jpg",

    // ADRESSAGE SYSTEME
    server: 'localhost:5000',
    adresse: window.location.hostname,
    port: process.env.PORT || 5000
}

export default appConst
