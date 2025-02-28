
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Search, Send, MoreVertical, Filter, Paperclip, Smile } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils"; // Add this import for the cn utility function
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isOnline?: boolean;
  role?: string;
}

const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    initials: "SJ",
    lastMessage: "Thank you for submitting your proposal. I have a few questions about the budget section.",
    timestamp: "10:23 AM",
    unread: true,
    isOnline: true,
    role: "Funder"
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    initials: "MC",
    lastMessage: "Your proposal has been shortlisted for the Environmental Innovation Fund.",
    timestamp: "Yesterday",
    unread: true,
    isOnline: true,
    role: "Funder"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg",
    initials: "ER",
    lastMessage: "Can you provide more details about the community impact of your project?",
    timestamp: "Yesterday",
    unread: false,
    role: "Partner"
  },
  {
    id: "4",
    name: "David Wilson",
    avatar: "/placeholder.svg",
    initials: "DW",
    lastMessage: "I've reviewed your application and have some feedback to share.",
    timestamp: "2 days ago",
    unread: false,
    role: "Funder"
  },
  {
    id: "5",
    name: "Jessica Park",
    avatar: "/placeholder.svg",
    initials: "JP",
    lastMessage: "Looking forward to our call next week to discuss your project further.",
    timestamp: "1 week ago",
    unread: false,
    role: "Partner"
  },
];

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "contact";
  status?: "sent" | "delivered" | "read";
}

export default function Messages() {
  const [contacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "unread") return matchesSearch && contact.unread;
    if (activeTab === "funders") return matchesSearch && contact.role === "Funder";
    if (activeTab === "partners") return matchesSearch && contact.role === "Partner";
    
    return matchesSearch;
  });

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    toast({
      title: "Message sent",
      description: "Your message has been delivered successfully.",
    });
    
    setMessageText("");
  };

  // Mock conversation for selected contact
  const conversation: Message[] = selectedContact ? [
    {
      id: "1",
      content: "Hi there! I saw your proposal for the community garden project.",
      timestamp: "10:15 AM",
      sender: "contact",
    },
    {
      id: "2",
      content: "Thanks for reaching out! I'd be happy to discuss it further.",
      timestamp: "10:17 AM",
      sender: "user",
      status: "read"
    },
    {
      id: "3",
      content: selectedContact.lastMessage,
      timestamp: selectedContact.timestamp,
      sender: "contact",
    },
  ] : [];

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
      <DashboardHeader title="Messages" description="Collaborate and communicate with funders and partners" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Contacts List */}
        <Card className="md:col-span-1 overflow-hidden flex flex-col shadow-sm border-slate-200">
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 bg-muted/50"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                <TabsTrigger value="funders" className="text-xs">Funders</TabsTrigger>
                <TabsTrigger value="partners" className="text-xs">Partners</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="py-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={cn(
                    "flex items-center space-x-4 px-4 py-3 cursor-pointer transition-colors",
                    selectedContact?.id === contact.id ? "bg-accent" : "hover:bg-accent/50",
                    contact.unread && selectedContact?.id !== contact.id ? "bg-primary/5" : ""
                  )}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">{contact.initials}</AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium leading-none">{contact.name}</p>
                        {contact.role && (
                          <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
                            {contact.role}
                          </Badge>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{contact.timestamp}</span>
                    </div>
                    <p className={cn(
                      "text-xs truncate pr-4",
                      contact.unread ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread && (
                    <Badge variant="default" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      <span className="sr-only">Unread messages</span>
                    </Badge>
                  )}
                </div>
              ))}
              {filteredContacts.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No messages found</p>
                  <p className="text-xs text-muted-foreground mt-1">Try a different search term or filter</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
        
        {/* Message Conversation */}
        <Card className="md:col-span-2 overflow-hidden flex flex-col shadow-sm border-slate-200">
          {selectedContact ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">{selectedContact.initials}</AvatarFallback>
                    </Avatar>
                    {selectedContact.isOnline && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{selectedContact.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      {selectedContact.isOnline ? (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                          Online
                        </>
                      ) : 'Offline'}
                      {selectedContact.role && ` • ${selectedContact.role}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Search className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>View funding details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                      <DropdownMenuItem>Archive conversation</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Block contact</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-muted px-3 py-1">
                      <time className="text-[10px] text-muted-foreground">Today, {new Date().toLocaleDateString()}</time>
                    </div>
                  </div>
                  
                  {conversation.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className="flex items-end gap-2 max-w-[80%]">
                        {message.sender === "contact" && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                            <AvatarFallback className="text-[10px]">{selectedContact.initials}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-2.5",
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <time className="text-[10px] opacity-70">
                              {message.timestamp}
                            </time>
                            {message.sender === "user" && message.status === "read" && (
                              <svg className="h-3 w-3 text-primary-foreground/70" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-3 border-t">
                <div className="flex items-end gap-2 bg-muted/50 rounded-lg p-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 min-h-[40px]">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full shrink-0">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="rounded-full px-3 shrink-0" onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-1" />
                    <span>Send</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-xs">
                <div className="mx-auto w-16 h-16 mb-3 flex items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Your messages</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Select a conversation from the list to start messaging or connect with a new partner.
                </p>
                <Button className="mt-4" variant="outline">
                  Start new conversation
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
