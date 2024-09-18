import { app } from "../server";
import  request  from "supertest";
import { User, Organisation } from "../models/associations";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


jest.mock("../models/associations");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");


describe("Auth Endpoints", () => {

    const testUser = {
        userId: 1111,
        firstName: 'Ashade',
        lastName: 'Samson',
        email: 'ashon@example.com',
        password: 'hashed_password',
        phone: '1234567890',
      };
    
    const token = "jwtSampleToken"
})