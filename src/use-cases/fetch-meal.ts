import { MealsRepository } from "@/repositories/meals-repository";
import { Meal } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchMealUseCaseInterface {
  id: string;
}

interface FetchMealUseCaseResponse {
  meal: Meal;
}

export class FetchMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
  }: FetchMealUseCaseInterface): Promise<FetchMealUseCaseResponse> {
    const meal = await this.mealsRepository.findUnique(id);

    if (!meal) {
      throw new ResourceNotFoundError();
    }

    return { meal };
  }
}
