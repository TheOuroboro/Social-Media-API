const db = require ("../db");


// Get all user
const getAllUsers = async (req,res) => {
    try {
        const[rows] = await db.promise().query("SELECT ID , username, email, created_at FROM users")
        res.json ({success:true,users:row});
    } catch (error) {
        console.error(error)
        res.status(500).json({success:false, message: " failed to get users"});

    }
};

//create a new user
const createUser = async (req,res)=> {
    const {username, email} = req.body
    if(!username ||  !email) {
        return res.status(400).json({success: false, message: "username and email are requires"});
    }
    try {
        //inset into table
        const [result] = await db
        .promise()
        .query("INSERT INTO users (name,email) VALUES (?,?)", [username,email]);

        //return the created user 
        const[rows ]= await db.promise().query("SELECT id, username, email, created_at FROM users WHERE ID = ? ",[results.InsertId]);
        res.status(201).json ({success:true, user: row [0]});
    } catch (error) {
        console.error(error);
        
        //Handle duplicate username/email
        if (error.code === "ER_DUP_ENTRY"){
            return res.status(400).json({ success:false, message: "Username or email already in use"});
        }
        res.status(500).json({status:false, message:"failes to create user"});
    }
};


module.exports= {
    getAllUsers,
    createUser,
};