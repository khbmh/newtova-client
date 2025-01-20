import { NavLink, Outlet } from 'react-router';

function Moderator() {
  return (
    <div className="flex flex-col justify-between min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <div className="mx-auto bg-[#1f1f20] p-4 w-screen">
        <h2 className="text-3xl font-sans font-bold text-white mb-6">
          Moderator Dashboard
        </h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/moderator/product-review"
                className="block p-2 text-white hover:bg-gray-700 rounded-md"
              >
                Product Review Queue
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/moderator/reported-contents"
                className="block p-2 text-white hover:bg-gray-700 rounded-md"
              >
                Reported Contents
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-4 lg:px-8 w-screen overflow-x-hidden">
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
}

export default Moderator;
