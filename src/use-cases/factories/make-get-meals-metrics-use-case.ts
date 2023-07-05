import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { GetMealsMetricsUseCase } from "../get-meals-metrics";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeGetMealsMetricsUseCase() {
  const mealsRepository = new PrismaMealsRepository();
  const usersRepository = new PrismaUsersRepository();
  const getMealsMetricsUseCase = new GetMealsMetricsUseCase(
    mealsRepository,
    usersRepository
  );

  return getMealsMetricsUseCase;
}
