import { makeUpdateMealUseCase } from "@/use-cases/factories/make-update-meal-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const updateMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    dateTime: z.string(),
    withinDiet: z.boolean(),
  });

  const { name, description, dateTime, withinDiet } =
    updateMealBodySchema.parse(request.body);

  const { id } = updateMealParamsSchema.parse(request.params);

  const updateMealUseCase = makeUpdateMealUseCase();

  const { meal } = await updateMealUseCase.execute({
    id,
    name,
    description,
    dateTime,
    withinDiet,
  });

  return reply.status(200).send({
    meal,
  });
}
