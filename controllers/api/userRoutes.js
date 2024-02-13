const router = require('express').Router();
const {User} = require('../../models');

// signup route
// POST to /api/users
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    // use req.session to authenticate user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login route
// POST to /api/users/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'There are no users with that username' });
      return;
    }

    // use bcrypt to compare the provided password with the saved password hash
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password for that user' });
      return;
    }

    // if successful, save in req.session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


// logout route
// POST to /api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // delete our session:
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
