
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
  Home, 
  MessageSquare, 
  Search, 
  Settings, 
  UserRound,
  Handshake
} from "lucide-react";

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
      icon: Handshake,
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
            <Handshake className="h-5 w-5 text-sidebar-primary-foreground" />
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
