const { User } = require('../models');
const { signToken } = require('../utils/auth');

const userController = {
     // get a single user by either their id or their username
  async getSingleUser({ user = null, session }, res) {
    const foundUser = await User.findOne({ _id: user ? user._id : session.id });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
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

  async login({ body, session }, res) {
    const user = await User.findOne({  email: body.email });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    session.save(() => {
        session.userId = user._id;
        session.userEmail = user.email;
        
        res.json({ token, user });
    })
    
  }
};

module.exports = userController