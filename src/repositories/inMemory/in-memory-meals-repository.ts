import { Prisma, Meal } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { MealsRepository } from "../meals-repository";

export class InMemoryMealsRepository implements MealsRepository {
  private meals: Meal[] = [];

  async create(userId: string, meal: Omit<Prisma.MealCreateInput, "user">) {
    const createdMeal: Meal = {
      id: randomUUID(),
      name: meal.name,
      dateTime: new Date(meal.dateTime),
      userId,
      withinDiet: meal.withinDiet,
      description: meal.description,
    };

    this.meals.push(createdMeal);

    return createdMeal;
  }

  async update(id: string, data: Partial<Meal>) {
    const mealIndex = this.meals.findIndex((meal) => meal.id === id);

    const meal = this.meals[mealIndex];

    if (!meal) {
      throw new Error("Meal not found");
    }

    meal.name = data.name || meal.name;
    meal.dateTime = data.dateTime || meal.dateTime;
    meal.withinDiet = data.withinDiet ? data.withinDiet : meal.withinDiet;
    meal.description = data.description || meal.description;

    this.meals[mealIndex] = meal;

    return meal;
  }

  async delete(id: string): Promise<Meal | null> {
    const mealIndex = this.meals.findIndex((meal) => meal.id === id);

    if (mealIndex === -1) {
      throw new Error("Meal not found");
    }

    const meal = this.meals.splice(mealIndex, 1);

    return meal[0] || null;
  }

  async findAllByUserId(userId: string): Promise<Meal[]> {
    const meals = this.meals.filter((meal) => meal.userId === userId);

    if (!meals) {
      return [];
    }

    return meals;
  }

  async findUnique(id: string): Promise<Meal | null> {
    const meal = this.meals.find((meal) => meal.id === id);

    return meal || null;
  }
}
