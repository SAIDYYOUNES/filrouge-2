import request from "supertest";
import app from "../../app";
import { db } from "../../db";

describe("PostController", () => {
    let user;
    let post;

    beforeAll(async () => {
        const res = await request(app).post('/auth/login').send({
            email: "u@u.com",
            password: "password"
        });
        user = res.body.data;
    });

    afterAll((done) => {
        db.close().then(() => done());
    });
    it("should create a post", async () => {
        const response = await request(app)
            .post("/posts")
            .send({
                title: "test",
                content: "test",
                tags: ["test"],
                image: "test",
                user: user._id,
            })
            .set('Authorization', `Bearer ${user.token}`);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            title: expect.any(String),
            content: expect.any(String),
            tags: expect.any(Array),
            image: expect.any(String),
            _id: expect.any(String),
        });
        post = response.body;
    });
    it("should return a list of posts", async () => {
        const response = await request(app).get("/posts");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

  

    it("should return a post", async () => {
        const response = await request(app).get(
            "/posts/"+post._id,
        );
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            content: expect.any(String),
            title: expect.any(String),
            image: expect.any(String),
            likes: expect.any(Array),
            tags: expect.any(Array),
            _id: expect.any(String),

        });
    });

    it("should return 404 if post not found", async () => {
        const response = await request(app).get(
            "/posts/65562c1311e38630d524b4d4",
        );
        expect(response.status).toBe(404);
    });

    it("should return 400 if id is not valid", async () => {
        const response = await request(app).get("/posts/not_found");
        expect(response.status).toBe(400);
    });
    it("should delete a post", async () => {
        const response = await request(app)
            .delete("/posts/"+post._id,)
            .set('Authorization', `Bearer ${user.token}`);
        expect(response.status).toBe(200);

    }
    );
});

