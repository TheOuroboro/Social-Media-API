const express = require("express");
const { 
  getAllposts, 
  getPostById, 
  createPost,
  getPostByLikeCount,
  getPostWithAuthor

} = require("../controllers/postController");


const router = express.Router();
router.get("/",getAllposts);
router.get("/:id",getPostById);
router.post("/",createPost);
router.get("/",getPostWithAuthor);
router.get("/",getPostByLikeCount);

// // Example: GET all posts
// router.get("/", (req, res) => {
//   res.send("Posts route is working 🚀");
// });

// //POST a new post
// router.post("/", (req, res) => {
//   const { userId, content } = req.body;
//   res.send(`Post created by user ${userId}: ${content}`);
// });


module.exports = router;
