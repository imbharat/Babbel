import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import EMailGuesser from "../../src/components/email-guesser/EMailGuesser";

const axiosMock = new AxiosMockAdapter(axios);

describe("EMailGuesser", () => {
  test("validates input fields correctly", () => {
    render(<EMailGuesser />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Company Domain"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Guess Email (Fast)"));

    expect(
      screen.getByText(/First name and last name cannot be empty./i)
    ).toBeInTheDocument();
  });

  test("displays error when fields are invalid", () => {
    render(<EMailGuesser />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Company Domain"), {
      target: { value: "invalid_domain" },
    });

    fireEvent.click(screen.getByText("Guess Email (Fast)"));

    expect(
      screen.getByText(
        /Domain should contain one and only one dot and only alphanumeric characters./i
      )
    ).toBeInTheDocument();
  });

  test("displays note correctly", () => {
    render(<EMailGuesser />);

    expect(screen.getByText(/Suggestion is to use the/)).toBeInTheDocument();
  });
});
