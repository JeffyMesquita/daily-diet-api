import { InMemoryMealsRepository } from "@/repositories/inMemory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetMealsMetricsUseCase } from "./get-meals-metrics";
import { InMemoryUsersRepository } from "@/repositories/inMemory/in-memory-users-repository";
import { UserNotFoundError } from "./errors/user-not-found-error";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: GetMealsMetricsUseCase;

describe("Get Meals Metrics Use Case", () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new GetMealsMetricsUseCase(mealsRepository, usersRepository);
  });

  it("should be able to get all meals metrics from a user", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    Array.from({ length: 4 }).forEach(async (_, index) => {
      await mealsRepository.create(user.id, {
        name: `Meal ${index + 1}`,
        description: "Bread and butter",
        dateTime: new Date(`2021-09-22T12:0${index + 1}:00.000Z`),
        withinDiet: false,
      });
    });

    const request = await sut.execute({
      userId: user.id,
    });

    expect(request.metrics?.allMeals).toHaveLength(4);
    expect(request.metrics?.mealTotal).toEqual(4);
  });

  it("should not be able to get all meals metrics from unregistered user", async () => {
    await expect(() =>
      sut.execute({
        userId: "unregistered-user-id",
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
