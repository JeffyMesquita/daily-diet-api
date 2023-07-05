import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verifyJwt";
import { createMeal } from "./create-meal";
import { updateMeal } from "./update-meal";
import { deleteMeal } from "./delete-meal";
import { getMeals } from "./get-meals";

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
}
