const router = require('express').Router();

const userRoutes = require('./user-routes');
const assetRoutes = require('./asset-routes');

router.use('/users', userRoutes);
router.use('/assets', assetRoutes);

module.exports = router;