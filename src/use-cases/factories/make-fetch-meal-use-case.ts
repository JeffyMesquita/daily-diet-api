import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { FetchMealUseCase } from "../fetch-meal";

export function makeFetchMealUseCase() {
  const mealsRepository = new PrismaMealsRepository();
  const fetchMealUseCase = new FetchMealUseCase(mealsRepository);

  return fetchMealUseCase;
}
