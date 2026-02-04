const express = require ("express");
const router = express.Router();


const {
    createComment,
    getPostComments
}  = require("../controllers/commentController");

router.post("/", createComment);
router.get("/posts/:id/comments" , getPostComments);



// //Post a new comment
// router.post("/", (req,res) => {
//     const {userId, postId, content} = req.body;
//     res.send(`comment created by user ${userId} on post ${postId}: ${content}`);
// });

module.exports = router;