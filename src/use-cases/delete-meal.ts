import { MealsRepository } from "@/repositories/meals-repository";
import { Meal } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteMealUseCaseInterface {
  id: string;
}

interface DeleteMealUseCaseResponse {
  message: string;
  meal: Meal;
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
  }: DeleteMealUseCaseInterface): Promise<DeleteMealUseCaseResponse> {
    const mealExists = await this.mealsRepository.findUnique(id);

    if (!mealExists) {
      throw new ResourceNotFoundError();
    }

    const meal = await this.mealsRepository.delete(id);

    return { message: "Meal deleted successfully", meal: meal || mealExists };
  }
}
