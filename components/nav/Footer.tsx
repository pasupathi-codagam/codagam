"use client";

export function Footer() {
  const handleContactClick = () => {
    const element = document.getElementById("client-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bottom-0 w-full bg-white border-t border-gray-100">
      <div className="mx-auto container flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 space-y-2 sm:space-y-0">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
          © 2025{" "}
          <span className="text-blue-600 font-semibold">
            Codagam Software Labs Private Limited
          </span>
          . All rights reserved.
        </p>
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-6 items-center">
          <button
            onClick={handleContactClick}
            className="text-xs sm:text-sm hover:underline underline-offset-4 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
            Contact Us
          </button>
          <a
            className="text-xs sm:text-sm hover:underline underline-offset-4 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            href="https://codagam.com"
            target="_blank"
            rel="noopener noreferrer">
            powered by{" "}
            <span className="text-blue-600 font-semibold">Codagam</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
