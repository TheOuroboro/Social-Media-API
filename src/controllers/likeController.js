const db = require ("../db");

//Like a Post
const likePost = async(req,res) => {
    try {
        const { userId, postId} = req.bdoy ;

    if (!userId || postId){
        return res.status(400).json({message: "UserId and postId are required"});
    }

    const sql = 
    `INSERT INTO likes (user_id,post_id)
    VALUES (?,?)`
    ;

    await db.query(sql,[postId,userId]);
    res.status(201).json({message:"message liked successfully"});
    } catch (error) {
        if (error.code ==="ER_DUP_ENTRY"){
            return res.status(409).json({message: "yous already liked this post"})
        }
        res.status(500).json({eroor: error.message})

    }
    

} ;


//Unlike a post

const unlikePost = async(res,req) => {
    try {
        const { userId, postId} = req.bdoy;
        if (!userId || postId ){
            return res.status(400).json({message: "userId and postId is required"});
        }

        const sql = 
        ` DELETE FROM likes
        WHERE user_id + ? AND postId = ?
        `;

        const [result] = await db.query(sql, [userId,postId]);
        if (result.affectedRows === 0){
            res.status(409).json({message: "like ot found"});
        }
        res.status(201),json({message: "you've successfully liked this post"});

    } catch (error) {
        res.status(500).json({error: error.message});
    }

};


module.exports = {
    likePost,
    unlikePost
}