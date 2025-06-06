import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDonationSchema, insertVolunteerSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";

const donationFormSchema = insertDonationSchema.extend({
  areasOfInterest: z.array(z.string()).optional(),
});

const volunteerFormSchema = insertVolunteerSchema.extend({
  areasOfInterest: z.array(z.string()).min(1, "Please select at least one area of interest"),
});

export default function GetInvolvedSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const donationForm = useForm<z.infer<typeof donationFormSchema>>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      clothingType: "",
      estimatedQuantity: "",
      pickupDate: "",
      pickupTime: "",
    },
  });

  const volunteerForm = useForm<z.infer<typeof volunteerFormSchema>>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      institution: "",
      areasOfInterest: [],
      availability: "",
      additionalComments: "",
    },
  });

  const donationMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertDonationSchema>) => {
      return await apiRequest("POST", "/api/donations", data);
    },
    onSuccess: () => {
      toast({
        title: "Donation Request Submitted",
        description: "Thank you! We'll contact you soon to schedule the pickup.",
      });
      donationForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/donations"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit donation request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const volunteerMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertVolunteerSchema>) => {
      return await apiRequest("POST", "/api/volunteers", data);
    },
    onSuccess: () => {
      toast({
        title: "Volunteer Registration Successful",
        description: "Welcome to Re-Libas! We'll be in touch with volunteer opportunities.",
      });
      volunteerForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/volunteers"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to register as volunteer. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onDonationSubmit = (data: z.infer<typeof donationFormSchema>) => {
    const { areasOfInterest, ...donationData } = data;
    donationMutation.mutate(donationData);
  };

  const onVolunteerSubmit = (data: z.infer<typeof volunteerFormSchema>) => {
    volunteerMutation.mutate(data);
  };

  const areasOfInterest = [
    "Collection Drives",
    "Sorting & Quality Check",
    "Wall Maintenance",
    "Community Outreach"
  ];

  return (
    <section id="get-involved" className="py-20 gradient-bg pattern-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Get Involved</h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Join the Re-Libas movement and help us create a more equitable Pakistan. 
            Every contribution, big or small, makes a difference.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-orange-400 text-white p-3 rounded-lg">
                  <i className="fas fa-heart text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Donate Clothes</h3>
              </div>
              
              <Form {...donationForm}>
                <form onSubmit={donationForm.handleSubmit(onDonationSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={donationForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={donationForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+92 XXX XXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={donationForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Complete pickup address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={donationForm.control}
                      name="clothingType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clothing Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="men">Men's Clothing</SelectItem>
                              <SelectItem value="women">Women's Clothing</SelectItem>
                              <SelectItem value="children">Children's Clothing</SelectItem>
                              <SelectItem value="mixed">Mixed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={donationForm.control}
                      name="estimatedQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Quantity</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select quantity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-10">1-10 items</SelectItem>
                              <SelectItem value="11-25">11-25 items</SelectItem>
                              <SelectItem value="26-50">26-50 items</SelectItem>
                              <SelectItem value="50+">50+ items</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={donationForm.control}
                      name="pickupDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Pickup Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={donationForm.control}
                      name="pickupTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9AM-12PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                              <SelectItem value="evening">Evening (5PM-8PM)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-accent"
                    disabled={donationMutation.isPending}
                  >
                    {donationMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Schedule Pickup
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Volunteer Registration */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <i className="fas fa-hands-helping text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Become a Volunteer</h3>
              </div>
              
              <Form {...volunteerForm}>
                <form onSubmit={volunteerForm.handleSubmit(onVolunteerSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={volunteerForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={volunteerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={volunteerForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+92 XXX XXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={volunteerForm.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="University/Organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={volunteerForm.control}
                    name="areasOfInterest"
                    render={() => (
                      <FormItem>
                        <FormLabel>Areas of Interest</FormLabel>
                        <div className="grid grid-cols-2 gap-3">
                          {areasOfInterest.map((area) => (
                            <FormField
                              key={area}
                              control={volunteerForm.control}
                              name="areasOfInterest"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(area)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, area])
                                          : field.onChange(field.value?.filter((value) => value !== area));
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {area}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={volunteerForm.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="weekends">Weekends Only</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                            <SelectItem value="specific">Specific Days (mention in comments)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={volunteerForm.control}
                    name="additionalComments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Comments</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any special skills, preferences, or questions?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-orange-400 hover:bg-orange-500"
                    disabled={volunteerMutation.isPending}
                  >
                    {volunteerMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus mr-2"></i>
                        Join as Volunteer
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
