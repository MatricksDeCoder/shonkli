const UserModel   = require('../models/user.model')

// GET ALL USERS  => [GET] ../users  
exports.getAllUsers = async (req,res,next) => {
  console.log('getAllUsers: [GET] /users')
    try {
        const users = await UserModel.find()
          .lean()
          .select('_id firstName lastName bio twitterName');
    
        res.json({
          users
        })
      } catch (err) {
        return res.status(400).json({
          message: 'There was a problem getting the users'
        });
      }
}

// GET ONE USER BY ID => [GET] ../users/:id 
exports.getOneUser = async (req,res,next) => {
  console.log('getOneUser: [GET] /users/:id')
  try {
      const one = await UserModel.findById(req.params.id)
      console.log("OK getOne USER: ", one)
      return res.status(200).json(one)
  } catch(error) {
      console.log('ERROR in getOne ' + "USER: ", error)
      return res.status(500).json(error);
  }
}

// DELETE ONE USER => ([DELETE] ../users/:id)
exports.deleteOneUser = async (req,res, next) => {
  console.log('deleteOneUser: [DELETE] /users/:id')
  try {
      console.log("TRYING TO DELETE!!!!")
      const deleted = await UserModel.remove({_id:req.params.id})
      console.log('OK deleteOne USER: ', );
      return res.status(200).json(deleted);
  } catch(error) {
    
      console.log('ERROR in deleteOne ' + 'USER:', error);
      return res.status(500).json(error);
  }
}

// GET A USERS BIO => ([GET] ../users/bio)
exports.getBioUser = async (req,res,next) => {
    console.log('getBioUser: [GET] /users/bio')
    try {
        const { sub } = req.user;
        const user = await User.findOne({
          _id: sub
        })
          .lean()
          .select('bio');
    
        res.json({
          bio: user.bio
        });
      } catch (err) {
        return res.status(400).json({
          message: 'There was a problem updating your bio'
        });
      }
}
  
// CHANGE A USERS BIO => ([PATCH] ../users/bio)
exports.patchBioUser = async (req,res,next) => {
    console.log('patchBioUser: [PATCH] /users/bio')
    try {
        const { sub } = req.user;
        const { bio } = req.body;
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: sub
          },
          {
            bio
          },
          {
            new: true
          }
        );
    
        res.json({
          message: 'Bio updated!',
          bio: updatedUser.bio
        });
      } catch (err) {
        return res.status(400).json({
          message: 'There was a problem updating your bio'
        });
      }
  
} 

// GET A USERS ROLE => ([GET] ../users/role)
exports.getUserRole =  async (req, res) => {
  console.log('getUserRole: [GET] /users/role')
  try {
    const { role } = req.body;
    const allowedRoles = ['user', 'admin'];

    if (!allowedRoles.includes(role)) {
      return res
        .status(400)
        .json({ message: 'Role not allowed' });
    }
    await User.findOneAndUpdate(
      { _id: req.user.sub },
      { role }
    );
    res.json({
      message:
        'User role updated. You must log in again for the changes to take effect.'
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
}

// CHANGE A USERS ROLE => ([PATCH] ../users/role)
exports.patchUserRole = async (req, res) => {
    console.log('patchUserRole: [PATCH] /users/role')
    try {
      const { role } = req.body;
      const allowedRoles = ['user', 'admin'];
  
      if (!allowedRoles.includes(role)) {
        return res
          .status(400)
          .json({ message: 'Role not allowed' });
      }
      await User.findOneAndUpdate(
        { _id: req.user.sub },
        { role }
      );
      res.json({
        message:
          'User role updated. You must log in again for the changes to take effect.'
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
}



