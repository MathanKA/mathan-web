"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionPill } from "@/components/header/action-pill";
import { NavLinks } from "@/components/header/nav-links";
import icon from "@public/images/mathan.svg";
import {
  Navbar,
  NavBody,
  MobileNavToggle,
  MobileNavMenu
} from "@/components/ui/resizable-navbar";

export function HeaderResizable() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <Navbar className="fixed top-0 inset-x-0 z-50 h-fit">
      {/* Desktop & Tablet view */}
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
          <NavLinks />
        </nav>

        {/* Right Side Actions (Desktop) */}
        <div className="hidden lg:block">
          <ActionPill />
        </div>
      </NavBody>

      {/* Mobile Header Bar (Visible on Mobile) */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2 mt-4 mx-4  backdrop-blur-md rounded-full border border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={icon}
            alt="Mathan K A"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-bold text-lg text-white">Mathan K A</span>
        </Link>
        <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Mobile Menu Content */}
      <MobileNavMenu isOpen={isOpen}>
        <div className="flex flex-col gap-6 p-4 w-full">
          <nav className="flex flex-col gap-4">
            <NavLinks
              className="flex-col items-center gap-6 text-center"
              linkClassName="text-xl"
              onNavClick={() => setIsOpen(false)}
            />
          </nav>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-center">
            <ActionPill onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </MobileNavMenu>
    </Navbar>
  );
}
