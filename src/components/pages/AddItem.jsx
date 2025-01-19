import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { WithContext as ReactTags } from 'react-tag-input';
import toast, { Toaster } from 'react-hot-toast';
import THelmet from '../common/THelmet';
import SecTitle from '../common/SecTitle';
import { AuthContext } from '../context/AuthProvider';

function AddProduct() {
  const { user } = useContext(AuthContext); // Get user info from context
  const navigate = useNavigate();

  // State for form fields
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [externalLink, setExternalLink] = useState('');

  // Handle tag input
  const handleTagAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleTagDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!productName || !productImage || !description) {
      toast.error('Please fill all required fields.');
      return;
    }

    // Prepare product data
    const productData = {
      name: productName,
      image: productImage,
      description,
      owner: {
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
      },
      tags: tags.map((tag) => tag.text),
      externalLink,
      timestamp: new Date(), // Save current timestamp
      status: 'pending',
      isReported: false,
      isFeatured: false,
      views: 0,
      upVotes: 0,
      downVotes: 0,
      comments: [],
      reports: [],
    };
    // console.log(productData);

    try {
      // Save product to MongoDB (replace with your API endpoint)
      const response = await fetch('https://newtova-server.vercel.app/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        toast.success('Product added successfully!');

        // Clear form fields
        setProductName('');
        setProductImage('');
        setDescription('');
        setTags([]);
        setExternalLink('');

        navigate('/my/added-items'); // Redirect to My Products page
      } else {
        toast.error('Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="-mt-[12vh] container mx-auto">
      <THelmet title="Add Product | Newtova." />
      <SecTitle
        title="Add Your Product"
        description="Share your tech product with the world! Fill out the form below to add your product to our platform."
      />
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Name *
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-4 py-2 border border-white/30 rounded-md"
            required
          />
        </div>

        {/* Product Image */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Image URL *
          </label>
          <input
            type="url"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            className="w-full px-4 py-2 border border-white/30 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-white/30 rounded-md"
            rows="4"
            required
          />
        </div>

        {/* Tags Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <ReactTags
            tags={tags}
            handleAddition={handleTagAddition}
            handleDelete={handleTagDelete}
            placeholder="Add tags..."
            inputFieldPosition="bottom"
            autocomplete
            classNames={{
              tags: 'w-full',
              tagInput: 'w-full px-4 py-2',
              tag: 'bg-gray-700 text-white px-2 py-1 rounded-md mr-2 mb-2',
              remove: 'ml-2 cursor-pointer',
              suggestions: 'bg-gray-800 border border-white/30 rounded-md mt-2',
            }}
          />
          <p className="text-xs text-gray-500 my-1">
            hit <kbd className="kbd kbd-xs">Enter</kbd> to add tag.
          </p>
        </div>

        {/* External Link */}
        <div>
          <label className="block text-sm font-medium mb-2">
            External Link
          </label>
          <input
            type="url"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            className="w-full px-4 py-2 border border-white/30 rounded-md"
          />
        </div>

        {/* Product Owner Info (Disabled Fields) */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Owner Info
          </label>
          <input
            type="text"
            value={user?.displayName || ''}
            disabled
            className="w-full px-4 py-2 rounded-md bg-[#121212]"
          />
          <input
            type="text"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-2 rounded-md bg-[#121212] mt-2"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="button text-xl font-bold">
          Submit
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default AddProduct;
