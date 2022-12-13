type Props = {
  children: string;
  htmlFor: string;
};

export default function InputLabel({ children, htmlFor }: Props) {
  return (
    <label
      className="flex justify-start text-sm font-medium text-gray-700"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
