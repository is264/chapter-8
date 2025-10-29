type FormGroupProps = {
  children: React.ReactNode;
};

export const FormGroup = (props: FormGroupProps) => {
  return <div className="flex items-center mb-6">{props.children}</div>;
};
