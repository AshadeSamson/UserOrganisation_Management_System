import { app } from "../server";
import  server  from "../app";
import { db } from "../config/db";
import  request  from "supertest";
import { User, Organisation } from "../models/associations";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";


jest.mock("../models/associations");
jest.mock("bcryptjs/dist/bcrypt.js");
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

    beforeEach(() => {
      bcrypt.hash.mockResolvedValue('hashed_password');
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue(token);
  
      User.create.mockResolvedValue(testUser);
      Organisation.create.mockResolvedValue({ name: "Ashade's Organisation", description: '' });
      User.findOne.mockResolvedValue(testUser);
    });


    afterAll(async () => {
      await db.close(); 
      server.close();  
    });


    // register endpoint test
    test("should register new user and return token", async () => {
      const res = await request(app)
      .post("/auth/register")
      .send({
        firstName: 'Ashade',
        lastName: 'Sams',
        email: 'ashons@example.com',
        password: 'password123',
        phone: '1234567890',
      })

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          status: 'success',
          message: 'Registration successful',
          data: {
            accessToken: token,
            user: expect.objectContaining({
              userId: testUser.userId,
              firstName: testUser.firstName,
              lastName: testUser.lastName,
              email: testUser.email,
              phone: testUser.phone,
            }),
          },
        })
      )
    })



    // login endpoint test
    test("should login user and return token", async () => {
      const res = await request(app)
      .post("/auth/login")
      .send({
         email: 'ashon@example.com',
         password: 'password123',
       })


       expect(res.statusCode).toEqual(200);
       expect(res.body).toEqual(
        expect.objectContaining({
          status: 'success',
          message: 'Login successful',
          data: {
            accessToken: token,
            user: expect.objectContaining({
              userId: testUser.userId,
              firstName: testUser.firstName,
              lastName: testUser.lastName,
              email: testUser.email,
              phone: testUser.phone,
            }),
          },
        })
      )
    })


    // login failure test
    test("shouldn't log user in and return error message", async () => {
      bcrypt.compare.mockResolvedValue(false);
      const res = await request(app)

      .post("/auth/login")
      .send({
         email: 'wrongemail@example.com',
         password: 'wrongpassword',
       })

       expect(res.statusCode).toEqual(401);
       expect(res.body).toEqual(
        expect.objectContaining({
          status: 'Bad request',
          message: 'Authentication failed',
          statusCode: 401,
        })
       )
    })
})