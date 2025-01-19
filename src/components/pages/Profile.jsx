import { Link } from 'react-router';
import THelmet from '../common/THelmet';
import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';

function Profile() {
  const { role } = useContext(DataContext);
  // const { isAdmin, isModerator } = useContext(DataContext);
  return (
    <div className="mx-auto max-w-xl gap-8 lg:gap-16 flex flex-col justify-around *:btn *:btn-outline items-center">
      <THelmet title="Profile. | Newtova." />
      <Link to="/my/added-products">Dashboard</Link>
      {/* <Link to="liked-items">My LikedProducts</Link> */}
      {(role == 'admin' || role == 'moderator') && (
        <Link to="/moderator">Moderator Dashboard</Link>
      )}

      {role == 'admin' && <Link to="/Admin">Admin Dashboard</Link>}
    </div>
  );
}

export default Profile;
