import { InMemoryMealsRepository } from "@/repositories/inMemory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateMealUseCase } from "./update-meal";

let mealsRepository: InMemoryMealsRepository;
let sut: UpdateMealUseCase;

describe("Update Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    sut = new UpdateMealUseCase(mealsRepository);
  });

  it("should be able to update a meal", async () => {
    const { id, withinDiet } = await mealsRepository.create({
      name: "Breakfast",
      description: "Bread and butter",
      dateTime: new Date("2021-09-22T12:00:00.000Z"),
      withinDiet: false,
      user: {
        connect: {
          id: "user-id",
        },
      },
    });

    const { meal } = await sut.execute({
      id,
      name: "Lunch",
      description: "Rice and beans",
      dateTime: "2021-09-22T12:00:00.000Z",
      withinDiet: !withinDiet,
    });

    expect(meal.name).toEqual("Lunch");
    expect(meal.description).toEqual("Rice and beans");
    expect(meal.dateTime).toEqual(new Date("2021-09-22T12:00:00.000Z"));
    expect(meal.withinDiet).toEqual(true);
  });

  it("should not be able to update a non-existing meal", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-meal-id",
        name: "Lunch",
        description: "Rice and beans",
        dateTime: "2021-09-22T12:00:00.000Z",
        withinDiet: false,
      })
    ).rejects.toHaveProperty("message", "Meal not found");
  });
});
