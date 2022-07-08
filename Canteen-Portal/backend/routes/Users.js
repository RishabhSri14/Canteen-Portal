var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
// GET request 
// Getting all the users
router.get("/", function (req, res) {
    //Search request and the result gets stored in users

    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
        });

});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        age: req.body.age,
        batch: req.body.batch,
        phone: req.body.phone,
        email: req.body.email,
        pass: req.body.pass,
        date: req.body.date
    });
    const email = req.body.email;
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            return res.json(null);
            // console.log("Email Already present");
        }
    });


});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.pass;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            // console.log("Email not found!");
            res.json(null);
        }
        else {
            if (user.pass === password) {

                console.log("Login Successful!");
                res.json(user);
                // return user;
            }
            else {
                console.log(user.pass);
                res.json(null);
            }
        }
    });
});

router.post("/profile", function (req, res) {
    var Lemail = req.body.email;
    if (Lemail == null) {
        res.json(null);
    }
    else {
        User.findOne({ email: Lemail }).then(user => {
            // Check if user email exists
            if (!user) {
                // console.log("Email not found!");
                res.json(null);
            }
            else {
                // console.log("Login Successful!");
                res.json(user);
            }
        });
    }

});

router.post("/edit", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        age: req.body.age,
        batch: req.body.batch,
        phone: req.body.phone,
        email: req.body.email,
        pass: req.body.pass,
        date: req.body.date
    });
    const email = req.body.pemail;
    User.findOne({ email })
        .then(user => {
            user.name = newUser.name;
            user.age = newUser.age;
            user.batch = newUser.batch;
            user.phone = newUser.phone;
            user.email = newUser.email;
            user.pass = newUser.pass;
            user.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });

        })

        .catch(err => {
            // console.log("UnableTofind");
            res.status(400).json(null);
        });
});

router.post("/AddMoney", (req, res) => {
    const email = req.body.email;
    User.findOne({ email })
        .then(user => {
            user.wallet = user.wallet + req.body.wallet;
            user.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });

        })

        .catch(err => {
            // console.log("UnableTofind");
            res.status(400).json(null);
        });
});

module.exports = router;

