"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ViewerMode } from "@/lib/viewer-mode";
import { Nav } from "@/components/nav";
import icon from "@/app/icon.png";
import {
  Navbar,
  NavBody,
  MobileNavToggle,
  MobileNavMenu
} from "@/components/ui/resizable-navbar";

interface HeaderResizableProps {
  mode: ViewerMode;
}

export function HeaderResizable({ mode }: HeaderResizableProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar className="fixed top-0 inset-x-0 z-50 h-fit">
      {/* Desktop & Tablet view */}
      <NavBody className="container mx-auto px-4 justify-between items-center bg-black/20 dark:bg-black/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 lg:border-none lg:bg-transparent lg:backdrop-blur-md lg:dark:bg-transparent">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={icon}
              alt="Mathan K A"
              width={37}
              height={37}
              className="rounded-full"
            />
            <h1 className="text-xl font-bold tracking-tight text-black dark:text-white">
              Mathan K A
            </h1>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:block">
          <Nav mode={mode} />
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </NavBody>

      {/* Mobile Menu Content */}
      <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
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

          <Nav mode={mode} />
        </div>
      </MobileNavMenu>
    </Navbar>
  );
}
