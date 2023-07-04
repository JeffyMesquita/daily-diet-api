import { Prisma, Meal } from "@prisma/client";

export interface MealsRepository {
  create(meal: Prisma.MealCreateInput): Promise<Meal>;
  findAllByUserId(userId: string): Promise<Meal[]>;
  findUnique(id: string): Promise<Meal | null>;
}
