export type Props = {
  title: string;
  description: string;
};

export default function Card({ title, description }) {
  return (
    <div className="flex flex-col items-stretch max-w-sm col-span-1 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>
      <p className="font-normal text-gray-700">{description}</p>
    </div>
  );
}
