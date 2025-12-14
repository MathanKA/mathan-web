import { caseStudies } from "@/velite";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/MDXContent";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, Briefcase, Building2 } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all case studies
export async function generateStaticParams() {
  return caseStudies.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata(props: PageProps) {
    const params = await props.params;
  const post = caseStudies.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${post.title} | Mathan`,
    description: post.summary_one_liner,
  };
}

export default async function CaseStudyPage(props: PageProps) {
    const params = await props.params;
  const post = caseStudies.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-8 md:py-16 max-w-4xl mx-auto">
        {/* Back Link */}
       <div className="mb-8">
         <Button variant="ghost" size="sm" asChild className="-ml-3 text-muted-foreground hover:text-foreground">
             <Link href="/case-studies">
                 <ArrowLeft className="mr-2 h-4 w-4" />
                 Back to Case Studies
             </Link>
         </Button>
       </div>

      {/* Header */}
      <header className="mb-10 space-y-6 border-b pb-10">
        <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-sm">{tag}</Badge>
            ))}
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
             {post.summary_one_liner}
        </p>
        
        <div className="flex flex-wrap gap-6 text-sm md:text-base text-muted-foreground pt-4">
             <div className="flex items-center gap-2">
                 <Briefcase className="h-4 w-4" />
                 <span className="font-semibold text-foreground">{post.role}</span>
             </div>
             <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                 <span>{post.company}</span>
             </div>
             <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                 <time dateTime={post.date}>
                    {format(parseISO(post.date), "MMMM yyyy")}
                 </time>
             </div>
        </div>
      </header>
      
      {/* Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none md:prose-lg lg:prose-xl">
        <MDXContent code={post.code} />
      </div>

       {/* Footer / Stack */}
       <div className="mt-16 pt-8 border-t">
           <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
           <div className="flex flex-wrap gap-2">
               {post.stack.map(tech => (
                   <Badge key={tech} variant="secondary">
                       {tech}
                   </Badge>
               ))}
           </div>
       </div>
    </article>
  );
}
