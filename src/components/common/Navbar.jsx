import { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthProvider';

function Navbar() {
  const {
    user,
    loading,
    handleMenuVisible,
    menuVisible,
    handleSingOut,
    handleShowHide,
    isShow,
  } = useContext(AuthContext);

  const logoutHide = () => {
    handleShowHide();
    handleSingOut();
  };

  return (
    <div className="fixed z-40 top-0 backdrop-blur-sm py-2 px-1 flex justify-between items-center w-full">
      <div className=" lg:w-[20vw]">
        <Link to="/">
          <h1 className="font-black text-2xl">Newtova.</h1>
        </Link>
      </div>
      <div className="flex justify-end lg:justify-center w-[60vw]">
        <p
          onClick={handleMenuVisible}
          className="lg:hidden cursor-pointer justify-end p-1"
        >
          Menu
        </p>
        <div
          className={`${
            menuVisible ? 'active' : ''
          }  left-0 h-screen miniNav w-screen absolute bg-black lg:hidden flex-col items-center justify-around gap-6 z-30`}
        >
          <div className="flex gap-3 flex-col items-center text-2xl justify-around *:mx-2 *:px-2 *:py-2 *:rounded-lg">
            <NavLink
              onClick={() => {
                handleMenuVisible();
              }}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              onClick={() => {
                handleMenuVisible();
              }}
              to="add-product"
            >
              Add Product
            </NavLink>
            <NavLink
              onClick={() => {
                handleMenuVisible();
              }}
              to="all-products"
            >
              All Products
            </NavLink>
            <NavLink
              onClick={() => {
                handleMenuVisible();
              }}
              to="my/added-products"
            >
              My Products
            </NavLink>
            {/* <NavLink
              onClick={() => {
                handleMenuVisible();
              }}
              to="my/liked-items"
            >
              Liked Products
            </NavLink> */}
          </div>

          <div className="-mt-[110px] pb-12">
            <button
              onClick={() => {
                handleMenuVisible();
              }}
              className="text-8xl opacity-40 font-black miniNavBtn"
            >
              ✕
            </button>
          </div>

          <div className="">
            {loading ? (
              <div>...</div>
            ) : !user ? (
              <Link
                onClick={() => {
                  handleMenuVisible();
                }}
                to="auth/login"
              >
                <button className="px-4 py-2 mt-4 bg-white/20 border border-transparent hover:border-white/20 hover:bg-white/10 text-xl text-white rounded-xl">
                  Login
                </button>
              </Link>
            ) : (
              <Link
                onClick={() => {
                  handleMenuVisible();
                }}
                to="/my"
                className="p-1 bg-white/10 text-xl text-rose-200"
              >
                👋🏻 {user.displayName}
              </Link>
            )}
          </div>
        </div>

        <div className="hidden lg:flex flex-col lg:flex-row justify-center gap-1 lg:gap-8 *:px-4 *:py-2 *:rounded-lg ">
          <NavLink to="all-products">All Products</NavLink>
          <NavLink to="add-product">Add Product</NavLink>
          <NavLink to="my/added-products">My Products</NavLink>
          {/* <NavLink to="my/liked-items">likedProducts</NavLink> */}
        </div>
      </div>
      <div className="hidden lg:flex justify-end w-[20vw]">
        {loading ? (
          <div>...</div>
        ) : !user ? (
          <Link to="auth/login">
            <button className="btn btn-ghost border-white/30">login</button>
          </Link>
        ) : (
          <div className="relative">
            <img
              onClick={handleShowHide}
              className="w-[40px] h-[40px] border border-yellow-300/50 rounded-full mx-1 cursor-pointer"
              src={user.photoURL}
              alt=""
            />
            <div
              className={` ${
                isShow ? 'visible' : 'invisible'
              } absolute bg-[#121111] border border-slate-700/50 w-[200px] rounded-lg mt-2 px-4 py-2 right-0`}
            >
              <div className="flex flex-col gap-4">
                <p className="text-xl font-bold text-yellow-100">
                  👋🏻 {user.displayName}
                </p>
                <Link
                  onClick={handleShowHide}
                  to="/my"
                  className="text-lg px-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logoutHide}
                  className="btn btn-ghost border-white/30"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* <Link to="/my" className="invisible p-1 text-xl text-rose-200">
              {nickName(user.displayName)}
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
