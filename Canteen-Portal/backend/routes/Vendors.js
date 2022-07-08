var express = require("express");
var router = express.Router();

// Load Vendor model
const Vendor = require("../models/Vendors");
const Food = require("../models/Foods");
const Order = require("../models/Orders");

// GET request 
// Getting all the vendors
router.get("/", function (req, res) {
    //Search request and the result gets stored in vendors
    Vendor.find()
        .then(vendors => {
            res.json(vendors);
        })
        .catch(err => {
            console.log(err);
        });

});
router.get("/food", function (req, res) {
    //Search request and the result gets stored in vendors
    Food.find()
        .then(food => {
            res.json(food);
        })
        .catch(err => {
            console.log(err);
        });

});

router.get("/orders", function (req, res) {
    //Search request and the result gets stored in vendors
    Order.find()
        .then(order => {
            res.json(order);
        })
        .catch(err => {
            console.log(err);
        });

});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a vendor to db
router.post("/register", (req, res) => {
    const newVendor = new Vendor({
        Mname: req.body.Mname,
        shop: req.body.shop,
        phone: req.body.phone,
        otime: req.body.otime,
        ctime: req.body.ctime,
        email: req.body.email,
        pass: req.body.pass,
        date: req.body.date
    });
    const email = req.body.email;
    Vendor.findOne({ email }).then(vendor => {
        // Check if vendor email exists
        if (!vendor) {
            newVendor.save()
                .then(vendor => {
                    res.status(200).json(vendor);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            return res.json(null);
        }
    });


});


// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.pass;
    Vendor.findOne({ email }).then(vendor => {
        if (!vendor) {
            // console.log("Email not found!");
            res.json(null);
        }
        else {
            if (vendor.pass === password) {
                // console.log("Login Successful!");
                res.json(vendor);
            }
            else {
                // console.log("Incorrect Password!");
                res.json(null);
            }
        }
    })
});

router.post("/profile", function (req, res) {
    var Lemail = req.body.email;
    if (Lemail == null) {
        res.json(null);
    }
    else {
        Vendor.findOne({ email: Lemail }).then(vendor => {
            // Check if user email exists
            if (!vendor) {
                // console.log("Email not found!");
                res.json(null);
            }
            else {
                // console.log("Login Successful!");
                res.json(vendor);
            }
        });
    }

});

router.post("/edit", (req, res) => {
    const newVendor = new Vendor({
        Mname: req.body.Mname,
        shop: req.body.shop,
        phone: req.body.phone,
        otime: req.body.otime,
        ctime: req.body.ctime,
        email: req.body.email,
        pass: req.body.pass,
        date: req.body.date
    });
    const email = req.body.pemail;
    Vendor.findOne({ email })
        .then(vendor => {
            vendor.Mname = newVendor.Mname;
            vendor.shop = newVendor.shop;
            vendor.otime = newVendor.otime;
            vendor.ctime = newVendor.ctime;
            vendor.phone = newVendor.phone;
            vendor.email = newVendor.email;
            vendor.pass = newVendor.pass;
            vendor.save()
                .then(vendor => {
                    res.status(200).json(vendor);
                })
                .catch(err => {
                    res.status(400).send(err);
                });

        })

        .catch(err => {
            res.status(400).json(null);
        });
});



router.post("/foodAdd", (req, res) => {

    const newFood = new Food({
        name: req.body.name,
        price: req.body.price,
        rating: 0,
        foodtype: req.body.foodtype,
        Vendor_id: req.body.Vendor_id,
        addons: req.body.addons,
        tags: req.body.tags
    });



    console.log(newFood);

    Food.findOne({
        name: newFood.name,
        price: newFood.price,
        rating: newFood.rating,
        foodtype: newFood.foodtype,
        Vendor_id: newFood.Vendor_id,
        addons: newFood.addons,
        tags: newFood.tags
    })
        .then(food => {
            if (!food) {
                newFood.save()
                    .then(food1 => {
                        console.log(food1);
                        res.status(200).json(food1);

                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            }
            else {
                return res.json(null);
            }
        });


});

router.post("/foodEdit", (req, res) => {
    const newFood = new Food({
        name: req.body.name,
        price: req.body.price,
        foodtype: req.body.foodtype,
        addons: req.body.addons,
        tags: req.body.tags
    });
    const email = req.body.pemail;
    Food.findById(req.body.fid)
        .then(food => {
            food.name = newFood.name,
                food.price = newFood.price,
                food.foodtype = newFood.foodtype,
                food.addons = newFood.addons,
                food.tags = newFood.tags
            food.save()
                .then(food1 => {
                    res.status(200).json(food);
                })
                .catch(err => {
                    res.status(400).send(err);
                });

        })

        .catch(err => {
            res.status(400).json(null);
        });
});
// to be tested
router.delete("/deleteFood/:id", (req, res) => {
    Food.findByIdAndDelete(req.params.id)
        .then(deletefood => {
            res.json(deletefood)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get("/getFood/:id", (req, res) => {
    Food.findById(req.params.id)
        .then(food => {
            res.json(food)
        })
        .catch((err) => {
            res.json(null)
        })
})

router.post("/setFoodRat/:id", (req, res) => {
    Food.findById(req.params.id)
        .then(food => {
            food.rating =req.body;
            food.save()
            .then((response) =>{
                console.log(response);
            })
            .catch((err)=>{
                res.status(400).send(err);
            })
        })
        .catch((err) => {
            res.send(err)
        })
})
router.get("/getVname", (req, res) => {
    Vendor.findById(req.body)
        .then(vendor => {
            res.json(vendor)
        })
        .catch((err) => {
            res.json(null)
        })
})

router.post("/updateStatus/:id", (req, res) => {
    const newStat = req.body;
    Order.findById(req.params.id)
        .then(order => {
            order.status = newStat;
            order.save()
                .then(order1 => {
                    res.status(200).json(order1);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        })

        .catch((err) => {
            res.json(null)
        })
})

router.delete("/deleteOrder/:id", (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(deleteorder => {
            res.json(deleteorder)
        })
        .catch((err) => {
            res.json(null)
        })
})

router.post("/getStatus", (req, res) => {
    const reqStat = req.body;
    Order.find({ status: reqStat })
        .then(order => {
            res.json(order)
        })

        .catch((err) => {

            res.status(400).send(err)
        })
})

router.post("/getStatus", (req, res) => {

    const reqStat = req.body.str;
    Order.find({ Vendor_id: req.body.id })

        .then(order => {
            order.find({ status: reqStat })
            .then(order1 => {
                res.json(order1)
            })

            .catch((err) => {

                res.status(400).send(err)
            })
        })
        .catch((err) => {

            res.status(400).send(err)
        })
})

module.exports = router;

