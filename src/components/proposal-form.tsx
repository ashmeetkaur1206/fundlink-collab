
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
import { useState } from "react";

const proposalSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(500, "Description must be less than 500 characters"),
  category: z.string().min(1, "Please select a category"),
  budget: z.string().min(1, "Budget is required"),
  timeline: z.string().min(1, "Timeline is required"),
  goals: z.string().min(10, "Goals must be at least 10 characters"),
  targetAudience: z.string().min(10, "Target audience must be at least 10 characters"),
  expectedImpact: z.string().min(10, "Expected impact must be at least 10 characters"),
});

export type ProposalFormValues = z.infer<typeof proposalSchema>;

interface ProposalFormProps {
  onSubmit: (data: ProposalFormValues) => void;
  defaultValues?: Partial<ProposalFormValues>;
}

export function ProposalForm({ onSubmit, defaultValues }: ProposalFormProps) {
  const [formStep, setFormStep] = useState(0);
  
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
    },
  });

  const handleSubmit = (data: ProposalFormValues) => {
    onSubmit(data);
  };

  const goToNextStep = async () => {
    const fields = formStep === 0 
      ? ["title", "description", "category", "budget"] 
      : ["timeline", "goals", "targetAudience", "expectedImpact"];
    
    const isValid = await form.trigger(fields as any);
    if (isValid) setFormStep(1);
  };

  const goToPreviousStep = () => {
    setFormStep(0);
  };

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
        ) : (
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
