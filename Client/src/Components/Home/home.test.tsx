import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";

test("renders home page correctly", () => {
  const { getByTestId } = render(
    <Router>
      <Home />
    </Router>
  );

  // Verify that the main section is rendered
  const mainSection = getByTestId("main-section");
  expect(mainSection).toBeInTheDocument();

  // Verify that the Nav component is rendered
  const navComponent = getByTestId("nav-component");
  expect(navComponent).toBeInTheDocument();

  // Verify that the About component is rendered
  const aboutComponent = getByTestId("about-component");
  expect(aboutComponent).toBeInTheDocument();

  // Verify that the Footer component is rendered
  const footerComponent = getByTestId("footer-component");
  expect(footerComponent).toBeInTheDocument();

  // Add more assertions based on the actual content and structure of the Home component
});