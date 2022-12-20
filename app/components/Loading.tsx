import { cn } from "@/lib/styles";

type Props = {
  w: string;
  h?: string;
};

export default function Loading({ w, h = "full" }: Props) {
  return (
    <div
      className={cn(
        "bg-gray-300 rounded animate-pulse",
        w && `w-${w}`,
        h && `h-${h}`
      )}
    />
  );
}
