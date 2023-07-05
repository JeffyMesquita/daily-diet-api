import { makeFetchMealUseCase } from "@/use-cases/factories/make-fetch-meal-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchMeal(request: FastifyRequest, reply: FastifyReply) {
  const fetchMealParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = fetchMealParamsSchema.parse(request.params);

  const fetchMealUseCase = makeFetchMealUseCase();

  const { meal } = await fetchMealUseCase.execute({
    id,
  });

  return reply.status(200).send({
    meal,
  });
}
