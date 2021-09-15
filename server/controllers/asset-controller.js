const {Asset, User} = require('../models');

const assetController = {
    createAsset({body}, res) {
        Asset.create(body)
        .then(assetData => {
            res.json(assetData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    },
    getAllAssets(req, res) {
        Asset.find()
        .select('-__v')
        .then(assetData => res.json(assetData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    }
    
}

module.exports = assetController;