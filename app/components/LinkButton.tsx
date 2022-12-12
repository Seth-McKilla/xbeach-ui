import Link from "next/link";

import Button, { type Props as ButtonProps } from "./Button";

type Props = ButtonProps & {
  href: string;
};

export default function LinkButton({
  children,
  href,
  ...rest
}: Props): JSX.Element {
  return (
    <Link href={href}>
      <Button {...rest}>{children}</Button>
    </Link>
  );
}
