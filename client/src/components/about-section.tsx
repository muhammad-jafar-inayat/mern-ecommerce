export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Re-Libas</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Re-Libas is a collaborative, student-led initiative across multiple universities in Pakistan, 
            aiming to restore dignity through clothing reuse with minimal cost and maximum impact.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Students organizing and sorting donated clothes"
              className="rounded-2xl shadow-lg"
            />
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary text-white p-3 rounded-lg">
                <i className="fas fa-bullseye text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To collect usable, clean secondhand clothes and distribute them through accessible 
                  "Wall of Hope" stations at public locations - without stigma, with dignity.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-accent text-white p-3 rounded-lg">
                <i className="fas fa-users text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Student-Led Network</h3>
                <p className="text-muted-foreground">
                  Coordinated by Amal Fellows in collaboration with Kaar-e-Kamal Society, 
                  Blood Donation Society at UET Lahore, and other partner organizations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-orange-400 text-white p-3 rounded-lg">
                <i className="fas fa-recycle text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable Model</h3>
                <p className="text-muted-foreground">
                  A decentralized, continuously running system that maintains accessibility 
                  for daily-wage workers and families in need through strategic placement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
