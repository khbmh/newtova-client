import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router'; // Use useParams to get the product ID
import { LuExternalLink } from 'react-icons/lu';
import { BiUpvote } from 'react-icons/bi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

function SingleItem() {
  const { id } = useParams(); // Get the product ID from the URL
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch product data using useQuery
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id], // Unique key for the query
    queryFn: async () => {
      const response = await fetch(
        `https://newtova-server.vercel.app/products/${id}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      return response.json();
    },
  });

  // Mutation for upvoting a product
  const upvoteMutation = useMutation({
    mutationFn: async ({ productId, upVote }) => {
      const response = await fetch(
        `https://newtova-server.vercel.app/products/${productId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ upVote, userEmail: user.email }), // Send upVote and userEmail
        },
      );
      if (!response.ok) {
        throw new Error('Failed to upvote product');
      }
      return response.json();
    },
    onSuccess: () => {
      // Invalidate the product query to refetch data
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });

  // Handle upvote button click
  const handleUpvote = (product) => {
    const upvoters = product.upvoters || [];
    const hasUpVoted = upvoters.includes(user?.email);
    if (!user) {
      toast.error('Please login first');
      return;
    }
    if (hasUpVoted) {
      // Decrement upVotes
      upvoteMutation.mutate({ productId: product._id, upVote: -1 });
    } else {
      // Increment upVotes
      upvoteMutation.mutate({ productId: product._id, upVote: 1 });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product data</div>;

  const upvoters = product.upvoters || [];
  const hasUpVoted = upvoters.includes(user?.email);

  return (
    <div className="text-white min-h-screen p-8">
      {/* Product Header */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        {/* Featured Badge */}
        {product.isFeatured && (
          <div className="flex w-full my-3 justify-end items-center">
            <p className="badge bg-pink-700 text-xs text-white">Featured</p>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Description */}
        <div>
          {/* <h2 className="text-2xl font-semibold mb-2">Description</h2> */}
          <p className="text-gray-500">{product.description}</p>
        </div>

        {/* Owner Info */}
        <div>
          {/* <h2 className="text-2xl font-semibold mb-2">Owner</h2> */}
          <div className="flex items-center space-x-4">
            <img
              src={product.owner.image}
              alt={product.owner.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-lg font-medium capitalize">
                {product.owner.name}
              </p>
              <p className="text-gray-400">{product.owner.email}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          {/* <h2 className="text-2xl font-semibold mb-2">Tags</h2> */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* External Link */}
        <div>
          {/* <h2 className="text-2xl font-semibold mb-2">External Link</h2> */}
          <a
            href={product.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            Visit Website <LuExternalLink />
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Views</p>
            <p className="text-2xl font-bold">{product.views + 237}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Upvotes</p>
            <p className="text-2xl font-bold">{product.upVotes}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Downvotes</p>
            <p className="text-2xl font-bold">{product.downVotes}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Status</p>
            <p className="text-2xl font-bold">{product.status}</p>
          </div>
        </div>

        {/* Upvote Button */}
        <div className="flex justify-end">
          {product.owner.email === user.email ? (
            <div>
              <button
                onClick={() => navigate(`/update-product/${product._id}`)}
                className="mr-2 px-4 py-2 bg-yellow-100 text-black font-bold rounded-md hover:bg-yellow-200"
              >
                Update
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleUpvote(product)}
              className={`flex items-center justify-center p-4 border ${
                hasUpVoted ? 'bg-green-500' : 'bg-transparent'
              } border-white/40 text-md rounded-full`}
            >
              <BiUpvote />
              <span className="p-1">{product.upVotes}</span>
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default SingleItem;
