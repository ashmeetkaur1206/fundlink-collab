
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const fundingOpportunities = [
  {
    id: "1",
    title: "Community Development Grant",
    description: "Supporting initiatives that strengthen local communities and improve quality of life for residents.",
    amount: "$75,000",
    category: "Community",
    deadline: "Dec 15, 2023",
    status: "new",
  },
  {
    id: "2",
    title: "Environmental Innovation Fund",
    description: "Funding for projects addressing climate change through innovative solutions and technologies.",
    amount: "$120,000",
    category: "Environment",
    deadline: "Jan 30, 2024",
    status: "new",
  },
  {
    id: "3",
    title: "Youth Education Program",
    description: "Supporting educational initiatives targeting underprivileged youth in urban areas.",
    amount: "$50,000",
    category: "Education",
    deadline: "Feb 28, 2024",
    status: "new",
  },
];

const activeProposals = [
  {
    id: "1",
    title: "Urban Garden Initiative",
    description: "Creating sustainable community gardens in urban food deserts to improve access to fresh produce.",
    category: "Environment",
    progress: 75,
    status: "pending",
  },
  {
    id: "2",
    title: "Digital Literacy for Seniors",
    description: "Teaching essential digital skills to seniors to bridge the technological divide and improve quality of life.",
    category: "Education",
    progress: 90,
    status: "approved",
  },
  {
    id: "3",
    title: "Youth Mentorship Program",
    description: "Connecting at-risk youth with professional mentors to provide guidance and career development.",
    category: "Community",
    progress: 40,
    status: "pending",
  },
];

export default function Dashboard() {
  const { toast } = useToast();

  const handleView = () => {
    toast({
      title: "Viewing details",
      description: "This feature will be available in the next update.",
    });
  };

  const handleApply = () => {
    toast({
      title: "Application started",
      description: "Your application has been started. You can continue later.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader 
        title="Dashboard" 
        description="Welcome back! Here's an overview of your activity."
      />
      <DashboardStats />
      <Tabs defaultValue="opportunities" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="opportunities">Funding Opportunities</TabsTrigger>
          <TabsTrigger value="proposals">My Proposals</TabsTrigger>
        </TabsList>
        <TabsContent value="opportunities" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recommended Opportunities</h2>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fundingOpportunities.map((opportunity) => (
              <DashboardCard
                key={opportunity.id}
                title={opportunity.title}
                description={opportunity.description}
                amount={opportunity.amount}
                category={opportunity.category}
                deadline={opportunity.deadline}
                status={opportunity.status as any}
                onView={handleView}
                onApply={handleApply}
                className="animate-slide-in-bottom"
                style={{ animationDelay: `${parseInt(opportunity.id) * 100}ms` }}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="proposals" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Active Proposals</h2>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeProposals.map((proposal) => (
              <DashboardCard
                key={proposal.id}
                title={proposal.title}
                description={proposal.description}
                category={proposal.category}
                progress={proposal.progress}
                status={proposal.status as any}
                onView={handleView}
                className="animate-slide-in-bottom"
                style={{ animationDelay: `${parseInt(proposal.id) * 100}ms` }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
