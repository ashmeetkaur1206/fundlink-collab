
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarPlus,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  ListFilter,
  Lightbulb,
  BarChart,
  Users,
  Handshake,
  LineChart,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const recentProposals = [
  {
    id: "1",
    title: "Urban Garden Initiative",
    deadline: "Dec 20, 2023",
    status: "pending",
    progress: 75,
  },
  {
    id: "2",
    title: "Digital Literacy for Seniors",
    deadline: "Nov 30, 2023",
    status: "approved",
    progress: 90,
  },
  {
    id: "3",
    title: "Youth Mentorship Program",
    deadline: "Jan 15, 2024",
    status: "pending",
    progress: 40,
  },
];

const funders = [
  {
    id: "1",
    name: "Johnson Foundation",
    logo: "/placeholder.svg",
    initials: "JF",
    category: "Community Development",
    funding: "$2.5M",
    location: "National",
    matchScore: 92,
  },
  {
    id: "2",
    name: "Green Future Fund",
    logo: "/placeholder.svg",
    initials: "GF",
    category: "Environment",
    funding: "$1.8M",
    location: "International",
    matchScore: 88,
  },
  {
    id: "3",
    name: "Education Forward",
    logo: "/placeholder.svg",
    initials: "EF",
    category: "Education",
    funding: "$750K",
    location: "Regional",
    matchScore: 95,
  },
];

const upcomingDeadlines = [
  {
    id: "1",
    title: "Community Development Grant",
    date: "Dec 15, 2023",
    days: 5,
    type: "Grant Application",
  },
  {
    id: "2",
    title: "Progress Report: Digital Literacy",
    date: "Dec 23, 2023",
    days: 13,
    type: "Report Submission",
  },
  {
    id: "3",
    title: "Budget Revision Deadline",
    date: "Jan 5, 2024",
    days: 26,
    type: "Administrative",
  },
];

const insights = [
  {
    id: "1",
    title: "Your proposals have a 68% success rate",
    description: "This is 12% higher than the platform average",
    icon: BarChart3,
    color: "text-green-500",
  },
  {
    id: "2",
    title: "Environmental proposals most successful",
    description: "85% approval rate in this category",
    icon: Lightbulb,
    color: "text-amber-500",
  },
  {
    id: "3",
    title: "4 new relevant grants available",
    description: "Matching your organization profile",
    icon: Bell,
    color: "text-blue-500",
  },
];

export default function Dashboard() {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "Feature coming soon",
      description: "This feature will be available in the next update.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your funding activities"
      />

      <DashboardStats />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="funders">Funders</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Active Proposals Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base">Active Proposals</CardTitle>
                  <CardDescription>Your ongoing proposals</CardDescription>
                </div>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2">
                <ScrollArea className="h-[160px]">
                  <div className="space-y-3">
                    {recentProposals.map((proposal) => (
                      <div
                        key={proposal.id}
                        className="flex items-center justify-between border-b pb-2 mb-2 last:mb-0 last:pb-0 last:border-b-0"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{proposal.title}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {proposal.deadline}
                          </div>
                        </div>
                        <Badge
                          variant={
                            proposal.status === "pending" ? "outline" : 
                            proposal.status === "approved" ? "secondary" : "destructive"
                          }
                          className="capitalize"
                        >
                          {proposal.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/proposals" className="flex items-center justify-between w-full">
                    <span>View All Proposals</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Upcoming Deadlines Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
                  <CardDescription>Don't miss these dates</CardDescription>
                </div>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2">
                <ScrollArea className="h-[160px]">
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                      <div
                        key={deadline.id}
                        className="flex items-center border-b pb-2 mb-2 last:mb-0 last:pb-0 last:border-b-0"
                      >
                        <div className={cn(
                          "flex-shrink-0 rounded-full w-10 h-10 flex items-center justify-center mr-3",
                          deadline.days <= 7 ? "bg-red-100 text-red-700" : 
                          deadline.days <= 14 ? "bg-amber-100 text-amber-700" : 
                          "bg-blue-100 text-blue-700"
                        )}>
                          <span className="text-sm font-semibold">{deadline.days}d</span>
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-medium leading-none">{deadline.title}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarPlus className="h-3 w-3 mr-1" />
                            <span>{deadline.date}</span>
                            <span className="mx-1.5">•</span>
                            <span>{deadline.type}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={handleAction}>
                  <span className="flex items-center justify-between w-full">
                    <span>View Calendar</span>
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </Button>
              </CardFooter>
            </Card>
            
            {/* AI Insights Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base">AI Insights</CardTitle>
                  <CardDescription>Based on your activity</CardDescription>
                </div>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2">
                <ScrollArea className="h-[160px]">
                  <div className="space-y-3">
                    {insights.map((insight) => (
                      <div
                        key={insight.id}
                        className="border-b pb-2 mb-2 last:mb-0 last:pb-0 last:border-b-0"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={cn(
                            "rounded-full p-1.5",
                            insight.color === "text-green-500" ? "bg-green-100" :
                            insight.color === "text-amber-500" ? "bg-amber-100" : "bg-blue-100"
                          )}>
                            <insight.icon className={cn("h-3.5 w-3.5", insight.color)} />
                          </div>
                          <p className="text-sm font-medium">{insight.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground ml-7">{insight.description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={handleAction}>
                  <span className="flex items-center justify-between w-full">
                    <span>Get More Insights</span>
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recommended Funders */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Recommended Funders</CardTitle>
                <CardDescription>
                  Matched to your organization profile
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <ScrollArea className="h-[300px]">
                  {funders.map((funder) => (
                    <div
                      key={funder.id}
                      className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors mb-1 cursor-pointer"
                    >
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={funder.logo} alt={funder.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {funder.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium truncate">{funder.name}</h4>
                          <Badge variant="outline" className="ml-2">
                            {funder.matchScore}%
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <span>{funder.category}</span>
                          <span className="mx-1">•</span>
                          <span>{funder.funding}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/funding">
                    View All Funders
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Funding Overview Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Funding Overview</CardTitle>
                <CardDescription>
                  Your funding applications and success rate
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="flex flex-col gap-8 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-primary"></div>
                          <span className="text-sm font-medium">Proposals Submitted</span>
                        </div>
                        <span className="font-bold">24</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `100%` }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium">Approved</span>
                        </div>
                        <span className="font-bold">16</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `66.7%` }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                          <span className="text-sm font-medium">Pending</span>
                        </div>
                        <span className="font-bold">5</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `20.8%` }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-red-500"></div>
                          <span className="text-sm font-medium">Rejected</span>
                        </div>
                        <span className="font-bold">3</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `12.5%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 border-t pt-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-primary">$1.2M</h4>
                      <p className="text-xs text-muted-foreground">Total Awarded</p>
                    </div>
                    <div className="h-10 border-l"></div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-green-500">68%</h4>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                    </div>
                    <div className="h-10 border-l"></div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-blue-500">7</h4>
                      <p className="text-xs text-muted-foreground">Active Grants</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleAction}>
                  Generate Detailed Report
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="proposals" className="space-y-4">
          <Button asChild>
            <Link to="/proposals">View Proposals Dashboard</Link>
          </Button>
        </TabsContent>
        
        <TabsContent value="funders" className="space-y-4">
          <Button asChild>
            <Link to="/funding">View Funding Dashboard</Link>
          </Button>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <Button onClick={handleAction}>
            Coming Soon
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
