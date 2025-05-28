
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const WasteProducts = () => {
  const products = [
    {
      name: 'Rice Husks',
      description: 'High-quality rice husks, ideal for various applications including biofuel production and composting.',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop'
    },
    {
      name: 'Corn Stover',
      description: 'Dried corn stover, suitable for animal feed, bioenergy, and soil amendment.',
      image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop'
    },
    {
      name: 'Wheat Straw',
      description: 'Clean wheat straw, perfect for mulching, animal bedding, and paper production.',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'
    },
    {
      name: 'Sugarcane Bagasse',
      description: 'Processed sugarcane bagasse, excellent for biofuel, paper, and packaging materials.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'
    },
    {
      name: 'Coffee Grounds',
      description: 'Recycled coffee grounds, rich in nutrients and ideal for composting and soil enrichment.',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop'
    },
    {
      name: 'Fruit Peels',
      description: 'Mixed fruit peels, suitable for biogas production and composting.',
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">AgriLoop</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">Solutions</Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">Resources</Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">About Us</Link>
              <Button className="bg-green-500 hover:bg-green-600">Contact Us</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agricultural Waste Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our diverse range of agricultural waste products, each with detailed specifications and pricing to meet your specific needs. Our platform ensures transparency and quality, connecting you directly with sustainable solutions.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Products</h2>
        </div>

        <div className="space-y-8">
          {products.map((product, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <div>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-gray-600 text-lg leading-relaxed">
                        {product.description}
                      </CardDescription>
                    </CardContent>
                  </div>
                  <div className="mt-6">
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link to="#" className="hover:text-green-600">Privacy Policy</Link>
              <Link to="#" className="hover:text-green-600">Terms of Service</Link>
            </div>
            <p className="text-sm text-gray-600">
              ©2024 AgriLoop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WasteProducts;
