import { useState, useEffect } from 'react';
import { Leaf, ShoppingCart, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  farmer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: string;
  createdAt: string;
}

const CompanyBuyProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'company') {
      toast({
        title: "Authentication Required",
        description: "Please login as a company to access this page",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    fetchProducts();
  }, [navigate, toast]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/products/available', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setProducts(data.products);
      } else {
        setError(data.message || 'Failed to fetch products');
        toast({
          title: "Error",
          description: data.message || 'Failed to fetch products',
          variant: "destructive"
        });
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      toast({
        title: "Error",
        description: "Network error. Please check your connection.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (productId: string) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
      toast({
        title: "Added to Cart",
        description: "Product has been added to your cart",
      });
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(id => id !== productId));
    toast({
      title: "Removed from Cart",
      description: "Product has been removed from your cart",
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartTotal = cart.reduce((total, productId) => {
    const product = products.find(p => p._id === productId);
    return total + (product ? product.price * product.quantity : 0);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2 text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchProducts}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">AgriLoop</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs">
                  {cart.length}
                </span>
              </div>
              <span className="text-gray-700">Welcome, {localStorage.getItem('userName') || 'Company'}</span>
              <Button 
                variant="outline" 
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('userType');
                  localStorage.removeItem('userName');
                  navigate('/login');
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy Agricultural Products</h1>
          <p className="text-gray-600">Browse and purchase sustainable agricultural waste materials</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search products, farmers, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription>
                      by {product.farmer.name} • {product.farmer.address}
                    </CardDescription>
                  </div>
                  <Badge variant={product.status === 'available' ? 'default' : 'secondary'}>
                    {product.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <span className="ml-2 font-medium">{product.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Unit:</span>
                      <span className="ml-2 font-medium">{product.unit}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Quantity:</span>
                      <span className="ml-2 font-medium">{product.quantity} {product.unit}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Price:</span>
                      <span className="ml-2 font-medium text-green-600">₹{product.price}/{product.unit}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-2">
                    <span>Total Value:</span>
                    <span>₹{product.quantity * product.price}</span>
                  </div>
                  
                  {cart.includes(product._id) ? (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => removeFromCart(product._id)}
                    >
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600"
                      onClick={() => addToCart(product._id)}
                      disabled={product.status !== 'available'}
                    >
                      {product.status === 'available' ? 'Add to Cart' : 'Not Available'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Card className="mt-8 sticky bottom-4">
            <CardHeader>
              <CardTitle>Cart Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cart.map(productId => {
                  const product = products.find(p => p._id === productId);
                  return product ? (
                    <div key={productId} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{product.name}</span>
                        <span className="text-sm text-gray-600 ml-2">
                          ({product.quantity} {product.unit})
                        </span>
                      </div>
                      <span>₹{product.quantity * product.price}</span>
                    </div>
                  ) : null;
                })}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyBuyProduct;
