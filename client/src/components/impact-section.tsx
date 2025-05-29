import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

export default function ImpactSection() {
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const testimonials = [
    {
      content: "The Wall of Hope near our mosque has been a blessing. My children now have warm clothes for winter, and I didn't have to compromise my dignity to get them.",
      name: "Fatima K.",
      location: "Gulberg, Lahore",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      content: "Being part of Re-Libas has taught me that small actions can create big changes. Every weekend we collect and sort clothes, and seeing families benefit makes it all worthwhile.",
      name: "Ahmad R.",
      location: "UET Student Volunteer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Re-Libas is making a difference in communities across Pakistan through 
            sustainable clothing redistribution and youth empowerment.
          </p>
        </div>
        
        {/* Impact Stats Grid */}
        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-primary to-accent text-white">
              <CardContent className="p-8 text-center">
                <i className="fas fa-tshirt text-4xl mb-4"></i>
                <div className="text-3xl font-bold mb-2 counter-animation">
                  {stats.clothesCollected.toLocaleString()}
                </div>
                <div className="text-sm opacity-90">Clothes Redistributed</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-400 to-orange-500 text-white">
              <CardContent className="p-8 text-center">
                <i className="fas fa-users text-4xl mb-4"></i>
                <div className="text-3xl font-bold mb-2 counter-animation">
                  {stats.familiesServed.toLocaleString()}
                </div>
                <div className="text-sm opacity-90">People Helped</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-8 text-center">
                <i className="fas fa-graduation-cap text-4xl mb-4"></i>
                <div className="text-3xl font-bold mb-2 counter-animation">
                  {stats.volunteers}
                </div>
                <div className="text-sm opacity-90">Active Volunteers</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <i className="fas fa-building text-4xl mb-4"></i>
                <div className="text-3xl font-bold mb-2 counter-animation">8</div>
                <div className="text-sm opacity-90">Partner Institutions</div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Testimonials and Gallery */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Community Stories</h3>
            
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={testimonial.avatar}
                        alt="Testimonial"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-muted-foreground italic mb-3">
                          "{testimonial.content}"
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          </div>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i key={star} className="fas fa-star text-yellow-400"></i>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Wall of Hope Gallery</h3>
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Wall of Hope installation ${index + 1}`}
                  className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
