
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type AlertType = "info" | "warning" | "success";

interface Alert {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: AlertType;
}

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "New Funding Opportunity",
      message: "A new grant matching your proposal criteria is now available.",
      date: "2023-09-15T10:30:00",
      read: false,
      type: "info"
    },
    {
      id: "2",
      title: "Proposal Deadline Approaching",
      message: "Your proposal 'Community Garden Initiative' is due in 3 days.",
      date: "2023-09-14T09:15:00",
      read: false,
      type: "warning"
    },
    {
      id: "3",
      title: "Proposal Approved",
      message: "Congratulations! Your 'Youth Education Program' proposal has been approved for funding.",
      date: "2023-09-12T14:45:00",
      read: true,
      type: "success"
    }
  ]);

  const markAsRead = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
    toast({
      title: "Alert marked as read",
      description: "This notification will no longer appear as new.",
    });
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
    toast({
      title: "All alerts marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast({
      title: "Alert deleted",
      description: "The notification has been removed.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBadge = (type: AlertType) => {
    switch (type) {
      case "info":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Info</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Warning</Badge>;
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>;
      default:
        return null;
    }
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader 
        title="Alerts" 
        description="View and manage your notifications"
      />
      
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button onClick={markAllAsRead} variant="outline" size="sm">
            Mark all as read
          </Button>
        </div>
      )}

      <div className="grid gap-6">
        {alerts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium">No alerts</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You don't have any notifications right now.
              </p>
            </CardContent>
          </Card>
        ) : (
          alerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`transition-all ${!alert.read ? 'border-l-4 border-l-primary' : ''}`}
            >
              <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
                <div className="flex items-start gap-4">
                  {getAlertIcon(alert.type)}
                  <div>
                    <CardTitle className="text-base font-semibold">
                      {alert.title}
                      {!alert.read && (
                        <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary"></span>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {formatDate(alert.date)}
                    </CardDescription>
                  </div>
                </div>
                {getAlertBadge(alert.type)}
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm">{alert.message}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <div className="flex gap-2">
                  {!alert.read && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => markAsRead(alert.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => deleteAlert(alert.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
