"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ActionPill } from "@/components/header/action-pill";
import icon from "@public/images/mathan.svg";
import {
  Navbar,
  NavBody,
  MobileNavToggle,
  MobileNavMenu
} from "@/components/ui/resizable-navbar";

export function HeaderResizable() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Resume", href: "/resume" },
    { label: "Uses", href: "/uses" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <Navbar className="fixed top-0 inset-x-0 z-50 h-fit">
      {/* Desktop & Tablet view */}
      <NavBody className="container mx-auto px-4 justify-between items-center bg-black/20 dark:bg-black/50 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-md lg:dark:bg-transparent">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={icon}
              alt="Mathan K A"
              width={37}
              height={37}
              className="rounded-full"
            />
            <p>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 drop-shadow-2xl text-xl font-bold tracking-tight">
                Mathan K A
              </span>
            </p>
          </Link>
        </div>

        {/* Center Nav (Desktop) */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-black dark:text-white"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Side Actions (Desktop) */}
        <div className="hidden lg:block">
          <ActionPill />
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <div className="scale-75 origin-right">
            {/* Optional: Show Action Pill on mobile ? 
                It's a bit wide. Let's hide it in the main bar and put it in the menu if needed.
                But for now, let's keep the toggle simple. 
             */}
          </div>
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </NavBody>

      {/* Mobile Menu Content */}
      <MobileNavMenu isOpen={isOpen}>
        <div className="flex flex-col gap-6 p-4">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={icon}
              alt="Mathan K A"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="font-bold text-lg">Mathan K A</span>
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg transition-colors duration-200 ${
                    isActive
                      ? "text-black dark:text-white font-medium"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-center">
            <ActionPill />
          </div>
        </div>
      </MobileNavMenu>
    </Navbar>
  );
}
