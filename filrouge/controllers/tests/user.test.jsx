import request from "supertest";
import app from "../../app";
import { db } from "../../db";
describe("UserController", () => {
    it("should create a user", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                email: "test@test.com",
                password: "password",
                name: "test",
            });
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
                email: "test@test.com",
                name: "test",
                _id: expect.any(String),
                posts: expect.any(Array)
        });
    });
    it("should login a user", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "test@test.com",
                password: "password",
            });
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            err: false,
            data: {
                email: "test@test.com",
                name: "test",
                _id: expect.any(String),
                token: expect.any(String),
                posts: expect.any(Array),
            }
        });
    })


});