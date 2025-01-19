import { Outlet } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import ScrollSave from '../utils/ScrollSave';

function MainLayout() {
  const { menuVisible, setIsShow } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="w-full h-[10vh]"></div>

      <div
        onClick={() => {
          setIsShow(false);
        }}
        className={`${
          menuVisible ? 'invisible' : ''
        } container mx-auto flex items-center justify-center min-h-[50vh] text-center`}
      >
        <ScrollSave />
        <Outlet />
      </div>

      <div className={`${menuVisible ? 'invisible' : ''} w-full h-fit`}>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
