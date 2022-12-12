import "./globals.css";
import { Inter } from "@next/font/google";

import AuthContext from "./AuthContext";
import Header from "./Header";

const inter = Inter();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <AuthContext>
          <Header />
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {children}
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
