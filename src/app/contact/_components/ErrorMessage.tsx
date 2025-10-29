type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = (props: ErrorMessageProps) => {
  if (!props.message) return null;
  return <p className="text-red-600 text-sm mt-1">{props.message}</p>;
};
