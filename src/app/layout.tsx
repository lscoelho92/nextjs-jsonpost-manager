import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Next Posts Manager",
  description: "Created by Lscoelho",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header /> 

          <main className="flex-1">{children}</main>

          <footer className="bg-black text-white p-4">
            <div className="container mx-auto text-center text-sm">
              <p className="font-light italic">
                Developed by
                <Link href="https://www.linkedin.com/in/lscoelho/" target="_blank" className="text-white font-bold hover:underline mx-1">
                  Leonardo Soares Coelho
                </Link>
                for AnyDesk testing, is strictly for internal use. 
              </p>
              <p className="font-light italic">
                Unauthorized use or distribution is prohibited. AnyDesk is not liable.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
