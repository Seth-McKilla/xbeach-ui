import Link from "next/link";

import { signIn } from "next-auth/react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-blue-800">
      <div className="flex items-center">
        <Link href="/">
          <p className="text-2xl font-bold text-blue-800 cursor-pointer">
            XBeach UI
          </p>
        </Link>
      </div>

      <div className="flex ems-center">
        <button
          className="px-4 py-2 font-semibold text-white bg-blue-800 rounded-md hover:bg-blue-800"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </header>
  );
}
