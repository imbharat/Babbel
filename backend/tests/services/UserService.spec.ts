import "reflect-metadata";
import { container } from "tsyringe";
import { mock, instance, when, verify } from "ts-mockito";
import { describe, it, expect, beforeEach } from "@jest/globals";
import IUserData from "../../src/data/interfaces/IUserData";
import UserService from "../../src/services/UserService";
import EmailDirectory from "../../src/types/EmailDirectory";
import { EmailFormat } from "../../src/enums/EmailFormat";

const mockedUserData = mock<IUserData>();
const userDataInstance = instance(mockedUserData);

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    // Resetting the container and creating a new instance of UserService
    container.clearInstances();
    userService = new UserService(userDataInstance);
  });

  it("should derive email correctly using full name and company domain", async () => {
    const mockEmailDirectory: EmailDirectory = {
      "john doe": "johndoe@example.com",
    };

    when(mockedUserData.get()).thenResolve(mockEmailDirectory);

    const email = await userService.deriveEmail("John Doe", "example.com");

    expect(email).toBe("johndoe@example.com");
    verify(mockedUserData.get()).once();
  });

  it("should derive email correctly using cache and company domain", async () => {
    const mockFormatMap = {
      "example.com": EmailFormat.first_name_last_name,
    };

    when(mockedUserData.getEmailFormatFromCache()).thenResolve(mockFormatMap);

    const email = await userService.deriveEmailFast("John Doe", "example.com");

    expect(email).toBe("johndoe@example.com");
    verify(mockedUserData.getEmailFormatFromCache()).once();
  });

  it("should return null if format is not found", async () => {
    when(mockedUserData.get()).thenResolve({});

    const email = await userService.deriveEmail("John Doe", "example.com");

    expect(email).toBeNull();
  });

  it("should return null if format is not valid", async () => {
    const mockEmailDirectory: EmailDirectory = {
      "john doe": "john.doe@example.com",
    };

    when(mockedUserData.get()).thenResolve(mockEmailDirectory);

    const email = await userService.deriveEmail(
      "John Doe",
      "invalid-domain.com"
    );

    expect(email).toBeNull();
  });

  it("should handle missing format correctly", async () => {
    when(mockedUserData.getEmailFormatFromCache()).thenResolve({});

    const email = await userService.deriveEmailFast("John Doe", "example.com");

    expect(email).toBeNull();
  });
});
