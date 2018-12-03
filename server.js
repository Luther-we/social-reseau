const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 5000;
const path = require('path')
const sgMail = require('@sendgrid/mail')
const dbInterface = require('./modules/db.js')
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const sendMail = false


const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

// const dbName = "test"
const userCollection = 'test'
// const urlDB = "mongodb://localhost:27017/user"
// const urlDB = "mongodb://heroku_j7ckfmlg:fokty2-pevvih-quRkip@ds215093.mlab.com:15093/heroku_j7ckfmlg";
// const dbName = 'heroku_rgz600fc';

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
const existUser = (propDB, value) => {
    return new Promise((resolve, reject) => {
        dbInterface.connectDB(function (db) {
            const collectionUser = db.collection(userCollection);
            collectionUser.findOne({
                [`${propDB}`]: value
            }, (err, exist) => {
                exist ? resolve(exist) : reject(err)
            })
        })
    })
}
existUser('email', 'jnaymar@net.com')
    .then((data) => {console.log('User exist /////', data)})
    .catch((data) => {console.log('Nop /////', data)})

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
                    dbInterface.connectDB(function (db) {
                        const collectionUser = db.collection(userCollection);
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
                            rule: 0
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
            res.json(false);
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
