export const TextArea = (props: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      className="w-full p-4 border border-[#ccc] rounded-md"
      {...props}
    />
  );
};
