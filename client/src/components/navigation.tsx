import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };


const navigate = useNavigate();

const navigateToAdmin = () => {
  navigate("/admin");
  setIsOpen(false);
};

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="https://res.cloudinary.com/dbqvd268f/image/upload/t_logo/v1748610528/logo_rjiay5.png"
              alt="Re-Libas Logo"
              className="w-10 h-15 object-cover"
            />

            <div>
              <h1 className="text-xl font-bold text-primary">Re-Libas</h1>
              <p className="text-xs text-muted-foreground">Rewear, Reuse and Restore Dignity</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("wall-of-hope")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Wall of Hope
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Impact
            </button>
            <button
              onClick={() => scrollToSection("get-involved")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Get Involved
            </button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <i className="fas fa-globe mr-1"></i> EN
              </Button>
              <Button 
                onClick={navigateToAdmin}
                variant="outline" 
                size="sm" 
                className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
              >
                <i className="fas fa-user-shield mr-2"></i>
                Admin
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <i className="fas fa-bars text-xl"></i>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-6">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-left text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("wall-of-hope")}
                  className="text-left text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Wall of Hope
                </button>
                <button
                  onClick={() => scrollToSection("impact")}
                  className="text-left text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Impact
                </button>
                <button
                  onClick={() => scrollToSection("get-involved")}
                  className="text-left text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Get Involved
                </button>
                <hr className="border-gray-200" />
                <button
                  onClick={navigateToAdmin}
                  className="text-left text-primary hover:text-primary-dark font-medium transition-colors flex items-center"
                >
                  <i className="fas fa-user-shield mr-2"></i>
                  Admin Panel
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}