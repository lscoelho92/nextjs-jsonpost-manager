"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image'

export default function Header() {
  const pathname = usePathname();
  const isPostPage = pathname.startsWith("/posts/");

  return (
    <header className="border-b-2 px-8 py-6">
      <nav className="container mx-auto flex flex-col-reverse justify-between items-center gap-6 sm:flex-row sm:gap-0">
        <ul className="flex space-x-4">
          {!isPostPage ? (
            <li>
              <Link
                href="/posts/new"
                className="px-4 py-2 text-white font-semibold rounded-md bg-primary"
              >
                New Post
              </Link>
            </li>
          ) : (
            <Link href="/" className="text-black py-2 px-4  border-2 border-primary rounded hover:bg-stone-100">
              Return to Homepage
            </Link>
          )
          }
        </ul>
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
          <h1 className="text-black text-2xl font-bold">AnyDesk Posts Manager</h1>
        </div>
      </nav>
    </header>
  );
}
