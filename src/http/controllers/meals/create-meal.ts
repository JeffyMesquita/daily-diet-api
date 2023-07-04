import { makeCreateMealUseCase } from "@/use-cases/factories/make-create-meal-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    dateTime: z.string(),
    withinDiet: z.boolean(),
  });

  const { name, description, dateTime, withinDiet } =
    createMealBodySchema.parse(request.body);

  const { sub: userId } = request.user;

  const createMealUseCase = makeCreateMealUseCase();

  const { meal } = await createMealUseCase.execute({
    name,
    description,
    dateTime,
    withinDiet,
    userId,
  });

  return reply.status(201).send({
    meal,
  });
}
