import { User } from "../models/associations.js"

export const getUserRecord = async ( req, res ) => {
    try {
      const user = await User.findByPk(req.params.id);
  
      if (!user) {
        return res.status(404).json({
          status: 'Not Found',
          message: 'User not found',
          statusCode: 404,
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'User retrieved successfully',
        data: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (error) {
        
      res.status(500).json({
        status: 'error',
        message: 'An error occurred',
        statusCode: 500,
      });
    }
  };



  export const updateUserRecord = async ( req, res ) => {
    try {
      const user = await User.findByPk(req.params.id);
  
      if (!user) {
        return res.status(404).json({
          status: 'Not Found',
          message: 'User not found',
          statusCode: 404,
        });
      }

      const updatedUser = await user.update(req.body)
      res.status(200).json({
        status: 'success',
        message: 'User record updated successfully',
        data: {
          userId: updatedUser.userId,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phone: updatedUser.phone,
        },
      });
    } catch (error) {
        
      res.status(500).json({
        status: 'error',
        message: 'An error occurred',
        statusCode: 500,
      });
    }
  };



  export const deactivateUser = async ( req, res ) => {
    try {
      const user = await User.findByPk(req.params.id);
  
      if (!user) {
        return res.status(404).json({
          status: 'Not Found',
          message: 'User not found',
          statusCode: 404,
        });
      }
      
      const deletedUser = await user.destroy()
      res.status(200).json({
        status: 'success',
        message: 'User has been deactivated successfully',
        data: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (error) {
        
      res.status(500).json({
        status: 'error',
        message: 'An error occurred',
        statusCode: 500,
      });
    }
  };