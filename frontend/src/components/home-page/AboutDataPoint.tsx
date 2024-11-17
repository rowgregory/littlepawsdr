const AboutDataPoint = ({ text }: { text: string }) => {
  return (
    <div className='flex items-center col-span-12 md:col-span-6'>
      <div className='w-3.5 h-3.5 mr-3.5 p-1 rounded-full flex items-center justify-center bg-teal-400'>
        <i className='fas fa-check text-white w-2.5 h-2.5' />
      </div>
      <p className='text-[#787878] font-QBook'>{text}</p>
    </div>
  );
};

export default AboutDataPoint;
