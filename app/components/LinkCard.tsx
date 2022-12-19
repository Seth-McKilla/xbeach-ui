import Link from "next/link";

import Card, { type Props as CardProps } from "@/components/Card";

type Props = CardProps & {
  href: string;
};

export default function LinkCard({ href, ...props }: Props) {
  return (
    <Link
      href={href}
      style={{
        display: "contents",
      }}
    >
      <Card {...props} />
    </Link>
  );
}
