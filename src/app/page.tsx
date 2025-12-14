import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LightRays } from "@/components/magicui/light-rays";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ClientIconCloud } from "@/components/magicui/client-icon-cloud";
import { Check, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";

const ICON_SLUGS = [
  "typescript",
  "javascript",
  "react",
  "nextdotjs",
  "nodedotjs",
  "tailwindcss",
  "prisma",
  "postgresql",
  "docker",
  "git",
  "github",
  "visualstudiocode",
  "figma",
];

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* 
        ------------------------------
        HERO SECTION
        ------------------------------
        Two columns:
        - Left: Text content + CTAs
        - Right: Icon Cloud visual
        - Background: Light Rays
      */}
      <section
        aria-labelledby="hero-title"
        className="relative grid min-h-[85vh] grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8 md:pt-0"
      >
        {/* Background Visual (z-index managed inside component) */}
        <LightRays />

        {/* Left Column: Content */}
        <div className="flex flex-col gap-6 z-10 order-2 md:order-1">
          <h1
            id="hero-title"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
          >
            Hi, I&apos;m <AuroraText>Mathan</AuroraText>
          </h1>
          
          <p className="text-xl text-muted-foreground font-medium max-w-lg">
            Building high-performance web applications that scale. 
            Focused on quality, speed, and user experience.
          </p>

          <ul className="flex flex-col gap-2 text-base text-muted-foreground/80">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Reduced load times by 40% in previous roles</span>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>Enterprise-grade security & privacy</span>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-purple-500" />
              <span>End-to-end delivery from design to deploy</span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-4 pt-4">
             <Link href="/resume"> 
               <ShimmerButton className="shadow-2xl">
                 <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base">
                   View Resume
                 </span>
               </ShimmerButton>
             </Link>
             
             <Button variant="outline" size="lg" asChild>
                <Link href="#case-studies">View Case Studies</Link>
             </Button>
          </div>
        </div>

        {/* Right Column: Visual */}
        <div className="flex justify-center items-center z-10 order-1 md:order-2 min-h-[300px]" role="img" aria-label="Technology icon cloud">
            <ClientIconCloud iconSlugs={ICON_SLUGS} />
        </div>
      </section>

      <Separator />

      {/* 
        ------------------------------
        FEATURED CASE STUDY
        ------------------------------
      */}
      <section id="case-studies" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">Featured Case Study</h2>
        <Card className="overflow-hidden border-2 border-primary/10">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">FinTech Corp • Senior Engineer • 2023-2024</p>
                        <CardTitle className="text-2xl md:text-3xl">Real-time Trading Dashboard</CardTitle>
                    </div>
                    {/* Placeholder for optional image or icon if needed */}
                </div>
                <CardDescription className="text-base mt-2">
                    Migrated a legacy monolith to a micro-frontend architecture, enabling 10ms data updates.
                </CardDescription>
                
                <div className="flex gap-2 mt-4">
                    <Badge variant="secondary">Performance</Badge>
                    <Badge variant="secondary">Micro-frontend</Badge>
                    <Badge variant="secondary">WebSockets</Badge>
                </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2 col-span-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">The Challenge</h3>
                    <p>Users experienced 500ms+ latency on price updates, causing missed trading opportunities during high volume periods.</p>
                </div>
                <div className="space-y-4 col-span-2 md:col-span-3 grid md:grid-cols-2 gap-4">
                     <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                             <Zap className="h-4 w-4 text-yellow-500"/> Impact
                        </h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                             <li>Reduced latency to under 50ms (p99)</li>
                             <li>Increased concurrent user capacity by 300%</li>
                        </ul>
                     </div>
                     <div className="p-4 bg-muted/50 rounded-lg">
                         <h4 className="font-semibold flex items-center gap-2 mb-2">
                             <Shield className="h-4 w-4 text-blue-500"/> Solution
                         </h4>
                         <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                             <li>Implemented WebSocket consolidation layer</li>
                             <li>Optimized React re-renders with signals</li>
                         </ul>
                     </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-4 bg-muted/20 p-6">
                <Button asChild>
                    {/* TODO: Link to actual case study route when implemented */}
                    <Link href="#case-studies">Read Case Study <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
                <Button variant="ghost" asChild>
                    {/* TODO: Link to code/architecture doc */}
                    <Link href="https://github.com/MathanKA" target="_blank">See Architecture</Link>
                </Button>
            </CardFooter>
        </Card>
      </section>

      {/* 
        ------------------------------
        SKILLS SNAPSHOT
        ------------------------------
      */}
      <section>
          <h2 className="text-2xl font-bold mb-6">Skills Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <Card>
                  <CardHeader>
                      <CardTitle className="text-lg">Frontend Systems</CardTitle>
                      <CardDescription>Scalable UI Architectures</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• React / Next.js Deep Dive</li>
                          <li>• Design Systems (Tailwind/Shadcn)</li>
                          <li>• State Management & Performance</li>
                      </ul>
                  </CardContent>
                  <CardFooter>
                      <Link href="#case-studies" className="text-sm font-medium text-primary hover:underline">
                          View Proof →
                      </Link>
                  </CardFooter>
              </Card>

              {/* Pillar 2 */}
              <Card>
                  <CardHeader>
                      <CardTitle className="text-lg">Full-stack Delivery</CardTitle>
                      <CardDescription>API & Database Design</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Node.js / Serverless</li>
                          <li>• PostgreSQL / Prisma</li>
                          <li>• CI/CD Pipelines (GitHub Actions)</li>
                      </ul>
                  </CardContent>
                  <CardFooter>
                       <Link href="#case-studies" className="text-sm font-medium text-primary hover:underline">
                          View Proof →
                      </Link>
                  </CardFooter>
              </Card>

              {/* Pillar 3 */}
              <Card>
                  <CardHeader>
                      <CardTitle className="text-lg">Engineering Leadership</CardTitle>
                      <CardDescription>Process & Quality</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Code Review Standards</li>
                          <li>• Technical Mentorship</li>
                          <li>• Agile / Scrum Methodologies</li>
                      </ul>
                  </CardContent>
                  <CardFooter>
                       <Link href="#case-studies" className="text-sm font-medium text-primary hover:underline">
                          View Proof →
                      </Link>
                  </CardFooter>
              </Card>
          </div>
      </section>
    </div>
  );
}
