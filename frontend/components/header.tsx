"use client";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScrolled = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScrolled, { passive: true });
  }, [scrolled]);

  return (
    <div
      className={`header fixed top-0 w-full flex justify-between items-center shadow-md z-10 transition-all p-5 duration-300 bg-white ${
        scrolled ? "h-10" : "h-20"
      }`}
    >
      <div className="header__logo">
        <Image src="/vercel.svg" alt="logo" width={100} height={24} />
      </div>
      <div className="text-center text-black px-4 py-4 rounded">
        <BellIcon className="h-5 w-5 m-auto" />
      </div>
    </div>
  );
}
