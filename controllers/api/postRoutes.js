const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

// GET /api/posts
// Get all posts
router.get('/', async(req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        {model: User, as: 'user'},
        {model: Comment, as: 'comment'}
      ]
    });
    return res.status(200).json(allPosts);
  } catch(err) {
    res.status(500).json({message: err});
  }
});

module.exports = router;