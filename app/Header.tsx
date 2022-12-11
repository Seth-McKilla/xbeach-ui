"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import LinkButton from "./components/LinkButton";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white border-b-4 border-blue-800">
      <div className="flex items-center">
        <Link href="/">
          <p className="text-2xl font-bold text-blue-800 cursor-pointer">
            XBeach UI
          </p>
        </Link>
      </div>

      <div className="flex ems-center">
        {session ? (
          <div className="flex items-center">
            <p className="mr-2">{session.user.email}</p>
            <button
              className="px-4 py-2 font-semibold text-white bg-blue-800 rounded-md hover:bg-blue-900"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <LinkButton href="/signin">Sign In</LinkButton>
        )}
      </div>
    </header>
  );
}
