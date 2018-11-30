const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 5000;
const path = require('path')
const sgMail = require('@sendgrid/mail');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const sendMail= false

server.listen(port, () => console.log(`Listening on port ${port}`));


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}



io.on("connection", socket => {
    console.log("New client connected", socket.id)

    socket.on('submitUser', (value) => {
        console.log('Ok OK ----', value)
        socket.emit('userOk', {1: 2})
    })

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
});



// const getApiAndEmit = async socket => {
//     try {
//         const res = await axios.get();
//         socket.emit("FromAPI", res.data.currently.temperature);
//     } catch (error) {
//         console.error(`Error: ${error.code}`);
//     }
// };
