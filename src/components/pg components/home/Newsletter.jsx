import { useState } from 'react';
import toast from 'react-hot-toast';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate a subscription process (no backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      toast.success('Thank you for subscribing!');
    }, 1500); // Simulate a 1.5-second delay
  };

  return (
    <div className="bg-[#1f1f20] p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-white mb-4">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-gray-400 mb-6">
        Get the latest updates, news, and exclusive offers delivered straight to
        your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full lg:w-96 px-4 py-2 border border-white/30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className=" w-full lg:w-96 px-6 py-2 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}

export default Newsletter;