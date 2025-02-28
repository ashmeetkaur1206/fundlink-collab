
import { Award, DollarSign, Clock, CheckCheck } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Opportunities"
        value="24"
        description="From all sources"
        icon={<Award className="h-4 w-4" />}
        trend={{ value: 10, isPositive: true }}
      />
      <StatsCard
        title="Total Funding"
        value="$1.2M"
        description="Across all matched grants"
        icon={<DollarSign className="h-4 w-4" />}
        trend={{ value: 8, isPositive: true }}
      />
      <StatsCard
        title="Pending Applications"
        value="7"
        description="Awaiting response"
        icon={<Clock className="h-4 w-4" />}
      />
      <StatsCard
        title="Success Rate"
        value="68%"
        description="Applications approved"
        icon={<CheckCheck className="h-4 w-4" />}
        trend={{ value: 5, isPositive: true }}
      />
    </div>
  );
}
