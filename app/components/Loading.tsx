type Props = {
  w: string;
  h?: string;
};

export default function Loading({ w, h = "full" }: Props) {
  return (
    <div className={`w-${w} h-${h}`}>
      <div className="w-full h-full bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
}
