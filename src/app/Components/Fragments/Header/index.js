import React from 'react';
import Link from 'next/link';
export const Header = () => {
  return (
    <nav className="sticky z-30 top-0 shadow-md border-bottom-2 mb-0 lg:mb-6 bg-white">
      <div className="relative flex justify-center max-w-5xl h-16 mx-auto">
        <div className="my-auto font-bold">
          <Link href="/">POKEBOX</Link>
        </div>
      </div>
    </nav>
  );
};
