import Link from "next/link";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 py-8 md:py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Column 1: Quick Links */}
          <div className="flex flex-col gap-4 items-center md:items-start order-2 md:order-1">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {/* 
                  TODO: Update these links when actual routes exist.
                  Currently pointing to anchors or placeholders.
                */}
              <Link
                href="/resume"
                className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors w-fit mx-auto md:mx-0"
              >
                Resume
              </Link>
              <Link
                href="/case-studies"
                className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors w-fit mx-auto md:mx-0"
              >
                Case Studies
              </Link>
              <a
                href="mailto:hello@mathan.pro"
                className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors w-fit mx-auto md:mx-0"
              >
                Contact
              </a>
            </nav>
            <div className="mt-2 text-xs text-muted-foreground">
              hello@mathan.pro
            </div>
          </div>

          {/* Column 2: Copyright */}
          <div className="flex flex-col gap-2 justify-center items-center order-3 md:order-2">
            <p className="text-sm text-muted-foreground">
              Built with{" "}
              <span role="img" aria-label="tea">
                🍵
              </span>{" "}
              &{" "}
              <span role="img" aria-label="magic">
                ✨
              </span>{" "}
              by Mathan
            </p>
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Mathan K A. All rights reserved.
            </p>
          </div>

          {/* Column 3: Social Dock */}
          <div className="flex flex-col items-center md:items-end justify-center order-1 md:order-3">
            <Dock
              direction="middle"
              className="border-none bg-transparent shadow-none"
            >
              <DockIcon>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-12 h-12"
                  asChild
                >
                  <a
                    href="https://github.com/MathanKA"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </Button>
              </DockIcon>
              <DockIcon>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-12 h-12"
                  asChild
                >
                  <a
                    href="https://linkedin.com/in/mathanka"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </Button>
              </DockIcon>
              <DockIcon>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-12 h-12"
                  asChild
                >
                  <a href="mailto:hello@mathan.pro" aria-label="Email">
                    <Mail className="w-6 h-6" />
                  </a>
                </Button>
              </DockIcon>
            </Dock>
          </div>
        </div>
      </div>
    </footer>
  );
}
