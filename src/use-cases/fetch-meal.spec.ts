import { InMemoryMealsRepository } from "@/repositories/inMemory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchMealUseCase } from "./fetch-meal";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let mealsRepository: InMemoryMealsRepository;
let sut: FetchMealUseCase;

describe("Fetch One Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    sut = new FetchMealUseCase(mealsRepository);
  });

  it("should be able to fetch one meal", async () => {
    const userId = "user-id";

    const { id } = await mealsRepository.create(userId, {
      name: "Breakfast",
      description: "Bread and butter",
      dateTime: new Date("2021-09-22T12:00:00.000Z"),
      withinDiet: false,
    });

    const { meal } = await sut.execute({
      id,
    });

    expect(meal.name).toEqual("Breakfast");
    expect(meal.description).toEqual("Bread and butter");
    expect(meal.dateTime).toEqual(new Date("2021-09-22T12:00:00.000Z"));
    expect(meal.withinDiet).toEqual(false);
  });

  it("should not be able to fetch a non-existing meal", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-meal-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
