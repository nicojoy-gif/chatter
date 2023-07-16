import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Homesidenav from "./Homesidenav";

describe("Homesidenav", () => {
  test("renders the sidebar with menu items", () => {
    render(
      <Router>
        <Homesidenav isOpen={true} onToggleSidebar={() => {}} />
      </Router>
    );

    // Assert that the sidebar is rendered
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();

    // Assert that the menu items are rendered
    const feedMenuItem = screen.getByText("Feed");
    const bookmarksMenuItem = screen.getByText("Bookmarks");
    const teamBlogsMenuItem = screen.getByText("Team blogs");
    // Add more assertions for other menu items

    expect(feedMenuItem).toBeInTheDocument();
    expect(bookmarksMenuItem).toBeInTheDocument();
    expect(teamBlogsMenuItem).toBeInTheDocument();
    // Assert other menu items

    // You can also assert the sidebar state based on the isOpen prop
    // and test the behavior of toggling the sidebar
  });
});
