import { caseStudies } from "@/velite"; // Uses tsconfig alias
import Link from "next/link";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Case Studies | Mathan",
  description: "Deep dive into technical challenges and solutions.",
};

export default function CaseStudiesPage() {
  // Sort case studies by date (newest first)
  // Sort case studies by date (newest first)
  const posts = caseStudies; // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container py-8 md:py-12 max-w-5xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Case Studies
        </h1>
        <p className="text-xl text-muted-foreground w-full md:w-2/3">
          Detailed technical breakdowns of complex problems I&apos;ve solved.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card
            key={post.slug}
            className="flex flex-col h-full hover:border-primary/50 transition-colors"
          >
            <CardHeader className="flex-1">
              <div className="flex justify-between items-start mb-2 gap-4">
                <div className="text-sm text-muted-foreground">
                  {/* {format(parseISO(post.date), "MMMM d, yyyy")} */}
                </div>
                {post.featured && (
                  <Badge variant="default" className="shrink-0">
                    Featured
                  </Badge>
                )}
              </div>

              <CardTitle className="text-xl md:text-2xl leading-tight mb-2">
                <Link href={post.url} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <CardDescription className="text-base line-clamp-3">
                {post.summary_one_liner}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                asChild
                variant="ghost"
                className="p-0 hover:bg-transparent hover:text-primary"
              >
                <Link href={post.url} className="group flex items-center">
                  Read full case study
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
