import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Update Meal (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a meal", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const createMealResponse = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Breakfast",
        description: "Bread and butter",
        dateTime: "2021-09-22T12:00:00.000Z",
        withinDiet: true,
      });

    const updateMealResponse = await request(app.server)
      .put(`/meals/${createMealResponse.body.meal.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Lunch",
        description: "Rice and beans",
        dateTime: "2021-09-22T12:00:00.000Z",
        withinDiet: false,
      });

    expect(updateMealResponse.statusCode).toEqual(200);
  });
});
