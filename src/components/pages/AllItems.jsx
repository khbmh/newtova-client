import { useContext, useState } from 'react';
import { useNavigate } from 'react-router'; // Use 'react-router-dom' instead of 'react-router'
import { LuExternalLink } from 'react-icons/lu';
import { BiUpvote } from 'react-icons/bi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthProvider';
import SecTitle from '../common/SecTitle';
import THelmet from '../common/THelmet';
import toast from 'react-hot-toast';

function AllItems() {
  const { user, loading } = useContext(AuthContext);
  // const loading = true;
  if (loading) {
    return <div className="flex items-center justify-center">loading...</div>;
  }
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [upVotedProducts, setUpVotedProducts] = useState(new Set());
  // Fetch products using TanStack Query
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', searchQuery], // Include searchQuery in the query key
    queryFn: async () => {
      const response = await fetch(
        `https://newtova-server.vercel.app/products?search=${searchQuery}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch products');
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
    onSuccess: (data, variables) => {
      const { productId, upVote } = variables;
      // Update the upVotedProducts state
      if (upVote === 1) {
        setUpVotedProducts((prev) => new Set(prev).add(productId));
      } else if (upVote === -1) {
        setUpVotedProducts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }

      // Invalidate the products query to refetch data
      queryClient.invalidateQueries({ queryKey: ['products'] });
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

  // Filter accepted products
  const acceptedProducts = products.filter(
    (product) => product.status === 'Accepted',
  );

  return (
    <div className="-mt-[12vh] container mx-auto">
      <THelmet title="AllProducts. | Newtova." />
      <SecTitle
        title="Explore All Products"
        description="Dive into a vast collection of tech products! From web apps and AI tools to games and mobile apps, find everything you need in one place. Use the search bar to filter by tags, or browse through our curated list. Discover, upvote, and share your favorite innovations."
      />
      <div className="flex flex-col lg:flex-row items-center justify-between px-2 gap-2 lg:px-6 py-2">
        <h2 className="max-w-[80vw] text-lg lg:text-xl font-bold">
          Search Product
        </h2>
        <input
          type="text"
          className="w-[90vw] lg:w-[30vw] px-4 py-2 border border-white/30 rounded-md"
          placeholder="search product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="relative grid grid-cols-1 min-h-[40vh] lg:grid-cols-3 items-center justify-center w-full mx-auto gap-4 p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-[35vh]">
            <p>Loading...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-[35vh]">
            <p>Error fetching products. Please try again.</p>
          </div>
        ) : acceptedProducts.length === 0 ? (
          <div className="absolute flex w-full flex-col gap-3 items-center justify-center h-[35vh]">
            <img
              className="w-[200px] h-[200px] rounded-full opacity-50 grayscale"
              src="https://i.pinimg.com/originals/0d/89/ce/0d89cea578e0cbc7f2f66e79f56a5c4a.gif"
              alt="No products found"
            />
            <p>No products found.</p>
          </div>
        ) : (
          acceptedProducts.map((product) => {
            const upvoters = product.upvoters || [];
            const hasUpVoted = upvoters.includes(user?.email);

            return (
              <div
                key={product._id}
                className="bg-[#1f1f20] hover:bg-transparent hover:border-white/40 border border-transparent flex flex-col p-4 rounded-xl relative h-[350px]"
              >
                <div className="flex items-center justify-between px-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[50px] w-[50px] object-cover rounded-xl"
                  />
                  <a
                    href={product.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-mt-4 -mr-4 p-2 text-white rounded-xl"
                  >
                    <LuExternalLink />
                  </a>
                </div>
                <div className="space-y-6 pb-[90px]">
                  <h3 className="text-xl font-medium my-4">{product.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-pink-900 text-white text-sm px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className={`${
                    user?.email === product?.owner.email && 'hidden'
                  } absolute right-5 bottom-4 space-x-4`}
                >
                  <button
                    onClick={() => handleUpvote(product)}
                    className={`flex items-center justify-center p-4 border ${
                      hasUpVoted ? 'bg-green-500' : 'bg-transparent'
                    } border-white/40 text-md rounded-full`}
                  >
                    <BiUpvote />
                    <span className="p-1">{product.upVotes}</span>
                  </button>
                </div>
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="absolute left-5 bottom-4 bg-white/80 text-black px-4 py-2 rounded-md hover:bg-white"
                >
                  View Details
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AllItems;
