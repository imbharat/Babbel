// createMap.spec.ts
import { describe, it, expect, beforeEach } from "@jest/globals";
import { createMap } from "../../src/utils/email-format-mapper";
import { EmailFormat } from "../../src/enums/EmailFormat";
import EmailDirectory from "../../src/types/EmailDirectory";

describe("createMap", () => {
  it("should correctly map email formats based on existing users", () => {
    const existingUsers: EmailDirectory = {
      "John Doe": "johndoe@example.com",
      "Jane Smith": "janesmith@example.com",
    };

    const result = createMap(existingUsers);

    expect(result).toEqual({
      "example.com": EmailFormat.first_name_last_name,
    });
  });

  it("should handle cases where email format is not matched", () => {
    const existingUsers: EmailDirectory = {
      "John Doe": "johndoe@example.com",
    };

    const result = createMap(existingUsers);

    expect(result).toEqual({
      "example.com": EmailFormat.first_name_last_name,
    });
  });

  it("should handle cases with multiple email formats for the same domain", () => {
    const existingUsers: EmailDirectory = {
      "John Doe": "johndoe@example.com",
      "Jane D": "jd@example.com",
    };

    const result = createMap(existingUsers);

    expect(result).toEqual({
      "example.com": EmailFormat.first_name_last_name,
    });
  });

  it("should handle an empty directory", () => {
    const existingUsers: EmailDirectory = {};

    const result = createMap(existingUsers);

    expect(result).toEqual({});
  });

  it("should not be able to return the correct format when only partial data is available", () => {
    const existingUsers: EmailDirectory = {
      John: "john@example.com",
    };

    const result = createMap(existingUsers);

    expect(result).toEqual({
      "example.com": undefined,
    });
  });
});
