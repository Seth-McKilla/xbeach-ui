import "./globals.css";

import AuthContext from "./AuthContext";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthContext>
          <Header />
          <div className="px-2 pt-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {children}
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
