import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { GetMealsUseCase } from "../get-meals";

export function makeGetMealsUseCase() {
  const mealsRepository = new PrismaMealsRepository();
  const usersRepository = new PrismaUsersRepository();
  const getMealsUseCase = new GetMealsUseCase(mealsRepository, usersRepository);

  return getMealsUseCase;
}
