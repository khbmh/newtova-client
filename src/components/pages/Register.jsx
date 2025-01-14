import { Link } from 'react-router';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthProvider';
import THelmet from '../common/THelmet';

function Register() {
  const { signInWithGoogle, handleRegister } = useContext(AuthContext);

  const handleRegisterForm = (e) => {
    e.preventDefault();
    const { userName, imageLink, email, password } = e.target;
    if (password.value.length < 8) {
      toast.error('Password should be at least 8 characters long');
      return;
    }
    handleRegister(
      userName.value,
      imageLink.value,
      email.value,
      password.value,
    );
  };
  return (
    <div className="flex flex-col gap-8 items-center justify-around">
      <THelmet title="Register!" />
      <form onSubmit={handleRegisterForm}>
        <div className="flex flex-col gap-3 px-4">
          <div>
            <span className="p-1">Full Name</span>
            <input
              required
              type="text"
              placeholder="Full Name"
              name="userName"
              className="w-full px-4 py-2 border-2 border-white/40 rounded-lg"
            />
          </div>
          <div>
            <span className="p-1">Your Image url</span>
            <input
              required
              type="text"
              placeholder="your image url .jpg/jpeg"
              name="imageLink"
              className="w-full px-4 py-2 border-2 border-white/40 rounded-lg"
            />
          </div>
          <div>
            <span className="p-1">Email</span>
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              className="w-full px-4 py-2 border-2 border-white/40 rounded-lg"
            />
          </div>
          <div>
            <span className="p-1">Password</span>
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              className="w-full px-4 py-2 border-2 border-white/40 rounded-lg"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className=" px-4 py-2 mt-4 bg-white/20 border border-transparent hover:border-white/20 hover:bg-white/10 text-xl text-white rounded-xl"
          >
            Register
          </button>
        </div>
      </form>
      
      <p className="text-sm">
        Already a user?{' '}
        <Link to="/auth/login" className="underline">
          Login Here
        </Link>
        .
      </p>
      <Toaster />
    </div>
  );
}

export default Register;
