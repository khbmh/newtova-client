import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Statistics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    featuredProducts: 0,
    pendingProducts: 0,
    acceptedProducts: 0,
    rejectedProducts: 0,
  });

  // Fetch statistics from the backend
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(
          'https://your-api-endpoint.com/statistics',
        );
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        toast.error('Failed to fetch statistics. Please try again.');
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        Platform Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Total Users</h3>
          <p className="text-3xl font-bold text-yellow-100">
            {stats.totalUsers}
          </p>
        </div>

        {/* Total Products Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Total Products</h3>
          <p className="text-3xl font-bold text-yellow-100">
            {stats.totalProducts}
          </p>
        </div>

        {/* Featured Products Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Featured Products
          </h3>
          <p className="text-3xl font-bold text-yellow-100">
            {stats.featuredProducts}
          </p>
        </div>

        {/* Pending Products Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Pending Products</h3>
          <p className="text-3xl font-bold text-yellow-100">
            {stats.pendingProducts}
          </p>
        </div>

        {/* Accepted Products Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Accepted Products
          </h3>
          <p className="text-3xl font-bold text-yellow-100">
            {stats.acceptedProducts}
          </p>
        </div>

        {/* Rejected Products Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Rejected Products
          </h3>
          <p className="text-3xl font-bold text-yellow-100">
            {stats.rejectedProducts}
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Statistics;
