import { Link } from 'react-router';
import { useContext } from 'react';
import THelmet from '../common/THelmet';
import { AuthContext } from '../context/AuthProvider';

function Login() {
  const { signInWithGoogle, handleLogin } = useContext(AuthContext);

  const handleLoginForm = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    handleLogin(email.value, password.value);
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-around">
      <THelmet title="Login!" />

      <form onSubmit={handleLoginForm}>
        <div className="flex flex-col gap-3 px-4">
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
            Login
          </button>
        </div>
      </form>
      <div className="divider -my-3">OR</div>
      <div
        onClick={signInWithGoogle}
        className="text-lg px-4 py-2 bg-white/10 rounded-full"
      >
        <button className="flex items-center gap-2">
          <p>Continue with</p>
          <img
            className="w-16 mt-1"
            src="https://pngimg.com/d/google_PNG19644.png"
            alt="google icon"
          />
        </button>
      </div>
      <p className="text-sm">
        Not a user?{' '}
        <Link to="/auth/register" className="underline">
          Register Here
        </Link>
        .
      </p>
    </div>
  );
}

export default Login;
