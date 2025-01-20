import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router';

function ReportedContents() {
  const [reportedProducts, setReportedProducts] = useState([]);

  // Fetch reported products
  // useEffect(() => {
  //   const fetchReportedProducts = async () => {
  //     try {
  //       const response = await fetch('https://newtova-server.vercel.app/products/reported');
  //       const data = await response.json();
  //       setReportedProducts(data);
  //     } catch (error) {
  //       console.error('Error fetching reported products:', error);
  //       toast.error('Failed to fetch reported products. Please try again.');
  //     }
  //   };

  //   fetchReportedProducts();
  // }, []);

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
        setReportedProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId),
        );
      } else {
        toast.error('Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full h-[40vh] ">nothing is here</div>

    // <div>
    //   <h2 className="text-2xl font-bold text-white mb-6">Reported Contents</h2>
    //   <table className="min-w-full bg-[#1f1f20] rounded-lg overflow-hidden">
    //     <thead>
    //       <tr className="bg-gray-800">
    //         <th className="px-6 py-3 text-left text-sm font-medium text-white">
    //           Product Name
    //         </th>
    //         <th className="px-6 py-3 text-left text-sm font-medium text-white">
    //           Actions
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {reportedProducts.map((product) => (
    //         <tr key={product._id} className="border-b border-white/10">
    //           <td className="px-6 py-4 text-sm text-white">{product.name}</td>
    //           <td className="px-6 py-4 text-sm text-white space-x-2">
    //             <Link
    //               to={`/product/${product._id}`}
    //               className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
    //             >
    //               View Details
    //             </Link>
    //             <button
    //               onClick={() => handleDelete(product._id)}
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

export default ReportedContents;
