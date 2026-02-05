const db = require ("../db");

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


        //Insert new post 
        const[result]= await db.promise().query("INSERT INTO posts (user_id, content) VALUES (?, ?)", [user_id, content]);

        //fetch the newly created posts 
        const [postRows] = await db.promise().query(`SELECT posts.id, posts.content, posts.created_at, users.id AS user_id, users.username
         FROM posts
         JOIN users ON posts.user_id = users.id
         WHERE posts.id = ?`,
         [result.insertId]
        );
        res.status(201).json({success: true, post: postRows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({status:false, message:"failes to create post"});
    }
};

// Get all posts
const getAllposts = async (req,res) => {
    try {
        const sql = 
        `SELECT 
        posts.id,
        posts.content,
        users.username
        FROM posts 
        JOIN users ON posts.user_id = users.id`;
        const[rows] = await db.promise().query(sql);


        if (rows.lenght === 0){
            return res.status(400).json({success: false, message: "Could not fetch post"});
        }
        res.status(200).json ({success:true,post:rows[0]});
    } catch (error) {
        console.error(error)
        res.status(500).json({success:false, message: " failed to get post"});

    }
};


// GET a single post by ID
const getPostById = async (req, res) => {
  const postId  = req.params.id;

  try {
    const sql = `
    SELECT 
    posts.id ,
    posts.content,
    posts.created_at,
    users.username,
    users.email

    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = ?
    `
    const [rows] = await db.promise().query(sql, [postId]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, post: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch post" });
  }
};



// Get post by like count
const getPostByLikeCount = async (req, res) => {
  const postId  = req.params;

  try {
    const sql = `
    SELECT 
    posts.id, 
    posts.content, 
    COUNT(likes.user_id) AS likes
    FROM posts 
    LEFT JOIN likes ON posts.id = likes.post_id
    WHERE posts.id = ?
    GROUP BY posts.id;
    `
    const [rows] = await db.promise().query(sql, [postId]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, post: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch post by like count" });
  }
};


// Get posts By Author Info
const getPostWithAuthor = async (req, res) => {

  try {
    const sql = `
    SELECT 
    posts.id ,
    posts.content,
    users.username,

    FROM posts
    JOIN users ON posts.user_id = users.id
    ORBER BY posts.created_at DESC
    `
    const [rows] = await db.promise().query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, post: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch post" });
  }
};






module.exports= {
    getAllposts,
    getPostById,
    createPost,
    getPostByLikeCount,
    getPostWithAuthor
};