import THelmet from '../common/THelmet';
import Featured from '../pg components/home/Featured';
import Hero from '../pg components/home/Hero';
import Newsletter from '../pg components/home/Newsletter';
import Trending from '../pg components/home/Trending';

function Home() {
  return (
    <div>
      <THelmet title="Newtova." />
      <div className="container mx-auto h-fit">
        <Hero />
        <Featured />
        <Trending />
        <Newsletter />
      </div>
    </div>
  );
}

export default Home;
