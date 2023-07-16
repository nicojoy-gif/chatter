import React, { useState } from "react";

interface CommentBoxProps {
  onPostComment: any;
}

const CommentBox: React.FunctionComponent<CommentBoxProps> = ({
  onPostComment,
}) => {
  const [comment, setComment] = useState("");

  // Function to handle input changes in the comment box
  const handleInputChange = (event: any) => {
    setComment(event.target.value);
  };

  // Function to handle submitting the comment
  const handleSubmitComment = () => {
    if (comment.trim() !== "") {
      onPostComment(); // Notify the parent component that a comment has been posted
      setComment(""); // Clear the comment box
    }
  };
  return (
    <div>
      <textarea value={comment} onChange={handleInputChange} />
      <button onClick={handleSubmitComment}>Post Comment</button>
    </div>
  );
};

export default CommentBox;
