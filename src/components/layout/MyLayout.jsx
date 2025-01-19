import { useContext } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { DataContext } from '../context/DataProvider';
import { MdOutlineVerified } from 'react-icons/md';

function MyLayout() {
  const location = useLocation();
  const { user, handleSingOut } = useContext(AuthContext);
  const { userData } = useContext(DataContext);
  // console.log(userData);

  const accountCreationTime = user?.metadata.creationTime;

  const createTime = (accountCreationTime) => {
    const date = new Date(accountCreationTime);
    date.setHours(date.getHours());
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    let ampm = 'AM';

    if (hours >= 12) {
      ampm = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    } else if (hours === 0) {
      hours = 12;
    }

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    const formattedDate = `${day} ${month} ${year} at ${formattedTime}`;
    return formattedDate;
  };

  const formattedAccountCreationDate = createTime(accountCreationTime);

  if (!user) return <div>loading...</div>;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center gap-6 my-10">
        <div className="relative">
          <img
            src={user?.photoURL}
            alt={`${user?.displayName}'s broken Photo`}
            className="w-[100px] h-[100px] rounded-badge object-cover border border-white/50"
          />
          {userData?.membership === 'premium' && (
            <p className="absolute font-black text-white -right-1 -top-1 bg-black p-1 rounded-full">
              <MdOutlineVerified />
            </p>
          )}
        </div>
        <h1 className="-mt-4 font-semibold text-4xl">{user?.displayName}</h1>
        {location.pathname === '/my' && (
          <>
            <h5 className="-mt-4 text-base opacity-60">{user?.email}</h5>
            <h5 className="-mt-4 text-base opacity-60">
              Joined On {formattedAccountCreationDate}
            </h5>
            {userData?.membership === 'free' && (
              <div className="space-y-4 font-black text-white">
                <button className="button">Subscribe</button>
                <p className="text-slate-400">
                  You are a free user! <br /> A free user can add only one
                  product.
                </p>
              </div>
            )}
          </>
        )}
        {location.pathname === '/my' && (
          <button
            onClick={handleSingOut}
            className="btn text-xs font-thin bg-transparent hover:bg-transparent hover:border-none"
          >
            Logout
          </button>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default MyLayout;
