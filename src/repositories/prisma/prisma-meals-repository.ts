import { prisma } from "@/lib/prisma";
import { Prisma, Meal } from "@prisma/client";
import { MealsRepository } from "../meals-repository";

export class PrismaMealsRepository implements MealsRepository {
  async create(
    userId: string,
    data: Omit<Prisma.MealCreateInput, "user">
  ): Promise<Meal> {
    const meal = await prisma.meal.create({
      data: {
        name: data.name,
        dateTime: new Date(data.dateTime),
        userId,
        withinDiet: data.withinDiet,
        description: data.description,
      },
    });

    return meal;
  }

  async update(id: string, data: Partial<Meal>): Promise<Meal> {
    const meal = await prisma.meal.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        dateTime: data.dateTime,
        withinDiet: data.withinDiet,
      },
    });

    return meal;
  }

  async delete(id: string): Promise<Meal | null> {
    const meal = await prisma.meal.delete({
      where: {
        id,
      },
    });

    if (!meal) {
      return null;
    }

    return meal;
  }

  async findAllByUserId(userId: string): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({
      where: {
        userId,
      },
      orderBy: {
        dateTime: "desc",
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
