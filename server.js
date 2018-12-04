// friend relation:
// 0 - j'ai demandé
// 1 - j'ai été demandé
// 2 - accepté


const express = require("express");
const mongo = require('mongodb').MongoClient;
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 5000;
const path = require('path')
const sgMail = require('@sendgrid/mail')
// const dbInterface = require('./modules/db.js')
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const sendMail = false


const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

// const urlDb = "mongodb://localhost:27017/user"
// const dbName = "test"
// const userCollection = 'test'


const urlDb = "mongodb://heroku_j7ckfmlg:fokty2-pevvih-quRkip@ds215093.mlab.com:15093/heroku_j7ckfmlg";
const dbName = 'heroku_j7ckfmlg';
const userCollection = 'user'



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


const jwtMW = exjwt({
    secret: 'i change something 2day'
});

/// CHECKING DIVERS ET VARIE SUR DB
const getAllUser = () => {
    return new Promise((resolve, reject) => {
        mongo.connect(urlDb, {useNewUrlParser: true}, function(err, client){
            const collectionUser = client.db(dbName).collection(userCollection);
            collectionUser.find({}, {
                    projection: {
                        _id: 0,
                        pseudo: 1,
                        firstname: 1,
                        lastname: 1,
                        userId: 1,
                        profilePicture: 1
                    }
                }).toArray((err, exist) => {
                    console.log('////// Ceci est un retour de data', exist)
                    exist ? resolve(exist) : reject(err)
                })
        })
    })
}

const existUser = (propDB, value) => {
    return new Promise((resolve, reject) => {
        mongo.connect(urlDb, {useNewUrlParser: true}, function(err, client){
            const collectionUser = client.db(dbName).collection(userCollection);
            collectionUser.findOne({
                [`${propDB}`]: value
            }, (err, exist) => {
                exist ? resolve(exist) : reject(err)
            })
        })
    })
}

const removeUser = (propDB, value) => {
    return new Promise((resolve, reject) => {
        mongo.connect(urlDb, {useNewUrlParser: true}, function(err, client){
            const collectionUser = client.db(dbName).collection(userCollection);
            collectionUser.remove({
                [`${propDB}`]: value
            }, (err, ok) => {
                ok ? console.log('UIIIIII') : console.log('NOOOOOOOOO')
                ok ? resolve(ok) : reject(err)
            })
        })
    })
}

existUser('email', 'jnaymar@net.com')
    .then((data) => {console.log('User exist /////', data)})
    .catch((data) => {console.log('Nop /////', data)})

app.post('/deleteUser', (req, res) => {
    const {userId} = req.body;
    console.log('Yepa', userId)
    removeUser('userId', userId)
        .then((data) => {
            console.log('En cas de succés, je reçois ', data)
            res.json({
                success: true,
                idMessage: 'valid.deleteAccount'
            })
        })
        .catch((data) => {
            console.log('Nop /////', data)
            res.json({
                success: false,
                idMessage: 'error.noDeleteAccount'
            });
        })
});

app.get('/getUser/:id', (req, res) => {
    console.log('test', req.params.id)
    const id = req.params.id
    existUser('userId', id)
        .then((data) =>{
            let obj = {
                userId: data.userId,
                pseudo: data.pseudo,
                lastname: data.lastname,
                firstname: data.firstname,
                email: data.email,
                gender: data.gender,
                age: data.age,
                city: data.city,
                zipCode: data.zipCode,
                cellPhone: data.cellPhone
            }
            res.json(obj)
        })
        .catch((e) => console.log(e))
})

app.post('/getFriends', (req, res) => {
    const {tabFriends} = req.body
    const tabBack = []
    new Promise((resolve, reject) =>{
        tabFriends.map((friend, index, tab) => {
        existUser('userId', friend.userId)
            .then(
                (data) => {
                    console.log('----OK----', data.userId, data.profilePicture)
                    let obj = {
                        relation: friend.relation,
                        userId: data.userId,
                        profilePicture: data.profilePicture,
                        pseudo: data.pseudo,
                        firstname: data.firstname,
                        lastname: data.lastname
                    }
                    tabBack.push(obj)
                    tab.length === index+1 && resolve(tabBack)
                }
            )
            .catch(
                (e) => {console.log('erreur à getFriend')}
            )
    })})
        .then (
            (data) => {
                console.log('console.log data -----', data)
                res.json(data)
            })
        .catch((e) => console.log(e))
})

