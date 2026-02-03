// CREATE A COMMENT
const createComment = async (req, res) => {
  const { userId, postId, content } = req.body;

  // 1. Validation
  if (!userId || !postId || !content) {
    return res.status(400).json({
      message: "userId, postId and content are required"
    });
  }

  try {
    const sql = `
      INSERT INTO comments (user_id, post_id, content)
      VALUES (?, ?, ?)
    `;

    await db.query(sql, [userId, postId, content]);

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating comment" });
  }
};

// GET COMMENTS FOR A POST
const getPostComments = async (req, res) => {
  const postId = req.params.id;

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

    const [comments] = await db.query(sql, [postId]);

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};


module.exports = {
    createComment,
    getPostComments
};