
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialOpportunities = [
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
  {
    id: "4",
    title: "Healthcare Access Initiative",
    description: "Expanding healthcare access in underserved communities through mobile clinics and telehealth services.",
    amount: "$200,000",
    category: "Health",
    deadline: "Mar 15, 2024",
    status: "new",
  },
  {
    id: "5",
    title: "Arts & Culture Fund",
    description: "Supporting local artists and cultural organizations to enrich community life through the arts.",
    amount: "$35,000",
    category: "Arts",
    deadline: "Apr 10, 2024",
    status: "new",
  },
  {
    id: "6",
    title: "Technology Innovation Grant",
    description: "Funding for startups and organizations developing technology solutions for social good.",
    amount: "$100,000",
    category: "Technology",
    deadline: "May 20, 2024",
    status: "new",
  },
];

export default function Funding() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { toast } = useToast();

  const filteredOpportunities = initialOpportunities.filter(opportunity => {
    const matchesSearch = 
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "" || opportunity.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleView = () => {
    toast({
      title: "Viewing opportunity",
      description: "Detailed view will be available in the next update.",
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
        title="Funding Opportunities" 
        description="Discover grants and funding opportunities matching your interests"
      />
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Input
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Community">Community</SelectItem>
              <SelectItem value="Environment">Environment</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Arts">Arts</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button variant="outline" className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOpportunities.map((opportunity) => (
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
            style={{ animationDelay: `${parseInt(opportunity.id) * 70}ms` }}
          />
        ))}
        {filteredOpportunities.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">No opportunities found. Try different search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
