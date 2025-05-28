
import { useState } from 'react';
import { Leaf, User, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const FarmerListings = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Corn Stover',
      quantity: '500 kg',
      price: '$150',
      dateOfCollection: '2024-07-15',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Wheat Straw',
      quantity: '300 kg',
      price: '$100',
      dateOfCollection: '2024-07-10',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Rice Husks',
      quantity: '400 kg',
      price: '$120',
      dateOfCollection: '2024-07-05',
      status: 'Sold'
    },
    {
      id: 4,
      name: 'Soybean Hulls',
      quantity: '250 kg',
      price: '$80',
      dateOfCollection: '2024-06-30',
      status: 'Available'
    },
    {
      id: 5,
      name: 'Cotton Gin Trash',
      quantity: '350 kg',
      price: '$110',
      dateOfCollection: '2024-06-25',
      status: 'Reserved'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">AgriVal</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">About</Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">Services</Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">Contact</Link>
              <div className="flex items-center space-x-2">
                <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farmer Listings</h1>
            <p className="text-gray-600 mt-2">
              Explore the latest agricultural waste products available from our network of farmers.
            </p>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Available Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date of Collection</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.dateOfCollection}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          product.status === 'Available' ? 'default' : 
                          product.status === 'Sold' ? 'secondary' : 
                          'outline'
                        }
                        className={
                          product.status === 'Available' ? 'bg-green-100 text-green-800' :
                          product.status === 'Sold' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
              ©2024 AgriVal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FarmerListings;
