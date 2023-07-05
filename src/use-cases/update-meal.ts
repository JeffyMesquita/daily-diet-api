import { MealsRepository } from "@/repositories/meals-repository";
import { Meal } from "@prisma/client";

interface UpdateMealUseCaseInterface {
  id: string;
  name: string;
  description: string;
  dateTime: string;
  withinDiet: boolean;
}

interface UpdateMealUseCaseResponse {
  meal: Meal;
}

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
    name,
    description,
    dateTime,
    withinDiet,
  }: UpdateMealUseCaseInterface): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealsRepository.update(id, {
      name,
      description,
      dateTime: new Date(dateTime),
      withinDiet,
    });

    return { meal };
  }
}
