import { makeGetMealsUseCase } from "@/use-cases/factories/make-get-meals-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getMeals(request: FastifyRequest, reply: FastifyReply) {
  const { sub: userId } = request.user;

  const getMealsUseCase = makeGetMealsUseCase();

  const { meals } = await getMealsUseCase.execute({
    userId,
  });

  return reply.status(200).send({
    meals,
  });
}
