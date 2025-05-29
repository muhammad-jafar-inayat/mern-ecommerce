import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="gradient-bg pattern-overlay relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Rewear. Reuse.{" "}
              <span className="text-orange-300">Restore Dignity.</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed">
              A student-led cloth bank creating Wall of Hope stations across Pakistan, ensuring everyone has access to clothing with dignity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={() => scrollToSection("get-involved")}
                className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 text-lg h-auto font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <i className="fas fa-heart mr-2"></i>
                Donate Clothes
              </Button>
              <Button
                onClick={() => scrollToSection("get-involved")}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg h-auto font-semibold transition-all duration-300"
              >
                <i className="fas fa-hands-helping mr-2"></i>
                Volunteer
              </Button>
            </div>
            
            {/* Impact Stats */}
            {stats && (
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold counter-animation">
                    {stats.clothesCollected.toLocaleString()}+
                  </div>
                  <div className="text-sm lg:text-base text-gray-200">Clothes Collected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold counter-animation">
                    {stats.familiesServed.toLocaleString()}+
                  </div>
                  <div className="text-sm lg:text-base text-gray-200">Families Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold counter-animation">
                    {stats.wallsOfHope}
                  </div>
                  <div className="text-sm lg:text-base text-gray-200">Walls of Hope</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Community members sharing clothes and helping each other"
              className="rounded-2xl shadow-2xl floating"
            />
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-orange-400 text-white p-4 rounded-full shadow-lg floating">
              <i className="fas fa-heart text-2xl"></i>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-primary p-4 rounded-full shadow-lg floating">
              <i className="fas fa-hands-helping text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
