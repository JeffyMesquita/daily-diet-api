import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";

import { UpdateMealUseCase } from "../update-meal";

export function makeUpdateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository();
  const updateMealUseCase = new UpdateMealUseCase(mealsRepository);

  return updateMealUseCase;
}
