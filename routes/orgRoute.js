import express from "express";
import { getOrganisation, getUserOganisations, createOrganisation, addUserToOrganisation } from "../controllers/organisationController.js";
import { verifyToken } from "../verification/verifyToken.js";


const organisationRouter = express.Router()

organisationRouter.get("/organisations", verifyToken, getUserOganisations)
organisationRouter.get("/organisations/:orgId", verifyToken, getOrganisation)
organisationRouter.post("/organisations", verifyToken, createOrganisation)
organisationRouter.post("/organisations/:orgId/users", verifyToken, addUserToOrganisation)




export default organisationRouter