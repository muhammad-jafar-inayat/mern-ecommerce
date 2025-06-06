export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center">
                <i className="fas fa-hands-helping text-2xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Re-Libas</h3>
                <p className="text-sm text-gray-200">Rewear. Reuse. Restore Dignity.</p>
              </div>
            </div>
            <p className="text-gray-200 mb-6 leading-relaxed">
              Re-Libas is a student-led initiative creating sustainable clothing distribution networks 
              across Pakistan through Wall of Hope stations, ensuring dignified access to clothing for all.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61576774906944" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="https://www.instagram.com/relibaas346/" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              {/*<a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>*/}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("wall-of-hope")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Wall of Hope
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Our Impact
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("get-involved")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Get Involved
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">
                  News & Updates
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">
                  Volunteer Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-gray-200 text-sm">
            © 2025 Re-Libas. All rights reserved. Made with ❤️ by Youth for the community.
          </p>
          <div className="flex items-center space-x-6 mt-4 lg:mt-0">
            <span className="text-sm text-gray-200">Supported by:</span>
            <span className="text-sm font-medium">UET Lahore</span>
            <span className="text-sm font-medium">Amal Academy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
