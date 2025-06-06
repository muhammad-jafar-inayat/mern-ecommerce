import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const queryClient = useQueryClient();

  const { data: donations = [], isLoading: loadingDonations } = useQuery({
    queryKey: ["donations"],
    queryFn: async () =>
      await apiRequest("GET", "/api/donations").then((res) => res.json()),
  });

  const { data: volunteers = [], isLoading: loadingVolunteers } = useQuery({
    queryKey: ["volunteers"],
    queryFn: async () =>
      await apiRequest("GET", "/api/volunteers").then((res) => res.json()),
  });

  const { data: contacts = [], isLoading: loadingContacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () =>
      await apiRequest("GET", "/api/contacts").then((res) => res.json()),
  });

  const deleteDonation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/donations/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["donations"] }),
  });

  const deleteVolunteer = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/volunteers/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["volunteers"] }),
  });

  const deleteContact = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/contacts/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={onLogout}>Logout</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Donations */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Donation Requests</h2>
          {loadingDonations ? (
            <p>Loading donations...</p>
          ) : donations.length > 0 ? (
            donations.map((donation: any) => (
              <Card key={donation.id} className="mb-4">
                <CardContent className="p-4 space-y-1">
                  <p><strong>Name:</strong> {donation.fullName}</p>
                  <p><strong>Phone:</strong> {donation.phoneNumber}</p>
                  <p><strong>Type:</strong> {donation.clothingType}</p>
                  <p><strong>Quantity:</strong> {donation.estimatedQuantity}</p>
                  <p><strong>Address:</strong> {donation.address}</p>
                  <p><strong>Date:</strong> {donation.pickupDate}</p>
                  <p><strong>Time:</strong> {donation.pickupTime}</p>
                  <Button
                    variant="destructive"
                    onClick={() => donation.id && deleteDonation.mutate(donation.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No donations found.</p>
          )}
        </div>

        {/* Volunteers */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Volunteers</h2>
          {loadingVolunteers ? (
            <p>Loading volunteers...</p>
          ) : volunteers.length > 0 ? (
            volunteers.map((volunteer: any) => (
              <Card key={volunteer.id} className="mb-4">
                <CardContent className="p-4 space-y-1">
                  <p><strong>Name:</strong> {volunteer.fullName}</p>
                  <p><strong>Email:</strong> {volunteer.email}</p>
                  <p><strong>Phone:</strong> {volunteer.phoneNumber}</p>
                  <p><strong>Institution:</strong> {volunteer.institution}</p>
                  <p><strong>Interests:</strong> {volunteer.areasOfInterest?.join(", ")}</p>
                  <p><strong>Availability:</strong> {volunteer.availability}</p>
                  <p><strong>Comments:</strong> {volunteer.additionalComments}</p>
                  <Button
                    variant="destructive"
                    onClick={() => volunteer.id && deleteVolunteer.mutate(volunteer.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No volunteers found.</p>
          )}
        </div>

        {/* Contact Messages */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Contact Messages</h2>
          {loadingContacts ? (
            <p>Loading messages...</p>
          ) : contacts.length > 0 ? (
            contacts.map((contact: any) => (
              <Card key={contact.id} className="mb-4">
                <CardContent className="p-4 space-y-1">
                  <p><strong>Name:</strong> {contact.name}</p>
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Subject:</strong> {contact.subject}</p>
                  <p><strong>Message:</strong> {contact.message}</p>
                  <Button
                    variant="destructive"
                    onClick={() => contact.id && deleteContact.mutate(contact.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
