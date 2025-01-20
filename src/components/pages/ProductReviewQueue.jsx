import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router'; // Fixed import

function ProductReviewQueue() {
  const queryClient = useQueryClient();

  // Fetch products for review
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(
        'https://newtova-server.vercel.app/products?reviewQueue=true',
      );
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      // Validate data
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }
      // Sort products: Pending first, then Accepted, then Rejected
      return data.sort((a, b) => {
        if (a.status === 'Pending') return -1;
        if (b.status === 'Pending') return 1;
        if (a.status === 'Accepted') return -1;
        if (b.status === 'Accepted') return 1;
        return 0;
      });
    },
  });

  // Mutation to update product status
  const updateProductStatusMutation = useMutation({
    mutationFn: async ({ productId, status }) => {
      const response = await fetch(
        `https://newtova-server.vercel.app/products/${productId}/status`, // Updated endpoint
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }), // Send only the status
        },
      );
      if (!response.ok) {
        throw new Error('Failed to update product status');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Product status updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Mutation Error:', error);
      toast.error('Failed to update product status. Please try again.');
    },
  });

  // Mutation to mark product as featured
  const markAsFeaturedMutation = useMutation({
    mutationFn: async (productId) => {
      const response = await fetch(
        `https://newtova-server.vercel.app/products/${productId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isFeatured: true }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to mark product as featured');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Product marked as featured!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Mutation Error:', error);
      toast.error('Failed to mark product as featured. Please try again.');
    },
  });

  // Mutation to remove product from featured
  const removeFeaturedMutation = useMutation({
    mutationFn: async (productId) => {
      const response = await fetch(
        `https://newtova-server.vercel.app/products/${productId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isFeatured: false }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to remove product from featured');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Product removed from featured!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Mutation Error:', error);
      toast.error('Failed to remove product from featured. Please try again.');
    },
  });

  if (isLoading) return <div className="text-white">Loading products...</div>;
  if (isError)
    return (
      <div className="text-red-500">
        Error fetching products. Please try again later.
      </div>
    );

  return (
    <div className="w-screen p-0 mx-auto max-w-[900px]">
      <h2 className="text-2xl font-bold text-white mb-6">
        Product Review Queue
      </h2>
      <table className="min-w-full bg-[#1f1f20] rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-2 lg:px-6 py-3 text-lg font-medium text-white">
              Product Name
            </th>
            <th className="px-2 lg:px-6 py-3 text-lg font-medium text-white">Status</th>
            <th className="px-2 lg:px-6 py-3 text-lg font-medium text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b border-white/10">
              <td className="px-2 lg:px-6 py-4 text-xs text-white">{product.name}</td>
              <td className="px-2 lg:px-6 py-4 text-xs text-white">
                {product.status}
              </td>
              <td className="px-2 lg:px-6 py-4 space-y-4 text-xs text-white space-x-2">
                <Link
                  to={`/product/${product._id}`}
                  className="px-4 py-2 bg-slate-700 text-white font-bold rounded-md hover:bg-blue-600"
                >
                  View Details
                </Link>
                {product.isFeatured ? (
                  <button
                    onClick={() => removeFeaturedMutation.mutate(product._id)}
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                  >
                    Remove Featured
                  </button>
                ) : (
                  <button
                    onClick={() => markAsFeaturedMutation.mutate(product._id)}
                    className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600"
                  >
                    Make Featured
                  </button>
                )}
                <button
                  onClick={() =>
                    updateProductStatusMutation.mutate({
                      productId: product._id,
                      status: 'Accepted',
                    })
                  }
                  className={`${
                    product.status === 'Accepted' && 'hidden'
                  } px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600`}
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    updateProductStatusMutation.mutate({
                      productId: product._id,
                      status: 'Rejected',
                    })
                  }
                  className={`${
                    product.status === 'Rejected' && 'hidden'
                  } px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600`}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
}

export default ProductReviewQueue;
