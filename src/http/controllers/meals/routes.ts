import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verifyJwt";
import { createMeal } from "./create-meal";
import { updateMeal } from "./update-meal";

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
}
