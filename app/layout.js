import "./globals.css";

export const metadata = {
  title: "EchoChat",
  description: "Modern Chat UI"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative overflow-hidden">

        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">

          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>

        </div>

        {children}

      </body>
    </html>
  );
}
