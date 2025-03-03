
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const proposalSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(500, "Description must be less than 500 characters"),
  category: z.string().min(1, "Please select a category"),
  budget: z.string().min(1, "Budget is required"),
  timeline: z.string().min(1, "Timeline is required"),
  goals: z.string().min(10, "Goals must be at least 10 characters"),
  targetAudience: z.string().min(10, "Target audience must be at least 10 characters"),
  expectedImpact: z.string().min(10, "Expected impact must be at least 10 characters"),
  tags: z.string().optional(),
  location: z.string().optional(),
  organizationSize: z.string().optional(),
  industry: z.string().optional(),
  fundingTypes: z.string().array().optional(),
});

export type ProposalFormValues = z.infer<typeof proposalSchema>;

interface ProposalFormProps {
  onSubmit: (data: ProposalFormValues) => void;
  defaultValues?: Partial<ProposalFormValues>;
}

export function ProposalForm({ onSubmit, defaultValues }: ProposalFormProps) {
  const [formStep, setFormStep] = useState(0);
  const [matchedFunders, setMatchedFunders] = useState<any[]>([]);
  
  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      category: "",
      budget: "",
      timeline: "",
      goals: "",
      targetAudience: "",
      expectedImpact: "",
      tags: "",
      location: "",
      organizationSize: "",
      industry: "",
      fundingTypes: [],
    },
  });

  const handleSubmit = (data: ProposalFormValues) => {
    onSubmit(data);
  };

  const goToNextStep = async () => {
    const fields = formStep === 0 
      ? ["title", "description", "category", "budget"] 
      : formStep === 1
      ? ["timeline", "goals", "targetAudience", "expectedImpact"]
      : ["tags", "location", "organizationSize", "industry"];
    
    const isValid = await form.trigger(fields as any);
    if (isValid) {
      if (formStep === 1) {
        // When advancing from step 1 to step 2, simulate finding matching funders
        const mockFunders = [
          {
            id: "1", 
            name: "Johnson Foundation", 
            category: form.getValues("category"),
            matchScore: 92,
            amount: "$75,000"
          },
          {
            id: "2", 
            name: "GreenTech Initiative", 
            category: "Environment",
            matchScore: 85,
            amount: "$120,000"
          },
          {
            id: "3", 
            name: "Education Forward Trust", 
            category: "Education",
            matchScore: 78,
            amount: "$50,000"
          }
        ];
        
        setMatchedFunders(mockFunders);
      }
      setFormStep(prevStep => prevStep + 1);
    }
  };

  const goToPreviousStep = () => {
    setFormStep(prevStep => prevStep - 1);
  };

  const fundingTypes = [
    "Grant", "Investment", "Fellowship", "Loan", "Prize", "Contract"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {formStep === 0 ? (
          <>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposal Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a concise title for your proposal" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear title that describes your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide a brief overview of your project" 
                        className="resize-none min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Summarize your project in a few sentences.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Environment">Environment</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Community">Community</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Social Services">Social Services</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The main focus area of your project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget (USD)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 50000" {...field} />
                      </FormControl>
                      <FormDescription>
                        Estimated total budget required.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="button" onClick={goToNextStep}>
                Next Step
              </Button>
            </div>
          </>
        ) : formStep === 1 ? (
          <>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeline</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 6 months, 1 year" {...field} />
                    </FormControl>
                    <FormDescription>
                      Expected duration of your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Goals</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the main objectives of your project" 
                        className="resize-none min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      What you aim to achieve with this project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Who will benefit from this project" 
                        className="resize-none min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      The communities or individuals your project will serve.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expectedImpact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Impact</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the intended outcomes and impact" 
                        className="resize-none min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      How will this project make a difference?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={goToPreviousStep}
              >
                Previous Step
              </Button>
              <Button type="button" onClick={goToNextStep}>
                Next Step
              </Button>
            </div>
          </>
        ) : formStep === 2 ? (
          <>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords/Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. education, youth, urban (comma separated)" {...field} />
                    </FormControl>
                    <FormDescription>
                      Add keywords that describe your project for better funder matching.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location scope" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Local">Local</SelectItem>
                          <SelectItem value="Regional">Regional</SelectItem>
                          <SelectItem value="National">National</SelectItem>
                          <SelectItem value="International">International</SelectItem>
                          <SelectItem value="Global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Geographical scope of your project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="organizationSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Small">Small (1-10 employees)</SelectItem>
                          <SelectItem value="Medium">Medium (11-50 employees)</SelectItem>
                          <SelectItem value="Large">Large (51+ employees)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Size of your organization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry/Sector</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nonprofit">Nonprofit</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Arts">Arts & Culture</SelectItem>
                        <SelectItem value="Environmental">Environmental</SelectItem>
                        <SelectItem value="Social Services">Social Services</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Industry or sector of your organization.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fundingTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Funding Types</FormLabel>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {fundingTypes.map(type => (
                        <Badge
                          key={type}
                          variant={field.value?.includes(type) ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer hover:bg-primary/20",
                            field.value?.includes(type) && "bg-primary text-primary-foreground"
                          )}
                          onClick={() => {
                            const currentValues = field.value || [];
                            const newValues = currentValues.includes(type)
                              ? currentValues.filter(v => v !== type)
                              : [...currentValues, type];
                            field.onChange(newValues);
                          }}
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                    <FormDescription>
                      Select the types of funding you're seeking.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={goToPreviousStep}
              >
                Previous Step
              </Button>
              <Button type="button" onClick={goToNextStep}>
                Next Step
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium mb-2">Proposal Summary</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Title</p>
                    <p>{form.getValues("title")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <p>{form.getValues("category")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budget</p>
                    <p>${form.getValues("budget")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                    <p>{form.getValues("timeline")}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="mb-4">{form.getValues("description")}</p>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium mb-3">Matching Funders</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your proposal details, we've identified these potential funding matches:
                </p>
                
                <div className="space-y-3">
                  {matchedFunders.map(funder => (
                    <div key={funder.id} className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-medium">{funder.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {funder.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{funder.amount}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "text-xs px-2 py-1 rounded-full font-medium",
                          funder.matchScore >= 90 ? "bg-green-100 text-green-800" :
                          funder.matchScore >= 80 ? "bg-blue-100 text-blue-800" :
                          "bg-amber-100 text-amber-800"
                        )}>
                          {funder.matchScore}% Match
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={goToPreviousStep}
              >
                Previous Step
              </Button>
              <Button type="submit">
                Submit Proposal
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
