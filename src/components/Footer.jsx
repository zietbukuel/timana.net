import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full text-center py-8 text-[#888] bg-[#ebebeb] text-xs flex flex-col sm:flex-row justify-between items-center px-12 gap-4">
      <a href="/" className="hover:text-black font-semibold uppercase tracking-wider">Juan A. Timaná</a>
      <span>Copyright &copy; {new Date().getFullYear()} All rights reserved</span>
    </footer>
  );
}
