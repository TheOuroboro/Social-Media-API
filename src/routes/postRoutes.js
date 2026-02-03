const express = require("express");
const { getAllposts, getPostById, createPost } = require("../controllers/postController");
const { routes } = require("../app");
const router = express.Router();
router.get("/",getAllposts);
router.get("/:id",getPostById);
router.get("/",createPost);

// Example: GET all posts
router.get("/", (req, res) => {
  res.send("Posts route is working 🚀");
});

//POST a new post
router.post("/", (req, res) => {
  const { userId, content } = req.body;
  res.send(`Post created by user ${userId}: ${content}`);
});


module.exports = router;
