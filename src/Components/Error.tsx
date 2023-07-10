import React from "react";
interface ErrorTextProps {
  error: string;
}

const ErrorText: React.FunctionComponent<ErrorTextProps> = (props) => {
  const { error } = props;
  if (error === "") return null;
  return <small className="text-red-500 font-bold">{error}</small>;
};

export default ErrorText;
