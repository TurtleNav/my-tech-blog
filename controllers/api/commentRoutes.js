const router = require('express').Router();
const {Comment} = require('../../models');

// Singular necessary comment route - 
// (May make another get route to view comments but that would require another view)

// POST /api/comments
// Create a comment
router.post('/', async(req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.comment,
      creator_id: req.session.user_id
    });
    return res.status(200).json(newComment);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;