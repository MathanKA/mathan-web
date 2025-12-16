import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ViewerMode } from "@/lib/viewer-mode";
import { MODE_CONFIG } from "@/lib/mode/mode.config";

export function SkillsSnapshot({ mode }: { mode: ViewerMode }) {
  const config = MODE_CONFIG[mode].skills;
  const proofLabel = config.proofLinkLabel;

  return (
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
            <Link
              href="#case-studies"
              className="text-sm font-medium text-primary hover:underline"
            >
              {proofLabel} →
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
            <Link
              href="#case-studies"
              className="text-sm font-medium text-primary hover:underline"
            >
              {proofLabel} →
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
            <Link
              href="#case-studies"
              className="text-sm font-medium text-primary hover:underline"
            >
              {proofLabel} →
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
