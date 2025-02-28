
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Filter,
  Search,
  Calendar,
  BarChart4,
  DollarSign,
  ArrowUpRight,
  Clock,
  AlertCircle,
  BookmarkPlus,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  Building,
  Building2,
  Users,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const initialOpportunities = [
  {
    id: "1",
    title: "Community Development Grant",
    description: "Supporting initiatives that strengthen local communities and improve quality of life for residents.",
    amount: "$75,000",
    category: "Community",
    deadline: "Dec 15, 2023",
    status: "new",
    funder: "Johnson Foundation",
    matchScore: 95,
    requirementsCount: 7,
    applicants: 42,
    location: "National",
    industry: "Nonprofit",
    applicationProcess: "Two-step application with initial proposal and final review.",
    eligibility: "501(c)(3) organizations with at least 2 years of operation",
    fundingType: "Grant",
    tags: ["community development", "urban", "social impact"]
  },
  {
    id: "2",
    title: "Environmental Innovation Fund",
    description: "Funding for projects addressing climate change through innovative solutions and technologies.",
    amount: "$120,000",
    category: "Environment",
    deadline: "Jan 30, 2024",
    status: "new",
    funder: "GreenTech Initiative",
    matchScore: 88,
    requirementsCount: 9,
    applicants: 67,
    location: "Global",
    industry: "Environmental",
    applicationProcess: "Single-phase application with detailed project plan required.",
    eligibility: "Organizations focused on environmental sustainability",
    fundingType: "Investment",
    tags: ["climate", "technology", "sustainability"]
  },
  {
    id: "3",
    title: "Youth Education Program",
    description: "Supporting educational initiatives targeting underprivileged youth in urban areas.",
    amount: "$50,000",
    category: "Education",
    deadline: "Feb 28, 2024",
    status: "new",
    funder: "Education Forward Trust",
    matchScore: 92,
    requirementsCount: 5,
    applicants: 35,
    location: "Regional",
    industry: "Education",
    applicationProcess: "Rolling applications with quarterly reviews.",
    eligibility: "Schools and educational nonprofits",
    fundingType: "Grant",
    tags: ["education", "youth", "urban"]
  },
  {
    id: "4",
    title: "Healthcare Access Initiative",
    description: "Expanding healthcare access in underserved communities through mobile clinics and telehealth services.",
    amount: "$200,000",
    category: "Health",
    deadline: "Mar 15, 2024",
    status: "new",
    funder: "Global Health Consortium",
    matchScore: 79,
    requirementsCount: 12,
    applicants: 28,
    location: "International",
    industry: "Healthcare",
    applicationProcess: "Three-stage application with detailed impact assessment.",
    eligibility: "Healthcare providers and nonprofits",
    fundingType: "Grant",
    tags: ["healthcare", "telemedicine", "rural"]
  },
  {
    id: "5",
    title: "Arts & Culture Fund",
    description: "Supporting local artists and cultural organizations to enrich community life through the arts.",
    amount: "$35,000",
    category: "Arts",
    deadline: "Apr 10, 2024",
    status: "new",
    funder: "Creative Arts Alliance",
    matchScore: 84,
    requirementsCount: 4,
    applicants: 56,
    location: "Local",
    industry: "Arts",
    applicationProcess: "Portfolio submission with project proposal.",
    eligibility: "Artists and cultural organizations",
    fundingType: "Fellowship",
    tags: ["arts", "culture", "community"]
  },
  {
    id: "6",
    title: "Technology Innovation Grant",
    description: "Funding for startups and organizations developing technology solutions for social good.",
    amount: "$100,000",
    category: "Technology",
    deadline: "May 20, 2024",
    status: "new",
    funder: "Tech For Good Foundation",
    matchScore: 91,
    requirementsCount: 8,
    applicants: 74,
    location: "National",
    industry: "Technology",
    applicationProcess: "Initial screening, demo day, and final pitch.",
    eligibility: "Early-stage tech organizations with social mission",
    fundingType: "Venture Capital",
    tags: ["technology", "innovation", "social enterprise"]
  },
];

