const db = require ("../db");

//Like a Post
const likePost = async(req,res) => {
    try {
        const { user_id, post_id} = req.body ;

    if (!user_id || !post_id){
        return res.status(400).json({message: "UserId and postId are required"});
    }

    const sql = 
    `INSERT INTO likes (user_id,post_id)
    VALUES (?,?)`
    ;

    await db.promise().query(sql,[user_id,post_id]);
    res.status(201).json({message:"post liked successfully"});
    } catch (error) {
        if (error.code ==="ER_DUP_ENTRY"){
            return res.status(409).json({message: "yous already liked this post"})
        }
        res.status(500).json({error: error.message})

    }
    

} ;


//Unlike a post

const unlikePost = async(req,res) => {
    try {
        const { user_id, post_id} = req.body;
        if (!user_id || !post_id ){
            return res.status(400).json({message: "userId and postId is required"});
        }

        const sql = 
        ` DELETE FROM likes
        WHERE user_id = ? AND post_id = ?
        `;

        const [result] = await db.promise().query(sql, [user_id,post_id]);
        if (result.affectedRows === 0){
            res.status(409).json({message: "like not found"});
        }
        res.status(200).json({message: "like deleted"});

    } catch (error) {
        res.status(500).json({error: error.message});
    }

};

//get Posts with like
const getPostWithLikes = async (req, res) => {
    const post_id = req.params.id;
    try {
        const sql = `
            SELECT posts.id, posts.content, COUNT(likes.user_id) AS likes
            FROM posts 
            LEFT JOIN likes ON posts.id = likes.post_id
            WHERE posts.id = ?
            GROUP BY posts.id
        `;
        const [rows] = await db.promise().query(sql, [post_id]);
        if (rows.length === 0) {
            return res.status(404).json({    message: "Post not found" });
        }
        res.json({success: true, post:rows[0]});
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch post with like count" });
    }
};

module.exports = {
    likePost,
    unlikePost,
    getPostWithLikes
}