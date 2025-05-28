import { useState } from 'react';
import { Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: formData.address
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Store authentication data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", "company");
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userId", data.user.id);
        
        toast({
          title: "Registration Successful!",
          description: "Welcome to AgriLoop! Redirecting to product marketplace.",
        });
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/company-buy-product');
        }, 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
        toast({
          title: "Registration Failed",
          description: data.message || "Registration failed. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
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
              <Link to="#" className="text-gray-700 hover:text-green-600">Industries</Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">Resources</Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">About Us</Link>
              <Button className="bg-green-500 hover:bg-green-600" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Registration Form */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">Register your company</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Access sustainable agricultural materials for your business
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your company email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your company address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg"
              >
                Register
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyRegistration;
