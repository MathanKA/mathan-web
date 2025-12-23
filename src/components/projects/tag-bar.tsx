"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface TagBarProps {
  tags: { slug: string; label: string; count: number }[];
}

export function TagBar({ tags }: TagBarProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  return (
    <div className="flex flex-wrap gap-2 pb-4 overflow-x-auto no-scrollbar mask-gradient-r">
      <Link href="/projects" scroll={false}>
        <Badge
          variant={activeTag === null ? "default" : "outline"}
          className={cn(
            "cursor-pointer px-4 py-2 text-sm transition-all hover:bg-primary/90 hover:text-primary-foreground",
            activeTag === null && "hover:bg-primary"
          )}
        >
          All
        </Badge>
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={
            activeTag === tag.slug ? "/projects" : `/projects?tag=${tag.slug}`
          }
          scroll={false}
        >
          <Badge
            variant={activeTag === tag.slug ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-4 py-2 text-sm transition-all whitespace-nowrap hover:bg-primary/90 hover:text-primary-foreground",
              activeTag === tag.slug && "hover:bg-primary"
            )}
          >
            {tag.label}
            <span className="ml-2 text-[10px] opacity-60 bg-foreground/10 px-1.5 py-0.5 rounded-full">
              {tag.count}
            </span>
          </Badge>
        </Link>
      ))}
    </div>
  );
}
