import { useState } from 'react';
import { Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState("farmer"); // or "company"
  const [form, setForm] = useState({ 
    identifier: "", // This can be email, username, or phone
    password: "" 
  });
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => { 
    setForm({ ...form, [e.target.name]: e.target.value }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate form
    if (!form.identifier || !form.password) {
      setError("Please enter both identifier and password");
      toast({
        title: "Validation Error",
        description: "Please enter both identifier and password",
        variant: "destructive"
      });
      return;
    }

    const endpoint = userType === "farmer" 
      ? "http://localhost:5000/api/auth/login/farmer" 
      : "http://localhost:5000/api/auth/login/company";

    console.log('Attempting login with:', {
      endpoint,
      userType,
      identifier: form.identifier,
      // Don't log the actual password
      hasPassword: !!form.password
    });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          identifier: form.identifier.trim(), // Trim any whitespace
          password: form.password
        })
      });
      
      const data = await res.json();
      console.log('Login response:', {
        status: res.status,
        ok: res.ok,
        message: data.message,
        hasToken: !!data.token,
        hasUser: !!data.user
      });
      
      if (res.ok) {
        // Store authentication data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", userType);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userId", data.user.id);
        
        console.log('Login successful, stored data:', {
          hasToken: !!localStorage.getItem("token"),
          userType: localStorage.getItem("userType"),
          userName: localStorage.getItem("userName"),
          userId: localStorage.getItem("userId")
        });
        
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${data.user.name}!`,
        });
        
        // Redirect based on user type
        if (userType === "farmer") {
          navigate("/farmer-stock-management");
        } else {
          navigate("/company-buy-product");
        }
      } else {
        console.error('Login failed:', data);
        setError(data.message || "Login failed. Please check your credentials.");
        toast({
          title: "Login Failed",
          description: data.message || "Please check your credentials and try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError("Network error. Please check your connection.");
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    }
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
              <Link to="#" className="text-gray-700 hover:text-green-600">About</Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">Login</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    id="userType"
                    name="userType"
                    type="radio"
                    value="farmer"
                    checked={userType === "farmer"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="form-radio h-4 w-4 text-green-600"
                  />
                  <label htmlFor="userType" className="text-sm font-medium text-gray-700">
                    Farmer
                  </label>
                  <input
                    id="userType"
                    name="userType"
                    type="radio"
                    value="company"
                    checked={userType === "company"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="form-radio h-4 w-4 text-green-600"
                  />
                  <label htmlFor="userType" className="text-sm font-medium text-gray-700">
                    Company
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
                  Email, Username, or Phone
                </label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="Enter your email, username, or phone"
                  value={form.identifier}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
                <p className="mt-1 text-sm text-gray-500">
                  You can login using your email address, username, or phone number
                </p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg"
              >
                Login
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/farmer-registration" className="text-green-600 hover:text-green-700 font-medium">
                  Register as Farmer
                </Link>
                {' or '}
                <Link to="/company-registration" className="text-green-600 hover:text-green-700 font-medium">
                  Register as Company
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
