
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Filter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialProposals = [
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
  {
    id: "4",
    title: "Mental Health Awareness Campaign",
    description: "Educating communities about mental health issues and reducing stigma through workshops and events.",
    category: "Health",
    progress: 60,
    status: "approved",
  },
  {
    id: "5",
    title: "Homeless Shelter Expansion",
    description: "Expanding capacity and services at a local homeless shelter to meet growing community needs.",
    category: "Social Services",
    progress: 25,
    status: "pending",
  },
  {
    id: "6",
    title: "Arts Education Initiative",
    description: "Bringing arts education to underserved schools through workshops, artist residencies, and supply donations.",
    category: "Education",
    progress: 15,
    status: "rejected",
  },
];

export default function Proposals() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredProposals = initialProposals.filter(proposal => 
    proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = () => {
    toast({
      title: "Viewing proposal",
      description: "Detailed view will be available in the next update.",
    });
  };

  const handleNewProposal = () => {
    toast({
      title: "Create new proposal",
      description: "This feature will be available soon.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader 
        title="My Proposals" 
        description="Manage and track your funding proposals"
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Input
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={handleNewProposal} size="sm" className="flex-1 sm:flex-initial">
            <Plus className="mr-2 h-4 w-4" />
            New Proposal
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProposals.map((proposal) => (
          <DashboardCard
            key={proposal.id}
            title={proposal.title}
            description={proposal.description}
            category={proposal.category}
            progress={proposal.progress}
            status={proposal.status as any}
            onView={handleView}
            className="animate-slide-in-bottom"
            style={{ animationDelay: `${parseInt(proposal.id) * 70}ms` }}
          />
        ))}
        {filteredProposals.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">No proposals found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
