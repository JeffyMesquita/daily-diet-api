import { MealsRepository } from "@/repositories/meals-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Meal } from "@prisma/client";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface GetMealsMetricsUseCaseInterface {
  userId: string;
}

interface GetMealsMetricsUseCaseResponse {
  metrics: {
    mealTotal: number;
    mealWithinDiet: number;
    mealWithoutDiet: number;
    mealWithinDietPercentage: string;
    betterSequenceCount: number;
    allMeals: Meal[];
  };
}

export class GetMealsMetricsUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: GetMealsMetricsUseCaseInterface): Promise<GetMealsMetricsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const meals = await this.mealsRepository.findAllByUserId(userId);

    const metrics = meals.reduce(
      (acc, meal) => {
        acc.mealTotal += 1;

        if (meal.withinDiet === false) {
          acc.mealWithoutDiet += 1;
          acc.actualSequenceCount = 0;
        } else {
          acc.mealWithinDiet += 1;
          acc.actualSequenceCount += 1;

          if (acc.actualSequenceCount > acc.betterSequenceCount) {
            acc.betterSequenceCount = acc.actualSequenceCount;
          }
        }

        return acc;
      },
      {
        mealTotal: 0,
        mealWithinDiet: 0,
        mealWithoutDiet: 0,
        betterSequenceCount: 0,
        actualSequenceCount: 0,
      }
    );

    const percentage = (
      (metrics.mealWithinDiet / metrics.mealTotal) *
      100
    ).toFixed(2);

    return {
      metrics: {
        mealTotal: metrics.mealTotal,
        mealWithinDiet: metrics.mealWithinDiet,
        mealWithoutDiet: metrics.mealWithoutDiet,
        mealWithinDietPercentage: percentage,
        betterSequenceCount: metrics.betterSequenceCount,
        allMeals: meals,
      },
    };
  }
}
