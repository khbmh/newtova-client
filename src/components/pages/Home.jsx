import THelmet from '../common/THelmet';
import Hero from '../pg components/home/Hero';

function Home() {
  return (
    <div>
      <THelmet title="Newtova." />
      <div className="container mx-auto h-fit">
        <Hero />
      </div>
    </div>
  );
}

export default Home;
