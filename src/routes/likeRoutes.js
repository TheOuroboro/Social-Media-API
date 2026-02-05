const express = require ("express");
const router = express.Router();


const {
    likePost,
    unlikePost,
    getPostWithLikes
} = require("../controllers/likeController");

router.post("/", likePost);
router.delete("/", unlikePost);
router.get("/:id",getPostWithLikes)

// //Get all comments
// router.get ("/", (req,res)=>{
//     res.send("Like routes working");
// })

// //Post a new comment
// router.post("/", (req,res) => {
//     const {userId, postId} = req.body;
//     res.send(`User ${userId} liked post ${postId}`);
// });

module.exports = router;