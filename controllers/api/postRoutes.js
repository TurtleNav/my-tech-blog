const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

// GET /api/posts
// Get all posts
router.get('/', async(req, res) => {
  try {
    const postsData = await Post.findAll({
      include: [
        {model: User, as: 'user'},
        {model: Comment, as: 'comment'}
      ]
    });
    return res.status(200).json(postsData);
  } catch(err) {
    res.status(500).json({message: err});
  }
});

// GET /api/posts/:id
// Get post by id
router.get('/:id', withAuth, async(req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).send("<h1>404 Page Not Found</h1>");
    }
    const post = postData.get({plain: true});
    const commentsData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {model: User}
      ]
    });
    const comments = commentsData.map((comment) => {
      comment.get({plain: true});
    })

    const isLoggedIn = req.session.isLoggedIn
    return res.status(200).render("post", {
      post,
      comments,
      isLoggedIn
    });

  } catch(err) {
    res.status(500).json({message: err});
  }
});

module.exports = router;