import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import THelmet from '../common/THelmet';
import SecTitle from '../common/SecTitle';
import { AuthContext } from '../context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

function MyAdded() {
  const { user } = useContext(AuthContext); // Get user info from context
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products posted by the user
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://newtova-server.vercel.app/products/owner/${user.email}`,
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products. Please try again.');
      }
    };

    if (user?.email) {
      fetchProducts();
    }
  }, [user]);

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `https://newtova-server.vercel.app/products/${productId}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        toast.success('Product deleted successfully!');
        setProducts(products.filter((product) => product._id !== productId)); // Remove product from the list
      } else {
        toast.error('Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="-mt-[12vh] container mx-auto">
      <THelmet title="My Products | Newtova." />
      <SecTitle
        title="My Products"
        description="View and manage all the products you've posted on our platform."
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1f1f20] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-left text-sm font-medium text-white">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">
                Votes
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-white/10">
                <td className="px-6 py-4 text-sm text-white">{product.name}</td>
                <td className="px-6 py-4 text-sm text-white">
                  {product.upVotes || 0}
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'Accepted'
                        ? 'bg-green-500/20 text-green-500'
                        : product.status === 'Rejected'
                        ? 'bg-red-500/20 text-red-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}
                  >
                    {product.status || 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  <button
                    onClick={() => navigate(`/update-product/${product._id}`)}
                    className="mr-2 px-4 py-2 bg-yellow-100 text-black font-bold rounded-md hover:bg-yellow-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
}

export default MyAdded;
