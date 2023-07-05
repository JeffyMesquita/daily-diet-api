import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verifyJwt";
import { createMeal } from "./create-meal";
import { updateMeal } from "./update-meal";
import { deleteMeal } from "./delete-meal";
import { getMeals } from "./get-meals";
import { fetchMeal } from "./fetch-meal";

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    "/meals",
    {
      onRequest: [verifyJWT],
    },
    createMeal
  );

  app.put(
    "/meals/:id",
    {
      onRequest: [verifyJWT],
    },
    updateMeal
  );

  app.delete(
    "/meals/:id",
    {
      onRequest: [verifyJWT],
    },
    deleteMeal
  );

  app.get(
    "/meals",
    {
      onRequest: [verifyJWT],
    },
    getMeals
  );

  app.get(
    "/meals/:id",
    {
      onRequest: [verifyJWT],
    },
    fetchMeal
  );
}
