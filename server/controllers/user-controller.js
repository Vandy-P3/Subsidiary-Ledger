const { User } = require('../models');
const { signToken } = require('../utils/auth');

const userController = {
     // get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({ _id: user ? user._id : params.id });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },

  async getAllUsers(req, res) {
    const foundUsers = await User.find();

    if (!foundUsers) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUsers);
  },

  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async login({ body }, res) {
    const user = await User.findOne({  email: body.email });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    const token = signToken(user);
    res.json({ token, user });
    
  },

  async createAsset({ user, body }, res) {
    console.log(user);
    try {
        const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { assets: body } },
        { new: true, runValidators: true }
        );
        return res.json(updatedUser);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
  },
  
  async deleteAsset({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { assets: { _id: params.assetId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  }
};

module.exports = userController