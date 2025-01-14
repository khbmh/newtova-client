import { Link } from 'react-router';

function Profile() {
  return (
    <div className="mx-auto max-w-xl gap-8 lg:gap-16 flex flex-col lg:flex-row justify-around *:btn *:btn-outline items-center">
      <button>
        <Link to="added-items">My Added Items</Link>
      </button>
      <button>
        <Link to="liked-items">My Liked Items</Link>
      </button>
    </div>
  );
}

export default Profile;
