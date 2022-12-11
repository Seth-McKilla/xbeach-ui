import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode | string;
}

export default function LinkButton({ children, href }: Props): JSX.Element {
  return (
    <Link href={href}>
      <a className="inline-block px-4 py-2 text-lg font-medium text-center text-white bg-blue-800 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        {children}
      </a>
    </Link>
  );
}
