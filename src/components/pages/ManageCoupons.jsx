import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function ManageCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    validUntil: '',
  });

  // Fetch all coupons
  // useEffect(() => {
  //   const fetchCoupons = async () => {
  //     try {
  //       const response = await fetch('https://your-api-endpoint.com/coupons');
  //       const data = await response.json();
  //       setCoupons(data);
  //     } catch (error) {
  //       console.error('Error fetching coupons:', error);
  //       toast.error('Failed to fetch coupons. Please try again.');
  //     }
  //   };

  //   fetchCoupons();
  // }, []);

  // Handle input change for new coupon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon({ ...newCoupon, [name]: value });
  };

  // Handle create new coupon
  const handleCreateCoupon = async () => {
    if (!newCoupon.code || !newCoupon.discount || !newCoupon.validUntil) {
      toast.error('Please fill all fields.');
      return;
    }

    // try {
    //   const response = await fetch('https://your-api-endpoint.com/coupons', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newCoupon),
    //   });

    //   if (response.ok) {
    //     toast.success('Coupon created successfully!');
    //     const data = await response.json();
    //     setCoupons([...coupons, data]);
    //     setNewCoupon({ code: '', discount: '', validUntil: '' }); // Reset form
    //   } else {
    //     toast.error('Failed to create coupon. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   toast.error('An error occurred. Please try again.');
    // }
  };

  // Handle delete coupon
  const handleDeleteCoupon = async (couponId) => {
    try {
      const response = await fetch(
        `https://your-api-endpoint.com/coupons/${couponId}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        toast.success('Coupon deleted successfully!');
        setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
      } else {
        toast.error('Failed to delete coupon. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full h-[40vh] ">nothing is here</div>
    // <div>
    //   <h2 className="text-2xl font-bold text-white mb-6">Manage Coupons</h2>

    //   {/* Create New Coupon Form */}
    //   <div className="bg-[#1f1f20] p-6 rounded-lg mb-6">
    //     <h3 className="text-lg font-semibold text-white mb-4">
    //       Create New Coupon
    //     </h3>
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //       <input
    //         type="text"
    //         name="code"
    //         value={newCoupon.code}
    //         onChange={handleInputChange}
    //         placeholder="Coupon Code"
    //         className="px-4 py-2 border border-white/30 rounded-md bg-transparent text-white"
    //       />
    //       <input
    //         type="number"
    //         name="discount"
    //         value={newCoupon.discount}
    //         onChange={handleInputChange}
    //         placeholder="Discount (%)"
    //         className="px-4 py-2 border border-white/30 rounded-md bg-transparent text-white"
    //       />
    //       <input
    //         type="date"
    //         name="validUntil"
    //         value={newCoupon.validUntil}
    //         onChange={handleInputChange}
    //         className="px-4 py-2 border border-white/30 rounded-md bg-transparent text-white"
    //       />
    //     </div>
    //     <button
    //       onClick={handleCreateCoupon}
    //       className="mt-4 px-4 py-2 bg-yellow-100 text-black font-bold rounded-md hover:bg-yellow-200"
    //     >
    //       Create Coupon
    //     </button>
    //   </div>

    //   {/* Coupons Table */}
    //   <table className="min-w-full bg-[#1f1f20] rounded-lg overflow-hidden">
    //     <thead>
    //       <tr className="bg-gray-800">
    //         <th className="px-6 py-3 text-left text-sm font-medium text-white">
    //           Coupon Code
    //         </th>
    //         <th className="px-6 py-3 text-left text-sm font-medium text-white">
    //           Discount (%)
    //         </th>
    //         <th className="px-6 py-3 text-left text-sm font-medium text-white">
    //           Valid Until
    //         </th>
    //         <th className="px-6 py-3 text-left text-sm font-medium text-white">
    //           Actions
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {coupons.map((coupon) => (
    //         <tr key={coupon._id} className="border-b border-white/10">
    //           <td className="px-6 py-4 text-sm text-white">{coupon.code}</td>
    //           <td className="px-6 py-4 text-sm text-white">
    //             {coupon.discount}
    //           </td>
    //           <td className="px-6 py-4 text-sm text-white">
    //             {new Date(coupon.validUntil).toLocaleDateString()}
    //           </td>
    //           <td className="px-6 py-4 text-sm text-white">
    //             <button
    //               onClick={() => handleDeleteCoupon(coupon._id)}
    //               className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
    //             >
    //               Delete
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <Toaster />
    // </div>
  );
}

export default ManageCoupons;
