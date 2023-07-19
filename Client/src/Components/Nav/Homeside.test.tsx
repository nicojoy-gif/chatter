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

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();

    const feedMenuItem = screen.getByText("Feed");
    const bookmarksMenuItem = screen.getByText("Bookmarks");
    const teamBlogsMenuItem = screen.getByText("Team blogs");

    expect(feedMenuItem).toBeInTheDocument();
    expect(bookmarksMenuItem).toBeInTheDocument();
    expect(teamBlogsMenuItem).toBeInTheDocument();
  });
});
