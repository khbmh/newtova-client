import { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthProvider';

function Navbar() {
  const { user, loading, handleMenuVisible, menuVisible } =
    useContext(AuthContext);
  const nickName = (name) => {
    const firstWord = name.split(' ')[0];

    const formattedFirstWord =
      firstWord.charAt(0).toUpperCase() +
      firstWord.slice(1).toLowerCase() +
      '.';

    return formattedFirstWord;
  };

  return (
    <div className="fixed top-0 backdrop-blur-sm py-2 px-1 flex justify-between items-center w-full">
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
              to="add-item"
            >
              Add item
            </NavLink>
            <NavLink
              onClick={() => {
                handleMenuVisible();
              }}
              to="all-items"
            >
              All items
            </NavLink>
            <NavLink
              onClick={() => {
                handleMenuVisible();
              }}
              to="my/added-items"
            >
              liked items
            </NavLink>
            <NavLink
              onClick={() => {
                handleMenuVisible();
              }}
              to="my/liked-items"
            >
              added items
            </NavLink>
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
                👋🏻 {nickName(user.displayName)}
              </Link>
            )}
          </div>
        </div>

        <div className="hidden lg:flex flex-col lg:flex-row justify-center gap-1 lg:gap-8 *:px-4 *:py-2 *:rounded-lg ">
          <NavLink to="all-items">All items</NavLink>
          <NavLink to="add-item">Add item</NavLink>
          <NavLink to="my/added-items">added items</NavLink>
          <NavLink to="my/liked-items">liked items</NavLink>
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
          <Link to="/my" className="p-1 text-xl text-rose-200">
            {nickName(user.displayName)}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