export default function Funding() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFunding, setSelectedFunding] = useState<any>(null);
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredOpportunities = initialOpportunities.filter(opportunity => {
    const matchesSearch = 
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.funder.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "" || opportunity.category === categoryFilter;
    
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "saved" && savedOpportunities.includes(opportunity.id)) ||
      (activeTab === "highMatch" && opportunity.matchScore >= 90);
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleView = (opportunity: any) => {
    setSelectedFunding(opportunity);
  };

  const handleApply = (opportunityId: string) => {
    toast({
      title: "Application started",
      description: "Your application has been started. You can continue later.",
    });
  };

  const toggleSave = (opportunityId: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    
    setSavedOpportunities(prev => {
      if (prev.includes(opportunityId)) {
        toast({
          title: "Opportunity removed",
          description: "The funding opportunity has been removed from your saved list.",
        });
        return prev.filter(id => id !== opportunityId);
      } else {
        toast({
          title: "Opportunity saved",
          description: "The funding opportunity has been added to your saved list.",
        });
        return [...prev, opportunityId];
      }
    });
  };

  const handleShare = (opportunityId: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    
    toast({
      title: "Link copied",
      description: "A link to this funding opportunity has been copied to your clipboard.",
    });
  };

  const totalCount = initialOpportunities.length;
  const savedCount = savedOpportunities.length;
  const highMatchCount = initialOpportunities.filter(o => o.matchScore >= 90).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader 
        title="Funding Opportunities" 
        description="Discover grants and funding opportunities matching your interests"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card 
          className={cn(
            "transition-all shadow-sm cursor-pointer hover:shadow-md",
            activeTab === "all" ? "border-primary/50 bg-primary/5" : "bg-card"
          )}
          onClick={() => setActiveTab("all")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Opportunities</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground">
              Total available funding
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className={cn(
            "transition-all shadow-sm cursor-pointer hover:shadow-md",
            activeTab === "saved" ? "border-blue-500/50 bg-blue-500/5" : "bg-card"
          )}
          onClick={() => setActiveTab("saved")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved</CardTitle>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 hover:text-blue-700">{savedCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedCount}</div>
            <p className="text-xs text-muted-foreground">
              Opportunities you saved
            </p>
          </CardContent>
        </Card>

        <Card 
          className={cn(
            "transition-all shadow-sm cursor-pointer hover:shadow-md",
            activeTab === "highMatch" ? "border-green-500/50 bg-green-500/5" : "bg-card"
          )}
          onClick={() => setActiveTab("highMatch")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Matches</CardTitle>
            <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 hover:text-green-700">{highMatchCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highMatchCount}</div>
            <p className="text-xs text-muted-foreground">
              90%+ match with your profile
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Advanced Filters</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DollarSign className="mr-2 h-4 w-4" />
                <span>By Amount</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>By Deadline</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" />
                <span>By Funder</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart4 className="mr-2 h-4 w-4" />
                <span>By Match Score</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Clear All Filters</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Separator />
      
      <Dialog open={!!selectedFunding} onOpenChange={() => setSelectedFunding(null)}>
        {selectedFunding && (
          <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Badge
                    variant={"secondary"}
                    className="mb-2"
                  >
                    {selectedFunding.category}
                  </Badge>
                  <DialogTitle className="text-xl">{selectedFunding.title}</DialogTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => toggleSave(selectedFunding.id, e)}
                  >
                    {savedOpportunities.includes(selectedFunding.id) ? (
                      <Bookmark className="h-4 w-4 fill-primary text-primary" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => handleShare(selectedFunding.id, e)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <DialogDescription className="flex items-center gap-1 mt-2">
                <Building2 className="h-3 w-3 inline-block text-muted-foreground" />
                <span>{selectedFunding.funder}</span>
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="max-h-[500px] pr-4">
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-primary" /> Amount
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{selectedFunding.amount}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-amber-500" /> Deadline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{selectedFunding.deadline}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Match Score</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {selectedFunding.matchScore >= 90 ? (
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                        ) : selectedFunding.matchScore >= 75 ? (
                          <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                        )}
                        <span className={cn(
                          "text-lg font-semibold",
                          selectedFunding.matchScore >= 90 ? "text-green-500" :
                          selectedFunding.matchScore >= 75 ? "text-amber-500" : "text-red-500"
                        )}>
                          {selectedFunding.matchScore}% Match
                        </span>
                      </div>
                      <Badge 
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        {selectedFunding.requirementsCount} requirements
                      </Badge>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className={cn(
                          "h-full",
                          selectedFunding.matchScore >= 90 ? "bg-green-500" :
                          selectedFunding.matchScore >= 75 ? "bg-amber-500" : "bg-red-500"
                        )} 
                        style={{ width: `${selectedFunding.matchScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Based on your organization profile and previous proposals
                    </p>
                  </CardContent>
                </Card>
                
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{selectedFunding.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Eligibility</h3>
                      <p className="text-sm text-muted-foreground">{selectedFunding.eligibility}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Application Process</h3>
                      <p className="text-sm text-muted-foreground">{selectedFunding.applicationProcess}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Funding Type</h3>
                      <p className="text-sm text-muted-foreground">{selectedFunding.fundingType}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Location</h3>
                      <p className="text-sm text-muted-foreground">{selectedFunding.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Applicants</h3>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{selectedFunding.applicants}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFunding.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            
            <DialogFooter className="flex sm:justify-between">
              <Button variant="outline">
                View Similar Proposals
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toggleSave(selectedFunding.id)}>
                  {savedOpportunities.includes(selectedFunding.id) ? (
                    <>
                      <Bookmark className="mr-2 h-4 w-4 fill-primary text-primary" />
                      Saved
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="mr-2 h-4 w-4" />
                      Save
                    </>
                  )}
                </Button>
                <Button onClick={() => handleApply(selectedFunding.id)}>
                  Apply Now
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOpportunities.map((opportunity) => (
          <Card
            key={opportunity.id}
            className="relative overflow-hidden transition-all hover:shadow-md group cursor-pointer border-muted"
            onClick={() => handleView(opportunity)}
          >
            <div className="absolute top-3 right-3 flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full opacity-70 hover:opacity-100 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                onClick={(e) => toggleSave(opportunity.id, e)}
              >
                {savedOpportunities.includes(opportunity.id) ? (
                  <Bookmark className="h-3.5 w-3.5 fill-primary text-primary" />
                ) : (
                  <BookmarkPlus className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full opacity-70 hover:opacity-100 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                onClick={(e) => handleShare(opportunity.id, e)}
              >
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-4">
                <Badge
                  variant="outline"
                  className="mb-2"
                >
                  {opportunity.category}
                </Badge>
                <div className={cn(
                  "text-xs font-medium rounded-full px-2 py-0.5",
                  opportunity.matchScore >= 90 ? "bg-green-100 text-green-700" :
                  opportunity.matchScore >= 75 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"
                )}>
                  {opportunity.matchScore}% Match
                </div>
              </div>
              <CardTitle className="line-clamp-1 text-lg">{opportunity.title}</CardTitle>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Building2 className="h-3 w-3 mr-1" />
                {opportunity.funder}
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{opportunity.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{opportunity.amount}</span>
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">{opportunity.deadline}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="ghost" 
                className="w-full justify-between group-hover:text-primary group-hover:bg-primary/5"
              >
                <span>View Details</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
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
