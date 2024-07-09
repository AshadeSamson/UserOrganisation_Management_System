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