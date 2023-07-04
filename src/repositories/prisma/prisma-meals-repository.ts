import { prisma } from "@/lib/prisma";
import { Prisma, Meal } from "@prisma/client";
import { MealsRepository } from "../meals-repository";

export class PrismaMealsRepository implements MealsRepository {
  async create(data: Prisma.MealCreateInput): Promise<Meal> {
    const meal = await prisma.meal.create({
      data,
    });

    return meal;
  }

  async findAllByUserId(userId: string): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({
      where: {
        userId,
      },
    });

    return meals;
  }

  async findUnique(id: string): Promise<Meal | null> {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    });

    return meal;
  }
}