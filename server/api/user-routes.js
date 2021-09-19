const router = require('express').Router();

//  from user-controller
const {
    createUser,
    getSingleUser,
    login,
    createAsset,
    deleteAsset,
    getAllUsers
} = require('../controllers/user-controller')

// import middleware
const { authMiddleware } = require('../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, createAsset).get(getAllUsers);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/assets/:assetId').delete(authMiddleware, deleteAsset);


module.exports = router;