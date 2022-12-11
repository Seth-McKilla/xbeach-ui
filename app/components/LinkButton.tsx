import Link from "next/link";

import Button, { type Props as ButtonProps } from "./Button";

type Props = ButtonProps & {
  href: string;
};

export default function LinkButton({ children, href }: Props): JSX.Element {
  return (
    <Link href={href}>
      <Button>{children}</Button>
    </Link>
  );
}
