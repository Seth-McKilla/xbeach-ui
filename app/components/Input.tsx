import { forwardRef, type InputHTMLAttributes, type Ref } from "react";

function Input(
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      className="w-full px-3 py-2 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      ref={ref}
      {...props}
    />
  );
}

export default forwardRef(Input);
