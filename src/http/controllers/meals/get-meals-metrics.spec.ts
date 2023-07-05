import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Get Meals Metrics (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get all meals metrics", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await Promise.all(
      ["1", "2", "3", "4"].map(async (id) => {
        const createMealResponse = await request(app.server)
          .post("/meals")
          .set("Authorization", `Bearer ${token}`)
          .send({
            name: `Breakfast ${id}`,
            description: "Bread and butter",
            dateTime: "2021-09-22T12:00:00.000Z",
            withinDiet: true,
          });
        return createMealResponse;
      })
    );

    const getMealsMetricsResponse = await request(app.server)
      .get("/meals/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(getMealsMetricsResponse.statusCode).toEqual(200);
    expect(getMealsMetricsResponse.body.metrics.allMeals).toHaveLength(4);
    expect(getMealsMetricsResponse.body.metrics.mealTotal).toEqual(4);
  });
});
