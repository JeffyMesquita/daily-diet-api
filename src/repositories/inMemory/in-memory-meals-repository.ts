import { Prisma, Meal } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { MealsRepository } from "../meals-repository";

export class InMemoryMealsRepository implements MealsRepository {
  private meals: Meal[] = [];

  async create(data: Prisma.MealCreateInput) {
    const meal: Meal = {
      id: randomUUID(),
      name: data.name,
      dateTime: new Date(data.dateTime),
      userId: randomUUID(),
      withinDiet: data.withinDiet,
      description: data.description,
    };

    this.meals.push(meal);

    return meal;
  }

  async findAllByUserId(userId: string): Promise<Meal[]> {
    const meals = this.meals.filter((meal) => meal.userId === userId);

    return meals;
  }

  async findUnique(id: string): Promise<Meal | null> {
    const meal = this.meals.find((meal) => meal.id === id);

    return meal || null;
  }
}
