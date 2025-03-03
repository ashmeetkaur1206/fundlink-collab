
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/user-nav";
import { FileText, Home, DollarSign, MessagesSquare, User, Bell } from "lucide-react";
import useMobile from "@/hooks/use-mobile";

export interface SidebarProps {
  className?: string;
}

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Proposals",
    href: "/proposals",
    icon: FileText,
  },
  {
    title: "Funding",
    href: "/funding",
    icon: DollarSign,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessagesSquare,
  },
  {
    title: "Alerts",
    href: "/alerts",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const isMobile = useMobile();
  const location = useLocation();

  return (
    <div className={cn("pb-3 bg-muted/40", className)}>
      <div className="flex h-16 items-center justify-between px-6">
        {!isMobile && (
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="/placeholder.svg" alt="Logo" className="h-6 w-6" />
            <span className="text-lg">GrantHub</span>
          </Link>
        )}
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
      {isMobile && (
        <>
          <div className="flex justify-center py-2">
            <MainNav />
          </div>
          <Separator />
        </>
      )}
      {!isMobile && (
        <div className="flex flex-col gap-2 px-2 py-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={location.pathname === item.href ? "default" : "ghost"}
              className={cn(
                "justify-start gap-2",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
              asChild
            >
              <Link to={item.href}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
