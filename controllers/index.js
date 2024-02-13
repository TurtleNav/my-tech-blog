const router = require('express').Router();
const viewRoutes = require('./viewRoutes');
const userRoutes = require('./userRoutes');

router.use('/', viewRoutes);
router.use('/users', apiRoutes);

module.exports = router;