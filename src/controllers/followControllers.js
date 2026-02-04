const db = require ("../db");
/**
 * POST/follows 
 * body: {followerId, FollowedID
 */ 
const followUser = async(req,res) => {
    const {followerId,followingId} = req.body ;

    if (!followerId || !followingId) {
        return res.status(400).json({message: "Missing followerId of FollowingId"})
    }
    if (followerId === followingId){
        return res.status(400).json({message: "you cannot follow yourself"})
    }

    try {
        const sql =`
        INSERT INTO follows (follower_id,following_id)
        VALUES(?, ?)
        `;
        await db.promise().query(sql,[followerId,followingId]);

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
    const { followerId,followingId} = req.body;

    if (!followerId || !followingId){
        return res.status(400).json({message: "Missing followerId or followingId"})
    }
    try {
        const sql = `
        DELETE FROM follows
      WHERE follower_id = ? AND following_id = ?
      `;

      const [result] = await db.promise().query(sql,[followerId,followingId]);

      if (result.affectedRows === 0){
        return res.status(404).json({message:"You're not following this user"});
      }
      res.json({message: "User unfollowed successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getFollowers = async (req, res) => {
    const userId = req.params.id;
    try {
        const sql = `
            SELECT users.username
            FROM follows 
            JOIN users  ON follows.follower_id = users.id
            WHERE follows.following_id = ?
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