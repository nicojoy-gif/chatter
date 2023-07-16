import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CommentBox from "./CommentBox";

describe("CommentBox", () => {
  test("handles input change and submit", () => {
    const onPostCommentMock = jest.fn(); // Mock the onPostComment function

    const { getByText, getByRole } = render(<CommentBox onPostComment={onPostCommentMock} />);

    // Get the textarea element
    const textareaElement = getByRole("textbox");

    // Simulate input change
    fireEvent.change(textareaElement, { target: { value: "Test comment" } });

    // Verify that the input value is updated
    expect(textareaElement).toHaveValue("Test comment");

    // Get the submit button
    const submitButton = getByText("Post Comment");

    // Simulate button click
    fireEvent.click(submitButton);

    // Verify that onPostComment is called
    expect(onPostCommentMock).toHaveBeenCalledTimes(1);

    // Verify that the comment box is cleared
    expect(textareaElement).toHaveValue("");
  });
});
