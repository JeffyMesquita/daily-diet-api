import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Fetch one Meal (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch one meal", async () => {
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

    const fetchMealResponse = await request(app.server)
      .get(`/meals/${createMealResponse.body.meal.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(fetchMealResponse.statusCode).toEqual(200);
    expect(fetchMealResponse.body.meal.id).toEqual(
      createMealResponse.body.meal.id
    );
    expect(fetchMealResponse.body.meal.name).toEqual(
      createMealResponse.body.meal.name
    );
  });
});
