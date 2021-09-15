const router = require('express').Router();

//  from user-controller
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user-controller')

//  /api/users GET, POST
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

//  /api/users/:id  GET, PUT, DELETE
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;