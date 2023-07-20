import { useEffect } from "react";

interface ErrorProps {
  error: string;
}

const ErrorText: React.FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    // Code with side effects can be placed here.
    // For example, you might want to log the error or perform any other action.
    // If there are no side effects, you can leave this block empty.
    return () => {
      // Code to clean up any resources or subscriptions can be placed here.
      // If there's no cleanup needed, you can leave this block empty.
    };
  }, [error]);

  return error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null;
};

export default ErrorText;
