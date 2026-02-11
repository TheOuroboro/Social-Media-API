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



module.exports = router;
