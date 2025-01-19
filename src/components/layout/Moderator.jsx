import { Link, Outlet } from 'react-router';

function Moderator() {
  return (
    <div className="flex justify-between min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#1f1f20] p-4">
        <h2 className="text-xl font-bold text-white mb-6">
          Moderator Dashboard
        </h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/moderator/product-review"
                className="block p-2 text-white hover:bg-gray-700 rounded-md"
              >
                Product Review Queue
              </Link>
            </li>
            <li>
              <Link
                to="/moderator/reported-contents"
                className="block p-2 text-white hover:bg-gray-700 rounded-md"
              >
                Reported Contents
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-900">
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
}

export default Moderator;
