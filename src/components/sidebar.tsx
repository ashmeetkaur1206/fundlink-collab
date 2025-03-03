
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
      badge: 3,
    },
    {
      label: "Messages",
      icon: MessageSquare,
      to: "/messages",
      badge: 5,
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

  // Group routes into categories
  const mainRoutes = routes.slice(0, 3);
  const communicationRoutes = routes.slice(3, 5);
  const accountRoutes = routes.slice(5);

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-sidebar shadow-md transition-all duration-300 z-10",
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div 
          className={cn(
            "flex items-center gap-2 transition-all duration-300",
            collapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}
        >
          <div className="rounded-full bg-sidebar-primary p-1.5">
            <Handshake className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-semibold text-sidebar-foreground text-lg tracking-tight">Similarity</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground rounded-full hover:bg-sidebar-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 pt-4 px-3">
        <nav className="flex flex-col gap-6">
          <div className="space-y-1">
            {collapsed ? null : (
              <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
                Main
              </h3>
            )}
            {mainRoutes.map((route) => (
              <Link
                key={route.to}
                to={route.to}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  location.pathname === route.to && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                  collapsed ? "justify-center" : ""
                )}
              >
                <route.icon className={cn(
                  "h-5 w-5 shrink-0 transition-transform", 
                  location.pathname === route.to ? "text-sidebar-primary" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground",
                  collapsed ? "mx-auto" : ""
                )} />
                {!collapsed && (
                  <span className={cn(
                    location.pathname === route.to ? "text-sidebar-foreground" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                  )}>{route.label}</span>
                )}
              </Link>
            ))}
          </div>
          
          <div className="space-y-1">
            {collapsed ? null : (
              <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
                Communication
              </h3>
            )}
            {communicationRoutes.map((route) => (
              <Link
                key={route.to}
                to={route.to}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  location.pathname === route.to && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                  collapsed ? "justify-center" : ""
                )}
              >
                <div className="relative">
                  <route.icon className={cn(
                    "h-5 w-5 shrink-0 transition-transform", 
                    location.pathname === route.to ? "text-sidebar-primary" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                  )} />
                  {route.badge && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sidebar-primary text-[10px] font-medium text-sidebar-primary-foreground">
                      {route.badge}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <>
                    <span className={cn(
                      "flex-1",
                      location.pathname === route.to ? "text-sidebar-foreground" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                    )}>{route.label}</span>
                    {route.badge && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary text-[10px] font-medium text-sidebar-primary-foreground">
                        {route.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            ))}
          </div>
          
          <div className="space-y-1">
            {collapsed ? null : (
              <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
                Account
              </h3>
            )}
            {accountRoutes.map((route) => (
              <Link
                key={route.to}
                to={route.to}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  location.pathname === route.to && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                  collapsed ? "justify-center" : ""
                )}
              >
                <route.icon className={cn(
                  "h-5 w-5 shrink-0 transition-transform", 
                  location.pathname === route.to ? "text-sidebar-primary" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                )} />
                {!collapsed && (
                  <span className={cn(
                    location.pathname === route.to ? "text-sidebar-foreground" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                  )}>{route.label}</span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-sidebar-border">
        <Button 
          variant="outline" 
          className={cn(
            "w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80 transition-all duration-300",
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
