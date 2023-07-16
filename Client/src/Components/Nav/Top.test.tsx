import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Topbar from "./Topbar";

jest.mock("axios");

describe("Topbar", () => {
  beforeEach(() => {
    jest.spyOn(axios, "get").mockClear();
  });

  test("displays search results when searching for a tag", async () => {
    // Mock the response from the API request
    const mockResponse = {
      data: [
        { _id: "1", title: "Post 1" },
        { _id: "2", title: "Post 2" },
        { _id: "3", title: "Post 3" },
      ],
    };

    jest.spyOn(axios, "get").mockResolvedValueOnce(mockResponse);

    render(
      <Router>
        <Topbar onToggleSidebar={() => {}} />
      </Router>
    );

    // Enter search tag in the input field
    const searchInput = screen.getByPlaceholderText("Search chatter");
    userEvent.type(searchInput, "Programming");

    // Wait for the input value to be updated
    await waitFor(() => {
      expect(searchInput).toHaveValue("Programming");
    });

    // Wait for API request to resolve
    await screen.findByText("Post 1");

    // Assert that the search results are displayed
    const searchResults = screen.getAllByRole("listitem");
    expect(searchResults).toHaveLength(3);
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.getByText("Post 3")).toBeInTheDocument();

    // Assert that the API request was made with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5000/api/posts/search?tag=Programming"
    );
  });
});
