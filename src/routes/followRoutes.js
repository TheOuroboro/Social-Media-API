const express = require ("express");
const router = express.Router();

const {
  followUser,
  unfollowUser
} = require("../controllers/followControllers");

router.post("/", followUser);
router.delete("/", unfollowUser);


// //Get all comments
// router.get ("/", (req,res)=>{
//     res.send("follow routes working");
// })

// //Post a new comment
// router.post("/", (req,res) => {
//     const {followerId, FollowedId} = req.body;
//     if (followerId === FollowedId){
//         return res.status(400).sendFile("user cannot follow themselves")
//     }
//     res.send(`User ${followerId} followed ${FollowedId}`)
// });

module.exports = router;