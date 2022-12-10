interface Props {
  name: string;
  description: string;
  defaultValue: number;
}

export default function InputNumber({
  name,
  description,
  defaultValue,
}: Props): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <label htmlFor={name} className="font-bold text-gray-700 text-md">
        {name}
      </label>
      <p className="text-xs text-gray-500">{description}</p>
      <div className="flex items-end w-full h-full">
        <input
          id={name}
          name={name}
          type="number"
          className="w-full px-3 py-2 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}
