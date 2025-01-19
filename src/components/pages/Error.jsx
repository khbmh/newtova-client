import { Link } from 'react-router';
import THelmet from '../common/THelmet';

function Error() {
  return (
    <div className="overflow-hidden h-[100vh] w-full flex flex-col items-center justify-center gap-4">
      <THelmet title="Oops." />
      <div className="flex items-center gap-2 justify-around text-xl font-sans">
        <h1 className="text-rose-300/40">404</h1>
        <span>|</span>
        <p className="text-rose-300/60">Page not found</p>
      </div>
      <Link to="/">
        <span className="underline">Return to home</span>.
      </Link>
    </div>
  );
}

export default Error;
