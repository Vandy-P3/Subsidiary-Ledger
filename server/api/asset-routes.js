const router = require('express').Router();

//  from user-controller
const {
    createAsset, 
    getAllAssets
} = require('../controllers/asset-controller')

//  /api/users GET, POST
router
    .route('/')
    .get(getAllAssets)
    .post(createAsset)

module.exports = router;