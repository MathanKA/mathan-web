import * as runtime from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { FigureLightbox } from "@/components/mdx/figure-lightbox";
import Link from "next/link";

// Customized heading components with anchor support styling
const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "group relative mt-12 scroll-m-24 border-l-4 border-primary pl-4 text-2xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "group relative mt-8 scroll-m-24 text-xl font-semibold tracking-tight hover:text-primary transition-colors",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6 max-w-[85ch]",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic text-muted-foreground bg-muted/20 py-2 pr-4 rounded-r-lg",
        className
      )}
      {...props}
    />
  ),
  a: ({
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link
      href={props.href || "#"}
      className={cn(
        "font-medium underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
        className
      )}
      {...props}
    >
      {props.children}
    </Link>
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // If code is inside pre (handled by CodeBlock/Shiki), this won't be hit usually for blocks,
    // but Shiki might output spans.
    // We check if it's inline code by lack of pre parent context or standard styling expectation.
    // Simple heuristic: if it has no class or just language class, style it as inline.
    return (
      <code
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground",
          className
        )}
        {...props}
      />
    );
  },
  pre: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock className={className} {...props}>
      {children}
    </CodeBlock>
  ),
  // Custom Mappings
  Callout,
  Image,
  FigureLightbox,
};

// Hook to evaluate MDX code
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
}

export function MDXContent({ code }: MDXProps) {
  const Component = React.useMemo(() => useMDXComponent(code), [code]);
  return <Component components={components} />;
}
