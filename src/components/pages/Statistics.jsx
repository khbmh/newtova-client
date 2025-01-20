import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { PieChart, Pie, Cell, Legend } from 'recharts';

function Statistics() {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [rejectedProducts, setRejectedProducts] = useState(0);
  const [acceptedProducts, setAcceptedProducts] = useState(0);
  const [pendingProducts, setPendingProducts] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState(0);
  const data = [
    { name: 'Total Products', value: products.length },
    { name: 'Pending Products', value: pendingProducts },
    { name: 'Accepted Products', value: acceptedProducts },
    { name: 'Featured Products', value: featuredProducts },
    { name: 'Rejected Products', value: rejectedProducts },
  ];

  const COLORS = ['#005BB5', '#0aaA61', '#5f5A60', '#Ce6D3D', '#0ffB47'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  // Fetch statistics from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://newtova-server.vercel.app/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        toast.error('Failed to fetch statistics. Please try again.');
      }
    };

    fetchUsers();
  }, []);

  // Fetch statistics from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://newtova-server.vercel.app/products');
        const data = await response.json();
        setProducts(data);
        setPendingProducts(data.filter((p) => p.status === 'pending').length);
        setRejectedProducts(data.filter((p) => p.status === 'Rejected').length);
        setAcceptedProducts(data.filter((p) => p.status === 'Accepted').length);
        setFeaturedProducts(data.filter((p) => p.isFeatured === true).length);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        toast.error('Failed to fetch statistics. Please try again.');
      }
    };

    fetchProducts();
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
          <p className="text-3xl font-bold text-yellow-100">{users.length}</p>
        </div>

        {/* Total Products Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Total Products</h3>
          <p className="text-3xl font-bold text-yellow-100">
            {products.length}
          </p>
        </div>

        {/* Featured Products Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Featured Products
          </h3>
          <p className="text-3xl font-bold text-yellow-100">
            {featuredProducts}
          </p>
        </div>

        {/* Pending Products Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Pending Products</h3>
          <p className="text-3xl font-bold text-yellow-100">
            {pendingProducts}
          </p>
        </div>

        {/* Accepted Products Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Accepted Products
          </h3>
          <p className="text-3xl font-bold text-yellow-100">
            {acceptedProducts}
          </p>
        </div>

        {/* Rejected Products Card */}
        <div className="bg-[#1f1f20] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Rejected Products
          </h3>
          <p className="text-3xl font-bold text-yellow-100">
            {rejectedProducts}
          </p>
        </div>
      </div>

      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
      <Toaster />
    </div>
  );
}

export default Statistics;
