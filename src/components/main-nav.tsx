
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >
      <Link
        to="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        to="/proposals"
        className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <span>Proposals</span>
        <Badge variant="outline" className="ml-2 h-5 px-1.5">12</Badge>
      </Link>
      <Link
        to="/funding"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Funding
      </Link>
      <Link
        to="/messages"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Messages
      </Link>
    </nav>
  );
}
