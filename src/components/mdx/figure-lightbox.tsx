"use client";

import * as React from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FigureLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function FigureLightbox({
  src,
  alt,
  caption,
  className
}: FigureLightboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <figure className={cn("my-8 group relative", className)}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            className="relative overflow-hidden rounded-xl border bg-muted/20 cursor-zoom-in ring-offset-background transition-all hover:ring-2 hover:ring-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            role="button"
            aria-label={`View fullscreen: ${alt}`}
          >
            {/* Interactive Overlay Button */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary" className="shadow-sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Inline Image */}
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain p-4"
                priority={false}
              />
            </div>
          </div>
        </DialogTrigger>

        {/* Fullscreen Content */}
        <DialogContent className="max-w-[95vw] h-[90vh] md:max-w-[90vw] md:h-[90vh] p-0 border-none bg-black/95 text-white overflow-hidden flex flex-col items-center justify-center">
          {/* Accessibility Title (Visually Hidden but present for screen readers) */}
          <DialogTitle className="sr-only">Fullscreen view: {alt}</DialogTitle>

          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Caption / Close bar */}
          {caption && (
            <div className="absolute bottom-4 left-0 right-0 text-center px-4 pointer-events-none">
              <p className="inline-block bg-black/70 px-4 py-2 rounded-full text-sm font-medium text-white/90 backdrop-blur-sm pointer-events-auto">
                {caption}
              </p>
            </div>
          )}

          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 hover:text-white rounded-full h-10 w-10"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
