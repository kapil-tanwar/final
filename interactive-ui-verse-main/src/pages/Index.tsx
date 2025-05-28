
import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Leaf, Users, Recycle, TrendingUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleFarmerClick = () => {
    navigate('/farmer-registration');
  };

  const handleCompanyClick = () => {
    navigate('/company-registration');
  };

  const howItWorksSteps = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connect with Farmers",
      description: "Sign up as a farmer and list your agricultural waste, specifying type, quantity, and location."
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Find Sustainable Materials",
      description: "Businesses can search for the type of agricultural waste based on their needs and sustainability goals."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Carbon Reduction",
      description: "Our AI-powered platform calculates the carbon footprint reduction achieved through waste optimization."
    }
  ];

  const benefits = [
    {
      title: "Increased Income for Farmers",
      description: "Farmers can generate additional income by selling their agricultural waste, turning a potential liability into an asset.",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop"
    },
    {
      title: "Access to Sustainable Materials",
      description: "Businesses can source high-quality, sustainable raw materials meeting consumer demand for eco-friendly products.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop"
    },
    {
      title: "Reduced Environmental Impact",
      description: "By utilizing agricultural waste, Bio Harvest helps reduce greenhouse gas emissions and promotes a circular economy.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Bio Harvest</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {['home', 'about', 'services', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 capitalize"
                  >
                    {item}
                  </button>
                ))}
                <Button 
                  onClick={() => navigate('/waste-products')}
                  variant="outline"
                  className="mr-2"
                >
                  Products
                </Button>
                <Button 
                  onClick={() => navigate('/farmer-listings')}
                  variant="outline"
                  className="mr-2"
                >
                  Listings
                </Button>
                <Button 
                  onClick={handleFarmerClick}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Get Started
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['home', 'about', 'services', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left capitalize"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => navigate('/waste-products')}
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Products
              </button>
              <button
                onClick={() => navigate('/farmer-listings')}
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Listings
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=1080&fit=crop')`
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Transforming Agricultural Waste into
              <span className="block text-green-400">
                Sustainable Resources
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              Bio Harvest connects farmers with companies seeking sustainable raw materials, reducing carbon footprint and promoting a circular agricultural economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleFarmerClick}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
              >
                I am a Farmer
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleCompanyClick}
                className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-gray-900"
              >
                We are a Company
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white" />
        </div>
      </section>

      {/* How Bio Harvest Works */}
      <section id="about" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Bio Harvest Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform simplifies the process of connecting farmers with businesses, ensuring efficient waste utilization and accurate carbon impact assessment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-green-500 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-green-400 mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits of Using Bio Harvest</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bio Harvest offers numerous benefits for both farmers and businesses, contributing to a more sustainable and profitable agricultural sector.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join Bio Harvest today and be part of the solution for a more sustainable future.
          </p>
          <Button 
            size="lg"
            onClick={handleFarmerClick}
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold">Bio Harvest</h3>
              </div>
              <p className="text-gray-400">
                Transforming agricultural waste into sustainable resources for a better tomorrow.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Solutions</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>Email: info@bioharvest.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Green Valley, Eco City</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Bio Harvest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
