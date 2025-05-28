import { useState, useEffect } from 'react';
import { Leaf, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const FarmerStockManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    quantity: '',
    unit: 'kg',
    price: '',
    category: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/products/my-products', {
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

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          quantity: parseFloat(newProduct.quantity),
          unit: newProduct.unit,
          price: parseFloat(newProduct.price),
          category: newProduct.category
        })
      });

      const data = await response.json();

      if (response.ok) {
        setProducts([...products, data.product]);
        setNewProduct({
          name: '',
          description: '',
          quantity: '',
          unit: 'kg',
          price: '',
          category: ''
        });
        toast({
          title: "Success",
          description: "Product added successfully",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || 'Failed to add product',
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAdding(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(products.filter(p => p._id !== id));
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || 'Failed to delete product',
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateProductStatus = async (id: string, newStatus: 'available' | 'sold_out') => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/products/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(products.map(p => 
          p._id === id ? { ...p, status: newStatus } : p
        ));
        toast({
          title: "Success",
          description: "Product status updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || 'Failed to update product status',
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    }
  };

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
              <span className="text-gray-700">Welcome, Farmer</span>
              <Button variant="outline" asChild>
                <Link to="/">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Management</h1>
          <p className="text-gray-600">Manage your agricultural waste products</p>
        </div>

        {/* Add New Product */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add New Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <Input
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    placeholder="Enter product category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                    required
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Unit</label>
                  <Select
                    value={newProduct.unit}
                    onValueChange={(value) => setNewProduct({...newProduct, unit: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="ton">Tons</SelectItem>
                      <SelectItem value="piece">Pieces</SelectItem>
                      <SelectItem value="box">Boxes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price per Unit</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    required
                    min="0"
                  />
                </div>
                <div className="space-y-2 flex items-end">
                  <Button 
                    type="submit" 
                    className="w-full bg-green-500 hover:bg-green-600"
                    disabled={isAdding}
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Product'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Products List */}
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product._id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <Badge variant={product.status === 'available' ? 'default' : 'secondary'}>
                        {product.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <span className="ml-2 font-medium">{product.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Quantity:</span>
                        <span className="ml-2 font-medium">{product.quantity} {product.unit}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <span className="ml-2 font-medium text-green-600">₹{product.price}/{product.unit}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Value:</span>
                        <span className="ml-2 font-medium">₹{product.quantity * product.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateProductStatus(
                        product._id, 
                        product.status === 'available' ? 'sold_out' : 'available'
                      )}
                    >
                      {product.status === 'available' ? 'Mark as Sold' : 'Mark as Available'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerStockManagement;
