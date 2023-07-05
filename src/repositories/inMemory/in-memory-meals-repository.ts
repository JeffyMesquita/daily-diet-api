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

  async update(id: string, data: Partial<Meal>) {
    const mealIndex = this.meals.findIndex((meal) => meal.id === id);

    console.log(data);

    const meal = this.meals[mealIndex];

    if (!meal) {
      throw new Error("Meal not found");
    }

    meal.name = data.name || meal.name;
    meal.dateTime = data.dateTime || meal.dateTime;
    meal.withinDiet = data.withinDiet ? data.withinDiet : meal.withinDiet;
    meal.description = data.description || meal.description;

    console.log(meal);

    this.meals[mealIndex] = meal;

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
