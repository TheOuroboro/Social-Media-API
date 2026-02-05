const db = require("../db")

// CREATE A COMMENT
const createComment = async (req, res) => {
  const { user_id, post_id, content } = req.body;

  // 1. Validation
  if (!user_id || !post_id || !content) {
    return res.status(400).json({
      message: "userId, postId and content are required"
    });
  }

  try {
    const sql = `
      INSERT INTO comments (user_id, post_id, content)
      VALUES (?, ?, ?)
    `;

    await db.promise().query(sql, [user_id, post_id, content]);

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating comment" });
  }
};

// GET COMMENTS FOR A POST
const getPostComments = async (req, res) => {
  const post_id = req.params.id;

  try {
    const sql = `
      SELECT 
        comments.id,
        comments.content,
        comments.created_at,
        users.username
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = ?
      ORDER BY comments.created_at DESC
    `;

    const [comments] = await db.promise().query(sql, [post_id]);

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};


module.exports = {
    createComment,
    getPostComments
};