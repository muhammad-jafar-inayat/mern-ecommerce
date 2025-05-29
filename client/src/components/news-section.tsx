import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function NewsSection() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/news"],
  });

  const getBadgeVariant = (category: string) => {
    switch (category.toLowerCase()) {
      case "installation":
        return "bg-primary text-white hover:bg-primary";
      case "impact story":
        return "bg-orange-400 text-white hover:bg-orange-400";
      case "partnership":
        return "bg-blue-500 text-white hover:bg-blue-500";
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with our latest activities, new Wall of Hope installations, 
            and community impact stories.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </CardContent>
              </Card>
            ))
          ) : (
            articles?.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={getBadgeVariant(article.category)}>
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {article.excerpt}
                  </p>
                  <button className="text-primary hover:text-accent font-medium transition-colors">
                    Read More <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-accent">
            <i className="fas fa-newspaper mr-2"></i>
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
}
