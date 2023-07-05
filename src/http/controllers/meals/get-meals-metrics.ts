import { makeGetMealsMetricsUseCase } from "@/use-cases/factories/make-get-meals-metrics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const { sub: userId } = request.user;

  const getMealsMetricsUseCase = makeGetMealsMetricsUseCase();

  const { metrics } = await getMealsMetricsUseCase.execute({
    userId,
  });

  return reply.status(200).send({
    metrics,
  });
}
