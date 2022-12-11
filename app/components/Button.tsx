export type Props = {
  children: React.ReactNode | string;
};

export default function Button({ children }: Props) {
  return (
    <button className="inline-block px-4 py-2 text-lg font-medium text-center text-white bg-blue-800 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {children}
    </button>
  );
}
