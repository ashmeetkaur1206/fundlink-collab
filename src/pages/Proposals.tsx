import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Filter, 
  Download, 
  FileText, 
  BarChart3 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProposalForm } from "@/components/proposal-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const initialProposals = [
  {
    id: "1",
    title: "Urban Garden Initiative",
    description: "Creating sustainable community gardens in urban food deserts to improve access to fresh produce.",
    category: "Environment",
    progress: 75,
    status: "pending",
    budget: "$45,000",
    submittedDate: "2023-10-15",
    deadline: "2023-12-20",
    matchScore: 92,
  },
  {
    id: "2",
    title: "Digital Literacy for Seniors",
    description: "Teaching essential digital skills to seniors to bridge the technological divide and improve quality of life.",
    category: "Education",
    progress: 90,
    status: "approved",
    budget: "$28,500",
    submittedDate: "2023-09-22",
    deadline: "2023-11-30",
    matchScore: 85,
  },
  {
    id: "3",
    title: "Youth Mentorship Program",
    description: "Connecting at-risk youth with professional mentors to provide guidance and career development.",
    category: "Community",
    progress: 40,
    status: "pending",
    budget: "$52,000",
    submittedDate: "2023-11-05",
    deadline: "2024-01-15",
    matchScore: 78,
  },
  {
    id: "4",
    title: "Mental Health Awareness Campaign",
    description: "Educating communities about mental health issues and reducing stigma through workshops and events.",
    category: "Health",
    progress: 60,
    status: "approved",
    budget: "$38,750",
    submittedDate: "2023-08-30",
    deadline: "2023-11-15",
    matchScore: 89,
  },
  {
    id: "5",
    title: "Homeless Shelter Expansion",
    description: "Expanding capacity and services at a local homeless shelter to meet growing community needs.",
    category: "Social Services",
    progress: 25,
    status: "pending",
    budget: "$120,000",
    submittedDate: "2023-11-12",
    deadline: "2024-02-28",
    matchScore: 94,
  },
  {
    id: "6",
    title: "Arts Education Initiative",
    description: "Bringing arts education to underserved schools through workshops, artist residencies, and supply donations.",
    category: "Education",
    progress: 15,
    status: "rejected",
    budget: "$32,200",
    submittedDate: "2023-07-18",
    deadline: "2023-10-30",
    matchScore: 72,
  },
];

// Add new data for matched funding opportunities for each proposal
const matchedFundingData = {
  "1": [
    { id: "1", name: "Johnson Foundation", amount: "$45,000", matchScore: 92 },
    { id: "2", name: "GreenTech Initiative", amount: "$32,000", matchScore: 75 }
  ],
  "2": [
    { id: "3", name: "Education Forward Trust", amount: "$28,500", matchScore: 95 }
  ],
  "3": [
    { id: "4", name: "Youth Empowerment Fund", amount: "$52,000", matchScore: 87 },
    { id: "5", name: "Community Action Group", amount: "$18,000", matchScore: 82 }
  ],
  "4": [
    { id: "6", name: "Global Health Consortium", amount: "$38,750", matchScore: 91 }
  ],
  "5": [
    { id: "7", name: "Social Housing Alliance", amount: "$65,000", matchScore: 89 },
    { id: "8", name: "Urban Development Fund", amount: "$120,000", matchScore: 72 }
  ],
  "6": [
    { id: "9", name: "Creative Arts Alliance", amount: "$32,200", matchScore: 83 }
  ]
};

