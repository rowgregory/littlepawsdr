import Mission from '../components/home/Mission';
import Banner from '../components/home/Banner';
import OurLovablePals from '../components/home/OurLovablePals';
import { HomeContainer } from '../components/home/styles';
import ChangingLives from '../components/home/ChangingLives';
import WaveSection from '../components/home/WaveSection';
import MakeAnImpact from '../components/home/MakeAnImpact';

const Home = () => {
  return (
    <>
      <Banner />
      <HomeContainer>
        <OurLovablePals />
        <Mission />
        <ChangingLives />
        <WaveSection />
        <MakeAnImpact />
      </HomeContainer>
    </>
  );
};

export default Home;
