import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "note" | "warning" | "success" | "danger";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const icons = {
  note: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  danger: AlertCircle,
};

const styles = {
  note: "border-blue-500/50 text-blue-600 dark:text-blue-500 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-500 bg-blue-50/50 dark:bg-blue-950/20",
  warning: "border-yellow-500/50 text-yellow-600 dark:text-yellow-500 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20",
  success: "border-green-500/50 text-green-600 dark:text-green-500 [&>svg]:text-green-600 dark:[&>svg]:text-green-500 bg-green-50/50 dark:bg-green-950/20",
  danger: "border-destructive/50 text-destructive dark:text-destructive [&>svg]:text-destructive dark:[&>svg]:text-destructive bg-destructive/10",
};

export function Callout({
  variant = "note",
  title,
  children,
  className,
}: CalloutProps) {
  const Icon = icons[variant];

  return (
    <Alert className={cn("my-6", styles[variant], className)}>
      <Icon className="h-4 w-4" />
      {title && <AlertTitle className="mb-2 font-semibold">{title}</AlertTitle>}
      <AlertDescription className="text-sm opacity-90 leading-relaxed">
        {children}
      </AlertDescription>
    </Alert>
  );
}
