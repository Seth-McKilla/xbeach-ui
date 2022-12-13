import Link from "next/link";

import Card, { type Props as CardProps } from "./Card";

type Props = CardProps & {
  href: string;
};

export default function LinkCard({ href, ...props }: Props) {
  return (
    <Link href={href}>
      <Card {...props} />
    </Link>
  );
}
