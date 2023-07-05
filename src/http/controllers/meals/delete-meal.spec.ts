import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Create Meal (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a meal", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const userResponse = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Breakfast",
        description: "Bread and butter",
        dateTime: "2021-09-22T12:00:00.000Z",
        withinDiet: true,
      });

    const deleteMealResponse = await request(app.server)
      .delete(`/meals/${userResponse.body.meal.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(deleteMealResponse.statusCode).toEqual(200);
  });
});
