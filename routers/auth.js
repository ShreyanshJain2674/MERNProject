const express = require("express");
const Registers = require("../src/models/registers");
const bcrypt = require('bcrypt');
const authenticate = require("../middleware/authenticate");
const cooie  =require('cookie-parser');

const router = express.Router();

router.use(cooie());

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});


router.post("/login", async (req, res) => {

    const Password = req.body.password;
    const email = req.body.email;

    if(email && Password){
        const isuser = await Registers.findOne({ email: email })
        console.log(isuser);
        if(!isuser){
            var name = 'No user exist with this email';
            // res.render("error",{namee:name});
            return res.status(400).json({error:name});
        }else{
            const isMatch = await bcrypt.compare(Password,isuser.password);

            if(isMatch){
                // res.render("index");
                const token = await isuser.generateAuthToken();
                //console.log(token);

                res.cookie("jwtoken",token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly:true
                });

                return res.json({message:"SigninSuccessfull"});
            }else{
                var name = 'Please Enter Correct Password';
                // res.render("error",{namee:name});
                return res.status(400).json({error:name});
            }
        }

    }else{
        var name = 'Please Fill all credentials';
        // res.render("error",{namee:name});
        return res.status(400).json({error:name});
    }
});

router.post("/register", async (req, res) => {
    try {

        const Password = req.body.user_password;
        const cnfPass = req.body.confirm_password;
        

        if (Password === cnfPass) {
            console.log(req.body.last_name);
            const registerEmployee = new Registers({

                firstName: req.body.first_name,
                lastName: req.body.last_name,
                userName: req.body.user_name,
                password: Password,
                confirmPassword: cnfPass,
                email: req.body.email,
                contact: req.body.contact_no
            })

            const isuser = await Registers.findOne({ email: req.body.email })

            if (!isuser) {
                const registered = await registerEmployee.save();
                // res.status(201).render("index");
                res.status(201).json({message:"successfull"})
            } else {
                // var name = 'Duplicate Email, Hello '+isuser.firstName;
                // res.render("error",{namee:name});
                return res.status(422).json({error:"Duplicate Email"})
            }
        } else {
            // var name = 'Password not matching';
            // res.render("error",{namee:name});

            return res.status(422).json({error:"Password not matching"})
        }



    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get("/about", authenticate, (req,res) => {
    console.log("cdcd");
    res.send(req.rootUser);
});

router.get('/logout', (req,res) => {
    console.log("Hello my Logout PAge");
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("User Logout")
})

module.exports = router;
