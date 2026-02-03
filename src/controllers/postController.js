const db = require ("../db");


// Get all posts
const getAllposts = async (req,res) => {
    try {
        const[rows] = await db.promise().query(`SELECT posts.id, posts.content, posts.created_at, users.id AS user_id, users.username
         FROM posts
         JOIN users ON posts.user_id = users.id
         WHERE posts.id = ?`,
        [id]
        );
        if (rows.lenght === 0){
            return res.staust(400).json({success: false, message: "Could not fetch post"});
        }
        res.json ({success:true,post:row[0]});
    } catch (error) {
        console.error(error)
        res.status(500).json({success:false, message: " failed to get post"});

    }
};


// GET a single post by ID
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT posts.id, posts.content, posts.created_at, users.id AS user_id, users.username
         FROM posts
         JOIN users ON posts.user_id = users.id
         WHERE posts.id = ?`,
        [id]
      );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.json({ success: true, post: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch post" });
  }
};

//create a new post
const createPost = async (req,res)=> {
    const {user_id, content} = req.body
    if(!user_id ||  !content) {
        return res.status(400).json({success: false, message: "user_id and content required"});
    }
    try {
        //make sure the user exist
        const [userRows] = await db
        .promise()
        .query("SELECT id FROM users WHERE id = ?", [user_id]);
        if (userRows.lenght ===0 ){
            return res.status(400).json({success:false,message: "User does not exist"});
        }


        //Inser new post 
        const[result ]= await db.promise().query("INSERT INTO posts (user_id, content) VALUES (?, ?)", [user_id, content]);

        //fetch the newly created posts 
        const [postRows] = await db.promise().query(`SELECT posts.id, posts.content, posts.created_at, users.id AS user_id, users.username
         FROM posts
         JOIN users ON posts.user_id = users.id
         WHERE posts.id = ?`,
         [result.insertId]
        );
        res.status(201).json({success: true, post: postRow[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({status:false, message:"failes to create post"});
    }
};


module.exports= {
    getAllposts,
    getPostById,
    createPost,
};