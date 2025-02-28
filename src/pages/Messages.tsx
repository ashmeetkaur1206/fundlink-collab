
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

interface Contact {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
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
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    initials: "MC",
    lastMessage: "Your proposal has been shortlisted for the Environmental Innovation Fund.",
    timestamp: "Yesterday",
    unread: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg",
    initials: "ER",
    lastMessage: "Can you provide more details about the community impact of your project?",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    name: "David Wilson",
    avatar: "/placeholder.svg",
    initials: "DW",
    lastMessage: "I've reviewed your application and have some feedback to share.",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: "5",
    name: "Jessica Park",
    avatar: "/placeholder.svg",
    initials: "JP",
    lastMessage: "Looking forward to our call next week to discuss your project further.",
    timestamp: "1 week ago",
    unread: false,
  },
];

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "contact";
}

export default function Messages() {
  const [contacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const { toast } = useToast();

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    toast({
      title: "Message sent",
      description: "This feature will be fully functional in the next update.",
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
        <Card className="md:col-span-1 overflow-hidden flex flex-col">
          <div className="p-4">
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="py-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center space-x-4 px-4 py-3 cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id ? "bg-accent" : "hover:bg-accent/50"
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{contact.name}</p>
                      <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate pr-4">{contact.lastMessage}</p>
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
                  <p className="text-sm text-muted-foreground">No messages found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
        
        {/* Message Conversation */}
        <Card className="md:col-span-2 overflow-hidden flex flex-col">
          {selectedContact ? (
            <>
              <div className="p-4 border-b flex items-center space-x-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback>{selectedContact.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{selectedContact.name}</p>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {conversation.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
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
                  />
                  <Button onClick={handleSendMessage} type="submit">Send</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose a contact to start messaging
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
