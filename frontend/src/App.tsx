import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './components/Header';

const App = () => {
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const getGreeting = async () => {
      const { data } = await axios.get('/api');
      setGreeting(data);
    };

    getGreeting();
  }, []);
  console.log(greeting);
  return (
    <div className='App'>
      <Header />
      {greeting}
    </div>
  );
};

export default App;
