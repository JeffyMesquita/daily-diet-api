import { InMemoryMealsRepository } from "@/repositories/inMemory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetMealsUseCase } from "./get-meals";
import { InMemoryUsersRepository } from "@/repositories/inMemory/in-memory-users-repository";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: GetMealsUseCase;

describe("Get Meals Use Case", () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new GetMealsUseCase(mealsRepository, usersRepository);
  });

  it("should be able to get all meals from a user", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    Array.from({ length: 4 }).forEach(async (_, index) => {
      await mealsRepository.create(user.id, {
        name: `Meal ${index + 1}`,
        description: "Bread and butter",
        dateTime: new Date("2021-09-22T12:00:00.000Z"),
        withinDiet: false,
      });
    });

    const request = await sut.execute({
      userId: user.id,
    });

    expect(request.meals.length).toEqual(4);
    expect(request.meals[0].name).toEqual("Meal 1");
  });

  it("should not be able to get all meals from unregistered user", async () => {
    await expect(() =>
      sut.execute({
        userId: "unregistered-user-id",
      })
    ).rejects.toHaveProperty("message", "User not found");
  });
});
