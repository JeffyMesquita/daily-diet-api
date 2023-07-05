import { MealsRepository } from "@/repositories/meals-repository";
import { Meal } from "@prisma/client";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";

interface GetMealsUseCaseInterface {
  userId: string;
}

interface GetMealsUseCaseResponse {
  meals: Meal[];
}

export class GetMealsUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: GetMealsUseCaseInterface): Promise<GetMealsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const meals = await this.mealsRepository.findAllByUserId(userId);

    return { meals };
  }
}
