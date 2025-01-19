import { Link, useNavigate } from 'react-router'; // Fix: Use 'react-router-dom'
import SecTitle from '../../common/SecTitle';
import { LuExternalLink } from 'react-icons/lu';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

function Trending() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [upVotedProducts, setUpVotedProducts] = useState(new Set()); // Track upVoted products

  // Fetch products using TanStack Query
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(
        'https://newtova-server.vercel.app/products',
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

  const handleUpvote = (product) => {
    // Ensure upvoters array exists
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
  if (isError) return <div>Error fetching products</div>;

  // Sort products by upVotes in descending order and take the top 6
  const trendingProducts = products
    .sort((a, b) => b.upVotes - a.upVotes)
    .slice(0, 6);

  return (
    <div>
      <SecTitle
        title="Trending Products"
        description="See what the community is loving right now! These are the most upVoted and talked-about tech products. Dive into the trends and find tools that are making waves. Don’t forget to upvote your favorites!"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center w-full mx-auto gap-4 p-4">
        {trendingProducts
          .filter((product) => product.status === 'Accepted')
          .map((product) => {
            // Ensure upvoters array exists
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
                  <button className="hidden items-center justify-center p-4 border border-white/40 text-md rounded-full">
                    <BiDownvote />
                    <span className="p-1">{product.downVotes}</span>
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
          })}
      </div>
      <Link to="/all-products">
        <button className="button my-8">Browse All Products</button>
      </Link>
      <Toaster/>
    </div>
  );
}

export default Trending;
