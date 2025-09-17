"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bottom-0 w-full  bg-white">
      <div className="mx-auto container flex flex-col md:flex-row items-center justify-between p-2 space-y-1 md:space-y-0">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025{" "}
          <span className="text-theme-base">
            Codagam Software Labs Private Limited
          </span>
          . All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/terms">
            Terms & Privacy
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="https://codagam.com"
            target="_blank">
            powered by <span className="text-theme-base">Codagam</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
