import { Prisma, Meal } from "@prisma/client";

export interface MealsRepository {
  create(
    userId: string,
    meal: Omit<Prisma.MealCreateInput, "user">
  ): Promise<Meal>;
  update(id: string, data: Partial<Meal>): Promise<Meal>;
  delete(id: string): Promise<Meal | null>;
  findAllByUserId(userId: string): Promise<Meal[]>;
  findUnique(id: string): Promise<Meal | null>;
}
