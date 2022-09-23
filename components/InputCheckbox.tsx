interface Props {
  name: string;
  description: string;
  defaultValue: boolean;
}

export default function InputSwitch({
  name,
  description,
  defaultValue,
}: Props): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-start w-full">
      <div className="flex items-center h-full p-3">
        <input
          id="name"
          name="name"
          type="checkbox"
          className="w-4 h-4 px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          defaultChecked={defaultValue}
        />
      </div>
      <div>
        <label htmlFor="name" className="font-bold text-gray-700 text-md">
          {name}
        </label>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
