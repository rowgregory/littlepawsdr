import './styles.css';

const ContactLoader = ({ text }: { text: string }) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[5000] bg-white/10'>
      <div className='loader'>
        <div className='inner one'></div>
        <div className='inner two'></div>
        <div className='inner three'></div>
      </div>
      <p className='text-white my-12'>{text}</p>
    </div>
  );
};

export default ContactLoader;