app.post('/signup', (req, res) => {
    const {pseudo, password, lastname, firstname, email, gender, age, city, zipCode, cellPhone} = req.body;
    console.log('YEPA !!!', pseudo, password, lastname, firstname, email, gender, age, city, zipCode, cellPhone)
    const saltRounds = 10;
    const timeStamp = Date.now()
    const userId = '_' + Math.random().toString(36).substr(2, 9)
    bcrypt.hash(password, saltRounds, function (err, hash) {
        existUser('email', email)
            .then(
                (data) => {
                    console.log('---------- YES ----------')
                    res.json({error: true, idMessage: 'error.emailExist'})
                }
            )

            .catch(
                (data) => {
                    console.log(data)
                    mongo.connect(urlDb, {useNewUrlParser: true}, function(err, client){
                        const collectionUser = client.db(dbName).collection(userCollection);
                        collectionUser.insertOne({
                            userId,
                            pseudo,
                            lastname,
                            firstname,
                            email,
                            gender,
                            age,
                            city,
                            zipCode,
                            cellPhone,
                            password: hash,
                            verifEmail: false,
                            createAccount: timeStamp,
                            rule: 0,
                            profileCover: 'https://previews.123rf.com/images/chekat/chekat1512/chekat151200014/49320319-seamless-de-bananes-m%C3%BBres-jaunes-sur-un-fond-bleu.jpg',
                            profilePicture: 'https://www.hominides.com/data/images/illus/grands_singes/gorille-genome-sequence.jpg'
                        }, (err, success) => {
                            if (success) {
                                console.log("User created: ");
                                res.json({error: false, idMessage: 'valid.userCreated'});
                            } else if (err) {
                                console.log('------------- User pas enregistré -----------')
                                res.json({error: true, idMessage: 'error.somethingWrong'})
                            }
                        })
                    })

                })

    })
})

app.post('/getUser', (req, res) => {
    const {email} = req.body
    console.log('Email reçu ', email)
    existUser('email', email)
        .then((user) => {
            res.json({
                success: true,
                user
            })
        })
        .catch((e) => console.log('Error sur GetUser ', e))
})

app.get('/getAllUser', (req,res) => {
    getAllUser()
        .then((data) => {
            console.log('---- Ready to give you the night -----', data.length)
            res.json({
                success: true,
                data
            })
        })
        .catch(e => console.log('Erreur au retour de getAllUser', e))
})

app.post('/log-in', (req, res) => {
    const {email, password} = req.body;
    console.log("User submitted: ", email, password);
    existUser('email', email)
        .then((user) => {
            console.log('User found:  ', user)
            if (user === null) {
                res.json({
                    success: false,
                    idMessage: 'error.userNotExist',
                    token: null
                })
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    console.log("Valid!");
                    let token = jwt.sign({username: email}, 'i change something 2day', {expiresIn: 129600});
                    console.log('token', token)
                    res.json({
                        success: true,
                        idMessage: 'valid.connect',
                        token,
                        user
                    });
                } else {
                    console.log("Entered Password and Hash do not match!");
                    res.json({
                        success: false,
                        idMessage: 'error.userNotExist',
                        token: null
                    })
                }
            })
        })
        .catch(() => {
            res.json({
                success: false,
                idMessage: 'error.userNotExist',
                token: null
            });
            console.log('DAWAAAAA')
        })
})

server.listen(port, () => console.log(`Listening on port ${port}`));

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


io.on("connection", socket => {
    console.log("New client connected", socket.id)
    // mongo.connect(urlDB, {useNewUrlParser: true}, function (err, client) {
    //     const collectionUser = client.db(dbName).collection('test');
    //     collectionUser.find()
    // })


    // socket.on('submitUser', (value) => {
    //     mongo.connect(urlDB, {useNewUrlParser: true}, (err, client) => {
    //         const collectionUser = client.db(dbName).collection('test');
    //         collectionUser.findOne({email: value.email},  (err, exist) => {
    //             console.log('err', err)
    //                 console.log('exist', exist)
    //             if (exist) {
    //                 socket.emit('userReturn', {error: false, exist})
    //             } else {
    //                 socket.emit('userReturn', {error: true, idMessage: 'error.userNotExist'})
    //             }
    //         })
    //     })
    //     console.log('Ok OK ----', value)
    // })

    //
    //                         // token: {},
    //                         // profilPicture: ["refHexa"],
    //                         // profilText: ""
    //                         // userSettings: {
    //                         //     color: "#hexa"
    //                         // },
    //                         // friends: {
    //                         //     asking: [{}],
    //                         //     already: [{}],
    //                         //     answer: [{}]
    //                         // },
    //                         // pictures: {
    //                         //     tagIn: {
    //                         //         waiting: ["refHexa"],
    //                         //         ready: []
    //                         //     },
    //                         //     post: [{
    //                         //         id: "refHexa",
    //                         //         tag: ["idUser"],
    //                         //         lieu: "",
    //                         //         legend: "",
    //                         //         comments: [{
    //                         //             postBy: "idUser",
    //                         //             message: ""
    //                         //         }],
    //                         //         likes: ["idUsers"]
    //                         //     }]
    //                         // },
    //                         // personnalWall: [],
    //                         // delay: [{
    //                         //     connect: "timestamp",
    //                         //     disconnect: "timestamp"
    //                         // }]
    //


    socket.on('test', () => {
        console.log('yes')
        socket.emit('reponse', {1: 'bonjour'})

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: 'luther.we@gmail.com',
            from: 'luther.we@gmail.com',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        if (sendMail) {
            sgMail.send(msg);
        }
    })

    socket.on("disconnect", () => console.log("Client disconnected"));
})


// const getApiAndEmit = async socket => {
//     try {
//         const res = await axios.get();
//         socket.emit("FromAPI", res.data.currently.temperature);
//     } catch (error) {
//         console.error(`Error: ${error.code}`);
//     }
// };
