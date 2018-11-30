const router = require("express").Router();

router.get("/submit", (req, res) => {
    console.log('FUUUUUUU ----------', req)
    // res.send({ response: "I am alive" }).status(200);
});

module.exports = router;