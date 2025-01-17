import { Link } from 'react-router';
import SecTitle from '../../common/SecTitle';
import { LuExternalLink } from 'react-icons/lu';

function Featured() {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      image:
        'https://cdn-icons-png.freepik.com/256/5977/5977575.png?semt=ais_hybrid',
      price: 100,
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Product 2',
      image:
        'https://brandlogos.net/wp-content/uploads/2023/09/duolingo_icon-logo_brandlogos.net_aru6q.png',
      price: 200,
      category: 'Clothing',
    },
    {
      id: 3,
      name: 'Product 3',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcP0ZcWRME2hXax1sPPgNtutzs7H0ZQv2vw&s',
      price: 300,
      category: 'Home & Garden',
    },
    {
      id: 4,
      name: 'Product 4',
      image:
        'https://brandlogos.net/wp-content/uploads/2023/09/duolingo_icon-logo_brandlogos.net_aru6q.png',
      price: 400,
      category: 'Books',
    },
  ];
  return (
    <div className="-mt-[8vh]">
      <SecTitle
        title="Featured Products"
        description="Discover the latest and greatest tech innovations! Our featured products are handpicked to showcase cutting-edge tools, apps, and software. Explore what’s new and be the first to upvote your favorites."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-full mx-auto gap-4 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#131312] hover:bg-transparent hover:border-yellow-200 border border-yellow-200/40 flex flex-col p-4 rounded-xl"
          >
            <div className="flex items-center justify-between px-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-[50px] w-[50px] object-cover rounded-xl"
              />
              <Link className="-mt-4 -mr-4 p-2 text-white rounded-xl">
                <LuExternalLink />
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium mt-2">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="text-gray-500 text-sm">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featured;
