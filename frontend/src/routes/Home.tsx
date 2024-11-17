import About from '../components/home-page/About';
import Contact from '../components/home-page/Contact';
import SafeAndEasyDonations from '../components/home-page/SafeAndEasyDonations';
import MeetTheDachshunds from '../components/home-page/MeetTheDachshunds';
import Banner from '../components/home-page/Banner';
import HighlightCards from '../components/home-page/HighlightCards';

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Banner />
      <HighlightCards />
      <MeetTheDachshunds />
      <About />
      <Contact />
      <SafeAndEasyDonations />
    </div>
  );
};

export default Home;
