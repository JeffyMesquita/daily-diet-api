import { InMemoryMealsRepository } from "@/repositories/inMemory/in-memory-meals-repository";
import { InMemoryUsersRepository } from "@/repositories/inMemory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: CreateMealUseCase;

describe("Create Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateMealUseCase(mealsRepository, usersRepository);
  });

  it("should be able to create a meal", async () => {
    const { id } = await usersRepository.create({
      name: "John Doe",
      email: "email@email.com",
      password: "123456",
    });

    const { meal } = await sut.execute({
      name: "Breakfast",
      description: "Bread and butter",
      dateTime: "2021-09-22T12:00:00.000Z",
      withinDiet: true,
      userId: id,
    });

    expect(meal.id).toEqual(expect.any(String));
  });

  it("should not be able to create a meal with a non-existing user", async () => {
    await expect(() =>
      sut.execute({
        name: "Breakfast",
        description: "Bread and butter",
        dateTime: "2021-09-22T12:00:00.000Z",
        withinDiet: true,
        userId: "non-existing-user-id",
      })
    ).rejects.toHaveProperty("message", "User not found");
  });
});
