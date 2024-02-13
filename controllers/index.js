const router = require('express').Router();

const viewRoutes = require('./viewRoutes');
const apiRoutes = require('./api');

router.use('/', viewRoutes);
router.use('/api', apiRoutes);

// serve up a 404 page to any invalid route
router.get("*", (req, res) => {
  res.status(404).send("<h1>404 Page Not Found</h1>");
}).

module.exports = router;