const categories = [
  "All Categories",
  "Environment",
  "Education",
  "Community",
  "Health",
  "Social Services",
  "Arts",
];

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function Proposals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const { toast } = useToast();

  const filteredProposals = initialProposals.filter(proposal => {
    const matchesSearch = 
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All Categories" || 
      proposal.category === selectedCategory;
    
    const matchesStatus = 
      selectedStatus === "all" || 
      proposal.status === selectedStatus;
    
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "pending" && proposal.status === "pending") ||
      (activeTab === "approved" && proposal.status === "approved") ||
      (activeTab === "rejected" && proposal.status === "rejected");
    
    return matchesSearch && matchesCategory && matchesStatus && matchesTab;
  });

  const handleView = (proposal: any) => {
    // Add matched funding data to the selected proposal
    const proposalWithFunding = {
      ...proposal,
      matchedFunding: matchedFundingData[proposal.id] || []
    };
    setSelectedProposal(proposalWithFunding);
  };

  const handleNewProposal = () => {
    setIsDialogOpen(true);
  };

  const handleCreateProposal = (formData: any) => {
    // In a real app, we would save the new proposal here
    console.log("New proposal data:", formData);
    toast({
      title: "Proposal created",
      description: "Your proposal has been successfully created.",
    });
    setIsDialogOpen(false);
  };

  const handleExportProposals = () => {
    toast({
      title: "Exporting proposals",
      description: "Your proposals are being exported to a CSV file.",
    });
  };

  const pendingCount = initialProposals.filter(p => p.status === "pending").length;
  const approvedCount = initialProposals.filter(p => p.status === "approved").length;
  const rejectedCount = initialProposals.filter(p => p.status === "rejected").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader 
        title="My Proposals" 
        description="Manage and track your funding proposals"
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Card 
          className={cn(
            "transition-all shadow-sm cursor-pointer hover:shadow-md",
            activeTab === "all" ? "border-primary/50 bg-primary/5" : "bg-card"
          )}
          onClick={() => setActiveTab("all")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialProposals.length}</div>
            <p className="text-xs text-muted-foreground">
              Total submissions
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className={cn(
            "transition-all shadow-sm cursor-pointer hover:shadow-md",
            activeTab === "pending" ? "border-amber-500/50 bg-amber-500/5" : "bg-card"
          )}
          onClick={() => setActiveTab("pending")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 hover:text-amber-700">{pendingCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((pendingCount / initialProposals.length) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              Awaiting decision
            </p>
          </CardContent>
        </Card>

        <Card 
          className={cn(
            "transition-all shadow-sm cursor-pointer hover:shadow-md",
            activeTab === "approved" ? "border-green-500/50 bg-green-500/5" : "bg-card"
          )}
          onClick={() => setActiveTab("approved")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 hover:text-green-700">{approvedCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((approvedCount / initialProposals.length) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              Success rate
            </p>
          </CardContent>
        </Card>

        <Card 
          className={cn(
            "transition-all shadow-sm cursor-pointer hover:shadow-md",
            activeTab === "rejected" ? "border-red-500/50 bg-red-500/5" : "bg-card"
          )}
          onClick={() => setActiveTab("rejected")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <Badge variant="outline" className="bg-red-500/10 text-red-600 hover:bg-red-500/20 hover:text-red-700">{rejectedCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((rejectedCount / initialProposals.length) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              Rejection rate
            </p>
          </CardContent>
        </Card>
      </div>
      
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
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30" variant="secondary">
                  {selectedStatus !== "all" ? "1" : "0"}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status.value}
                  checked={selectedStatus === status.value}
                  onCheckedChange={() => setSelectedStatus(status.value)}
                >
                  {status.label}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                Reset filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setViewType("grid")}>
                Grid view
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewType("list")}>
                List view
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExportProposals}>
                <Download className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewProposal} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Proposal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>Create New Proposal</DialogTitle>
                <DialogDescription>
                  Fill out the form below to create a new funding proposal.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="flex-1 max-h-[500px] pr-4">
                <ProposalForm onSubmit={handleCreateProposal} />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Separator />
      
      <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
        {selectedProposal && (
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedProposal.title}
                <Badge
                  variant={
                    selectedProposal.status === "pending" ? "outline" : 
                    selectedProposal.status === "approved" ? "secondary" : "destructive"
                  }
                  className="capitalize ml-2"
                >
                  {selectedProposal.status}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                Proposal ID: {selectedProposal.id}
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="flex-1 max-h-[500px] pr-4">
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground">{selectedProposal.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Category</h3>
                    <p className="text-sm text-muted-foreground">{selectedProposal.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Budget</h3>
                    <p className="text-sm text-muted-foreground">{selectedProposal.budget}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Submitted Date</h3>
                    <p className="text-sm text-muted-foreground">{new Date(selectedProposal.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Deadline</h3>
                    <p className="text-sm text-muted-foreground">{new Date(selectedProposal.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Completion</h3>
                    <p className="text-sm font-medium">{selectedProposal.progress}%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${selectedProposal.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <h3 className="text-sm font-medium">AI Match Score</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className={cn(
                          "h-full",
                          selectedProposal.matchScore >= 90 ? "bg-green-500" :
                          selectedProposal.matchScore >= 75 ? "bg-amber-500" : "bg-red-500"
                        )} 
                        style={{ width: `${selectedProposal.matchScore}%` }}
                      />
                    </div>
                    <span className={cn(
                      "text-sm font-medium",
                      selectedProposal.matchScore >= 90 ? "text-green-500" :
                      selectedProposal.matchScore >= 75 ? "text-amber-500" : "text-red-500"
                    )}>
                      {selectedProposal.matchScore}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on alignment with current funding opportunities.
                  </p>
                </div>
                
                {/* New section to show matched funding opportunities */}
                {selectedProposal.matchedFunding && selectedProposal.matchedFunding.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-sm font-medium mb-2">Matched Funding Opportunities</h3>
                    <div className="space-y-2">
                      {selectedProposal.matchedFunding.map((funding: any) => (
                        <div 
                          key={funding.id} 
                          className="flex items-center justify-between rounded-md border p-2.5 hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-sm">{funding.name}</p>
                            <p className="text-xs text-muted-foreground">{funding.amount}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "text-xs px-2 py-0.5 rounded-full font-medium",
                              funding.matchScore >= 90 ? "bg-green-100 text-green-800" :
                              funding.matchScore >= 80 ? "bg-blue-100 text-blue-800" :
                              "bg-amber-100 text-amber-800"
                            )}>
                              {funding.matchScore}% Match
                            </div>
                            <Button size="sm" variant="ghost">View</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <DialogFooter className="flex sm:justify-between">
              <Button variant="outline">Edit Proposal</Button>
              {selectedProposal.status === "pending" && (
                <div className="flex gap-2">
                  <Button variant="outline">View Similar Funding</Button>
                  <Button>Withdraw Proposal</Button>
                </div>
              )}
              {selectedProposal.status === "approved" && (
                <div className="flex gap-2">
                  <Button variant="outline">View Agreement</Button>
                  <Button>Accept Funding</Button>
                </div>
              )}
              {selectedProposal.status === "rejected" && (
                <div className="flex gap-2">
                  <Button variant="outline">View Feedback</Button>
                  <Button>Resubmit</Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      <div className={cn(
        viewType === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-4 grid-cols-1"
      )}>
        {filteredProposals.map((proposal) => (
          <DashboardCard
            key={proposal.id}
            title={proposal.title}
            description={proposal.description}
            category={proposal.category}
            progress={proposal.progress}
            status={proposal.status as any}
            onView={() => handleView(proposal)}
            className="animate-slide-in-bottom group hover:border-primary/20"
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
