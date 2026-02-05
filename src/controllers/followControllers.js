const db = require ("../db");
// follow a user
const followUser = async(req,res) => {
    const {follower_id,followed_id} = req.body ;

    if (!follower_id || !followed_id) {
        return res.status(400).json({message: "Missing followerId or FollowedId"})
    }
    if (follower_id === followed_id){
        return res.status(400).json({message: "you cannot follow yourself"})
    }

    try {
        const sql =`
        INSERT INTO follows (follower_id,followed_id)
        VALUES(?, ?)
        `;
        await db.promise().query(sql,[follower_id,followed_id]);

        res.status(201).json({message: "you're now following this handle"})
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY"){
            return res.status(409).json({message:"Already following this user"});
        }
        res.status(500).json({error:error.message});
    }
};

/**
 * DELETE /FOLLOWS
 * BODY: {FOLLOWEDiD, FOLLOWINGID}
 */

const unfollowUser = async (req,res) => {
    const { follower_id,followed_id} = req.body;

    if (!follower_id || !followed_id){
        return res.status(400).json({message: "Missing followerId or followinged"})
    }
    try {
        const sql = `
        DELETE FROM follows
      WHERE follower_id = ? AND followed_id = ?
      `;

      const [result] = await db.promise().query(sql,[follower_id,followed_id]);

      if (result.affectedRows === 0){
        return res.status(404).json({message:"You're not following this user"});
      }
      res.json({message: "User unfollowed successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


//get followers
const getFollowers = async (req, res) => {
    const userId = req.params.id;
    try {
        const sql = `
            SELECT users.username
            FROM follows 
            JOIN users  ON follows.follower_id = users.id
            WHERE follows.followed_id = ?
        `;
        const [rows] = await db.promise().query(sql, [userId]);
        res.json(rows); // array of usernames
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch followers" });
    }
};



module.exports = {
    followUser,
    unfollowUser,
    getFollowers
};