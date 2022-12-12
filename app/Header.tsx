"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import Button from "./components/Button";
import LinkButton from "./components/LinkButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[80px] flex items-center justify-between px-6 py-4 bg-white border-b-4 border-blue-800">
      <div className="flex items-center">
        <Link href="/">
          <p className="text-2xl font-bold text-blue-800 cursor-pointer">
            XBeach UI
          </p>
        </Link>
      </div>

      <div className="flex ems-center">
        <HeaderButton />
      </div>
    </header>
  );
}

function HeaderButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <div className="flex items-center">
        <p className="mr-2">{session.user.email}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    );
  }

  return <LinkButton href="/signin">Sign In</LinkButton>;
}
