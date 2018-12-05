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

const urlDb = process.env.MONGODB_URI
const dbName = 'heroku_n1xpb5mr';
const userCollection = 'user'

mongo.connect(urlDb, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    console.log("Database connection ready");

});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


const jwtMW = exjwt({
    secret: 'i change something 2day'
});

/// CHECKING DIVERS ET VARIE SUR DB
const getAllUser = () => {
    return new Promise((resolve, reject) => {
        mongo.connect(urlDb, { useNewUrlParser: true },(err, client) => {
            if (typeof client !== 'undefined' && client !== null) {
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
                    exist ? resolve(exist) : reject(err)
                })
            }

        })
    })
}

const existUser = (propDB, value) => {
    return new Promise((resolve, reject) => {
        mongo.connect(urlDb, {useNewUrlParser: true}, function(err, client){
            if (typeof client !== 'undefined' && client !== null) {
                const collectionUser = client.db(dbName).collection(userCollection);
                collectionUser.findOne({
                    [`${propDB}`]: value
                }, (err, exist) => {
                    exist ? resolve(exist) : reject(err)
                })
            }
        })
    })
}

const removeUser = (propDB, value) => {
    return new Promise((resolve, reject) => {
        mongo.connect(urlDb, {useNewUrlParser: true}, function(err, client){
            if (typeof client !== 'undefined' && client !== null) {
                const collectionUser = client.db(dbName).collection(userCollection);
                collectionUser.remove({
                    [`${propDB}`]: value
                }, (err, ok) => {
                    ok ? resolve(ok) : reject(err)
                })
            }
        })
    })
}

app.post('/deleteUser', (req, res) => {
    const {userId} = req.body;
    removeUser('userId', userId)
        .then((data) => {
            res.json({
                success: true,
                idMessage: 'valid.deleteAccount'
            })
        })
        .catch((data) => {
            res.json({
                success: false,
                idMessage: 'error.noDeleteAccount'
            });
        })
});

app.get('/getUser/:id', (req, res) => {
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
                res.json(data)
            })
        .catch((e) => console.log(e))
})

app.post('/signup', (req, res) => {
    const {pseudo, password, lastname, firstname, email, gender, age, city, zipCode, cellPhone} = req.body;
    const saltRounds = 10;
    const timeStamp = Date.now()
    const userId = '_' + Math.random().toString(36).substr(2, 9)
    bcrypt.hash(password, saltRounds, function (err, hash) {
        existUser('email', email)
            .then(
                (data) => {
                    res.json({error: true, idMessage: 'error.emailExist'})
                }
            )

            .catch(
                (data) => {
                    mongo.connect(urlDb, {useNewUrlParser: true}, function(err, client){
                        if (typeof client !== 'undefined' && client !== null) {
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
                                    res.json({error: false, idMessage: 'valid.userCreated'});
                                } else if (err) {
                                    res.json({error: true, idMessage: 'error.somethingWrong'})
                                }
                            })
                        }
                    })

                })

    })
})

app.post('/getUser', (req, res) => {
    const {email} = req.body
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
            res.json({
                success: true,
                data
            })
        })
        .catch(e => console.log('Erreur au retour de getAllUser', e))
})

app.post('/log-in', (req, res) => {
    const {email, password} = req.body;
    existUser('email', email)
        .then((user) => {
            if (user === null) {
                res.json({
                    success: false,
                    idMessage: 'error.userNotExist',
                    token: null
                })
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    let token = jwt.sign({username: email}, 'i change something 2day', {expiresIn: 129600});
                    res.json({
                        success: true,
                        idMessage: 'valid.connect',
                        token,
                        user
                    });
                } else {
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

io.on("connection", socket => {

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

// server.listen()
server.listen(port, () => console.log(`Listening on port ${port}`));
