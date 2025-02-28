
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const [mounted, setMounted] = useState(false);
  
  // Add a mounting animation effect
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main className={cn(
        "flex flex-1 flex-col overflow-hidden transition-opacity duration-500 ease-in-out",
        mounted ? "opacity-100" : "opacity-0"
      )}>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
