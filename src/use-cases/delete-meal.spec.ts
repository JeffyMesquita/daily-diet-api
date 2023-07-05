import { InMemoryMealsRepository } from "@/repositories/inMemory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteMealUseCase } from "./delete-meal";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let mealsRepository: InMemoryMealsRepository;
let sut: DeleteMealUseCase;

describe("Delete Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    sut = new DeleteMealUseCase(mealsRepository);
  });
  const userId = "user-id";

  it("should be able to delete a meal", async () => {
    const { id } = await mealsRepository.create(userId, {
      name: "Breakfast",
      description: "Bread and butter",
      dateTime: new Date("2021-09-22T12:00:00.000Z"),
      withinDiet: false,
    });

    const { meal } = await sut.execute({
      id,
    });

    expect(meal.id).toEqual(id);
  });

  it("should not be able to delete a non-existing meal", async () => {
    await mealsRepository.create(userId, {
      name: "Breakfast",
      description: "Bread and butter",
      dateTime: new Date("2021-09-22T12:00:00.000Z"),
      withinDiet: false,
    });

    await expect(() =>
      sut.execute({
        id: "non-existing-meal-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should be able to delete a meal and have a success message", async () => {
    const { id } = await mealsRepository.create(userId, {
      name: "Breakfast",
      description: "Bread and butter",
      dateTime: new Date("2021-09-22T12:00:00.000Z"),
      withinDiet: false,
    });

    const result = await sut.execute({
      id,
    });

    expect(result.message).toEqual("Meal deleted successfully");
    expect(result).toEqual(
      expect.objectContaining({
        message: "Meal deleted successfully",
        meal: expect.objectContaining({
          id,
          withinDiet: false,
        }),
      })
    );
  });
});
