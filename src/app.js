const express = require ("express");

const app = express();

// Middleware
app.use(express.json());  // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses form data


//Import routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const followRoutes = require("./routes/followRoutes");
const commentRoutes = require("./routes/commentRoutes")

//use  Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/follows", followRoutes);

//Test Routes
app.get ("/",(req,res) => {
    res.send("Social Media Api is running")
})

module.exports = app;

