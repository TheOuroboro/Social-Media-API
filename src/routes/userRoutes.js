const express = require ("express");
const router = express.Router();
const { getAllUsers, createUser } = require ("../controllers/userController")


//Get all user
router.get("/", (req,res)=> {
    res.send("Useers route is working");
});

//post a new user
router.post("/", (req,res) => {
    const {username,email} = req.body;
    res.send(`User created: ${username} (${email})`);
});

module.exports = router;