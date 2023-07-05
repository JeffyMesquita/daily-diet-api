import { MealsRepository } from "@/repositories/meals-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Meal } from "@prisma/client";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface CreateMealUseCaseInterface {
  name: string;
  description: string;
  dateTime: string;
  withinDiet: boolean;
  userId: string;
}

interface CreateMealUseCaseResponse {
  meal: Meal;
}

export class CreateMealUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    description,
    dateTime,
    withinDiet,
    userId,
  }: CreateMealUseCaseInterface): Promise<CreateMealUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const meal = await this.mealsRepository.create(user.id, {
      name,
      description,
      dateTime: new Date(dateTime),
      withinDiet,
    });

    return { meal };
  }
}
