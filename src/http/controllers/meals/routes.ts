import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verifyJwt";
import { createMeal } from "./create-meal";

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    "/meals",
    {
      onRequest: [verifyJWT],
    },
    createMeal
  );
}
