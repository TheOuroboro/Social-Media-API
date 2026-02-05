const express = require ("express");
const router = express.Router();

const {
  followUser,
  unfollowUser,
  getFollowers
} = require("../controllers/followControllers");

router.post("/", followUser);
router.delete("/", unfollowUser);
router.get("/:id",getFollowers);



module.exports = router;