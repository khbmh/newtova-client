import THelmet from '../common/THelmet';
import Faq from '../pg components/home/Faq';
import Featured from '../pg components/home/Featured';
import Hero from '../pg components/home/Hero';
import Newsletter from '../pg components/home/Newsletter';
import ProOfDay from '../pg components/home/ProOfDay';
import Review from '../pg components/home/Review';
import Trending from '../pg components/home/Trending';

function Home() {
  return (
    <div>
      <THelmet title="Newtova." />
      <div className="container mx-auto h-fit">
        <Hero />
        <ProOfDay />
        <Featured />
        <Trending />
        <Review />
        <Faq />
        <Newsletter />
      </div>
    </div>
  );
}

export default Home;
