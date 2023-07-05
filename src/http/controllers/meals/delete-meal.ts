import { makeDeleteMealUseCase } from "@/use-cases/factories/make-delete-meal-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const deleteMealParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = deleteMealParamsSchema.parse(request.params);

  const deleteMealUseCase = makeDeleteMealUseCase();

  const { meal, message } = await deleteMealUseCase.execute({
    id,
  });

  return reply.status(200).send({
    message,
    meal,
  });
}
