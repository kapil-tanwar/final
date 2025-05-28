import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include the token in the Authorization header
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.ok) {
        // Clear the token and user info from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Show success message
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account.",
        });

        // Redirect to home page
        navigate('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      onClick={handleLogout}
      variant="ghost"
      className="text-gray-700 hover:text-red-600 hover:bg-red-50"
    >
      Logout
    </Button>
  );
};

export default LogoutButton; 