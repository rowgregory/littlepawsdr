const FooterLocationText = ({ obj }: { obj: any }) => {
  return (
    <div className='flex items-center'>
      <i className={`${obj.icon} text-teal-400 mr-3 w-5 h-5`} />
      <p className='text-white text-[13px] font-QLight tracking-wide'>{obj.textKey}</p>
    </div>
  );
};

export default FooterLocationText;
