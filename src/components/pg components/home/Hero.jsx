import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router';

function Hero() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex -mt-[10vh] flex-col py-[6vh] lg:px-0 lg:flex-row gap-5 lg:gap-12 justify-around items-center min-h-[100vh]">
      <div className="min-w-[350px] w-[95vw] lg:p-4 lg:w-[40vw] items-center justify-center flex flex-col lg:h-[90vh]">
        <img
          className={`w-[230px] lg:w-[450px] opacity-70 grayscale ${
            user && 'rounded-full'
          }`}
          src={` ${
            user
              ? 'https://i.pinimg.com/originals/b3/03/4a/b3034adc917da8a545f9e233a339b7c0.gif'
              : 'https://cdni.iconscout.com/illustration/premium/thumb/girl-with-idea-illustration-download-in-svg-png-gif-file-formats--creative-business-woman-vision-web-development-and-debugging-pack-website-illustrations-6829892.png?f=webp'
          }`}
          alt={user ? 'Unleash Your Masterpiece' : 'Get Started'}
        />
      </div>
      <div className="min-w-[350px] -mt-[13vh] lg:mt-0 w-[95vw] lg:p-4 lg:w-[40vw] gap-6 lg:gap-12 items-center justify-center flex flex-col lg:h-[90vh]">
        <h1 className="heading mt-12 text-4xl lg:text-5xl font-sans font-black tracking-tight pointer-events-none">
          Discover, Share
          <br /> and Elevate the
          <br />
          Best <span className="text-yellow-100">Tech Products</span>
        </h1>
        <p className="paragraph px-2 text-xs lg:text-sm text-white/60 pointer-events-none">
          Explore a world of innovation! From cutting-edge AI tools to immersive
          games, our platform is your gateway to the latest tech products. Share
          your creations, upvote your favorites, and connect with a community of
          tech enthusiasts. Whether you are a developer, creator, or explorer,
          join us in shaping the future of technology.
        </p>
        <Link to={user ? '/add-product' : '/auth/login'}>
          <button className="button text-xl cursor-pointer">
            {user ? 'Unleash Your Masterpiece' : 'Get Started'}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
