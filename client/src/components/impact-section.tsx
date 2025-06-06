import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

export default function ImpactSection() {
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const testimonials = [
   {
  content: "Re-Libas provided clothing when we needed it most. I feel connected to my community again.",
  name: "Nazir Ahmed",
  location: "Garhi Shahu, Lahore",
  avatar: "https://res.cloudinary.com/dbqvd268f/image/upload/fl_preserve_transparency/v1748605031/Screenshot_2025-05-30_163650_fb21wf.jpg?_s=public-apps"
}
,
    {
      content: "Re-Libas taught me that small actions spark big change. Sorting clothes, I’ve seen how a simple gesture can bring warmth, dignity, and smiles.",
      name: "Muhammad Jafar",
      location: "Amal Fellow Volunteer",
      avatar: "https://res.cloudinary.com/dbqvd268f/image/upload/fl_preserve_transparency/v1748601946/Screenshot_2025-05-30_154521_fuh6kh.jpg?_s=public-apps"
    }
  ];

  const galleryImages = [
    "https://res.cloudinary.com/dbqvd268f/image/upload/fl_preserve_transparency/v1748604489/WOH_title_fgsglh.jpg?_s=public-apps",
    "https://res.cloudinary.com/dbqvd268f/image/upload/fl_preserve_transparency/v1748604490/20160730_164940_jm35uj.jpg?_s=public-apps",
    "https://res.cloudinary.com/dbqvd268f/image/upload/fl_preserve_transparency/v1748602582/UN0761229.jpg.960W_wwn5fl.jpg?_s=public-apps",
    "https://res.cloudinary.com/dbqvd268f/image/upload/fl_preserve_transparency/v1748603293/UN0761214.jpg.960w.jpg_yrrvx7.jpg?_s=public-apps"
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
                <div className="text-3xl font-bold mb-2 counter-animation">4</div>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Gallery</h3>
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
