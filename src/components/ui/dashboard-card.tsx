
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DashboardCardProps {
  title: string;
  description: string;
  amount?: string;
  category?: string;
  deadline?: string;
  progress?: number;
  status?: "new" | "pending" | "approved" | "rejected";
  className?: string;
  onView?: () => void;
  onApply?: () => void;
}

export function DashboardCard({
  title,
  description,
  amount,
  category,
  deadline,
  progress,
  status,
  className,
  onView,
  onApply,
}: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1 text-lg font-medium">{title}</CardTitle>
          {status && (
            <Badge 
              variant={
                status === "new" ? "default" : 
                status === "pending" ? "outline" : 
                status === "approved" ? "secondary" : "destructive"
              }
              className="capitalize"
            >
              {status}
            </Badge>
          )}
        </div>
        {category && (
          <Badge variant="outline" className="w-fit">
            {category}
          </Badge>
        )}
        <CardDescription className="line-clamp-2 mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {amount && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Amount:</span>
            <span className="font-medium">{amount}</span>
          </div>
        )}
        {deadline && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Deadline:</span>
            <span className="font-medium">{deadline}</span>
          </div>
        )}
        {progress !== undefined && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Completion:</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={onView}>
          View Details
        </Button>
        {onApply && (
          <Button size="sm" onClick={onApply}>
            Apply Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
