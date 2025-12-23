/* eslint react-hooks/static-components: "off" */
import * as runtime from "react/jsx-runtime";
// The MDX evaluation pattern below creates a component during render which is
// intentional for velite MDX - opt out of React Compiler for this file
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
        "group relative mt-16 scroll-m-32 text-3xl font-bold tracking-tight text-white first:mt-0",
        "before:absolute before:-left-8 before:top-1/2 before:h-1 before:w-4 before:-translate-y-1/2 before:rounded-full before:bg-brand-primary before:opacity-0 before:transition-opacity group-hover:before:opacity-100",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "group relative mt-12 scroll-m-32 text-xl font-semibold tracking-tight text-white/90 hover:text-brand-primary transition-colors",
        "after:ml-2 after:font-sans after:text-[10px] after:text-zinc-600 after:opacity-0 after:content-['[SPEC]'] group-hover:after:opacity-100",
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
        "leading-relaxed text-zinc-400 [&:not(:first-child)]:mt-8 max-w-[85ch] text-lg selection:bg-brand-primary/20",
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
      className={cn(
        "text-zinc-400 my-6 ml-6 list-decimal [&>li]:mt-2",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("text-zinc-400 mt-2", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-8 flex gap-4 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-6 text-zinc-300 shadow-sm",
        "before:h-auto before:w-1 before:rounded-full before:bg-brand-primary",
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
    return (
      <code
        className={cn(
          "relative rounded bg-white/5 border border-white/10 px-[0.4rem] py-[0.1rem] font-sans text-[0.85em] font-medium text-zinc-300",
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
  img: ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <FigureLightbox
      src={(props.src as string) || ""}
      alt={props.alt || ""}
      caption={props.title}
    />
  ),
  FigureLightbox,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 w-full overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <table
        className={cn("w-full border-collapse text-left text-sm", className)}
        {...props}
      />
    </div>
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn("bg-white/5", className)} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "px-4 py-3 font-semibold text-white/90 [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "px-4 py-3 text-zinc-400 [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  )
};

// Pure function to evaluate MDX code (not a hook)
const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
}

export function MDXContent({ code }: MDXProps) {
  // Memoize the component creation to avoid re-evaluation on each render
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="col-span-12">
      <Component components={components} />
    </div>
  );
}
