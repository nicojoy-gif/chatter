import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import About from "./About";

test("renders about section correctly", () => {
  const { getByText, getByAltText } = render(
    <Router>
      <About />
    </Router>
  );

  // Verify that the "About Chatter" heading is rendered
  const aboutHeading = getByText("About Chatter");
  expect(aboutHeading).toBeInTheDocument();

  // Verify that the paragraph describing Chatter is rendered
  const aboutParagraph = getByText(/Chatter is a multi-functional platform/i);
  expect(aboutParagraph).toBeInTheDocument();

  // Verify that the image related to Chatter workshop is rendered
  const chatterWorkshopImage = getByAltText("chatter-workshop");
  expect(chatterWorkshopImage).toBeInTheDocument();

  // Verify that the "Why you should join chatter" heading is rendered
  const whyJoinHeading = getByText("Why you should join chatter");
  expect(whyJoinHeading).toBeInTheDocument();

  // Verify that the paragraph describing the benefits of joining Chatter is rendered
  const whyJoinParagraph = getByText(/Our goal is to make writers and readers see our platform/i);
  expect(whyJoinParagraph).toBeInTheDocument();

  // Verify that the "Analytics" feature is rendered
  const analyticsFeature = getByText("Analytics");
  expect(analyticsFeature).toBeInTheDocument();

  // Verify that the "Social interactions" feature is rendered
  const socialInteractionsFeature = getByText("Social interactions");
  expect(socialInteractionsFeature).toBeInTheDocument();

  // Verify that the "Content creation" feature is rendered
  const contentCreationFeature = getByText("Content creation");
  expect(contentCreationFeature).toBeInTheDocument();

  // Verify that the testimonial text is rendered
  const testimonialText = getByText(/Chatter has become an integral part of my online experience./i);
  expect(testimonialText).toBeInTheDocument();

  // Verify that the testimonial author name is rendered
  const testimonialAuthor = getByText(/Adebobola Muhydeen/i);
  expect(testimonialAuthor).toBeInTheDocument();

  // Verify that the "Join chatter" button is rendered
  const joinButton = getByText("Join chatter");
  expect(joinButton).toBeInTheDocument();

  // Add more assertions based on the actual content and structure of the About component
});
