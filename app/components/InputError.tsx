type Props = {
  error: string;
};

export default function InputError({ error }: Props) {
  return error ? (
    <span className="flex justify-start mt-1 text-xs text-red-500">
      {error}
    </span>
  ) : null;
}
