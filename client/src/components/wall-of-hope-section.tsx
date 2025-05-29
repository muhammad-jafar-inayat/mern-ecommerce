import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WallOfHopeSection() {
  const { data: locations, isLoading } = useQuery({
    queryKey: ["/api/wall-locations"],
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "needs_restock":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Needs Restock</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatLastRestocked = (date: string) => {
    const restockDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - restockDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Restocked 1 day ago";
    return `Restocked ${diffDays} days ago`;
  };

  return (
    <section id="wall-of-hope" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Wall of Hope Locations</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find the nearest Wall of Hope station where you can donate or find clothing. 
            Each station is maintained by dedicated volunteers and restocked regularly.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
              <CardContent className="text-center">
                <i className="fas fa-map-marked-alt text-6xl text-primary mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h3>
                <p className="text-muted-foreground">Real-time locations of all Wall of Hope stations</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Location List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="flex space-x-2">
                        <div className="h-4 w-12 bg-gray-200 rounded"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              locations?.map((location) => (
                <Card key={location.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary text-white p-2 rounded-lg">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{location.name}</h4>
                        <p className="text-sm text-muted-foreground">{location.address}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          {getStatusBadge(location.status)}
                          <span className="text-xs text-muted-foreground">
                            {formatLastRestocked(location.lastRestocked)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
            
            <Button className="w-full bg-primary hover:bg-accent text-white font-medium">
              <i className="fas fa-plus mr-2"></i>
              View All Locations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
