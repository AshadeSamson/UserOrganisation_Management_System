import { User, Organisation} from "../models/associations.js"

export const getUserOganisations = async ( req, res ) => {

    try {
      const user = await User.findByPk(req.user.userId, {
        include: Organisation,
      });
  
      if (!user) {
        return res.status(404).json({
          status: 'Not Found',
          message: 'User not found',
          statusCode: 404,
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'Organisations retrieved successfully',
        data: {
          organisations: user.Organisations.map( (org) => {
            return {
              orgId: org.orgId,
              name: org.name,
              description: org.description
            }
          })
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





export const getOrganisation = async ( req, res ) => {

    try {
      const organisation = await Organisation.findByPk(req.params.orgId);
  
      if (!organisation) {
        return res.status(404).json({
          status: 'Not Found',
          message: 'Organisation not found',
          statusCode: 404,
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'Organisation retrieved successfully',
        data: {
          orgId: organisation.orgId,
          name: organisation.name,
          description: organisation.description
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





export const createOrganisation = async ( req, res ) => {
    const { name, description } = req.body;
  
    if (!name) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Client error',
        statusCode: 400,
      });
    }
  
    try {
      const organisation = await Organisation.create({
        name,
        description,
      });
  
      const user = await User.findByPk(req.user.userId);

      await user.addOrganisation(organisation)
  
      res.status(201).json({
        status: 'success',
        message: 'Organisation created successfully',
        data: {
          orgId: organisation.orgId,
          name: organisation.name,
          description: organisation.description
        },
      });
    } catch (error) {
      
      res.status(400).json({
        err: error.message,
        status: 'Bad Request',
        message: 'Client error',
        statusCode: 400,
      });
    }
  };





export const addUserToOrganisation = async ( req, res ) => {
    const { userId } = req.body;
    const { orgId } = req.params;
  
    try {
      const organisation = await Organisation.findByPk(orgId);
  
      if (!organisation) {
        return res.status(404).json({
          status: 'Not Found',
          message: 'Organisation not found',
          statusCode: 404,
        });
      }
  
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({
          status: 'Not Found',
          message: 'User not found',
          statusCode: 404,
        });
      }
  
      await organisation.addUser(user);
  
      res.status(200).json({
        status: 'success',
        message: 'User added to organisation successfully',
      });
    } catch (error) {
      
      res.status(500).json({
        status: 'error',
        message: 'An error occurred',
        statusCode: 500,
      });
    }
  };