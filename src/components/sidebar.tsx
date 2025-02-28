
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Award, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  HandshakeSVG, 
  Home, 
  MessageSquare, 
  Search, 
  Settings, 
  UserRound 
} from "lucide-react";

// Add the missing HandshakeSVG icon
function HandshakeSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m11 14-2.3-2.3a2.4 2.4 0 0 0-3.4 0 2.4 2.4 0 0 0 0 3.4l2.3 2.3c.4.4.9.6 1.5.6s1.1-.2 1.5-.6l4.9-4.9" />
      <path d="m15 10 2.3 2.3a2.4 2.4 0 0 0 3.4 0 2.4 2.4 0 0 0 0-3.4L18.4 6.9c-.4-.4-.9-.6-1.5-.6s-1.1.2-1.5.6L10.5 12" />
    </svg>
  );
}

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      to: "/dashboard",
    },
    {
      label: "Proposals",
      icon: Award,
      to: "/proposals",
    },
    {
      label: "Funding",
      icon: HandshakeSVG,
      to: "/funding",
    },
    {
      label: "Alerts",
      icon: Bell,
      to: "/alerts",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      to: "/messages",
    },
    {
      label: "Profile",
      icon: UserRound,
      to: "/profile",
    },
    {
      label: "Settings",
      icon: Settings,
      to: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div 
          className={cn(
            "flex items-center gap-2 transition-opacity",
            collapsed ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="rounded-full bg-sidebar-primary p-1">
            <HandshakeSVG className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-semibold text-sidebar-foreground">Similarity</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="flex flex-col gap-1">
          {routes.map((route) => (
            <Link
              key={route.to}
              to={route.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                location.pathname === route.to && "bg-sidebar-accent text-sidebar-accent-foreground",
                collapsed && "justify-center"
              )}
            >
              <route.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{route.label}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4">
        <Button 
          variant="outline" 
          className={cn(
            "w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80",
            collapsed && "aspect-square p-0"
          )}
        >
          <Search className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Search</span>}
        </Button>
      </div>
    </div>
  );
}
