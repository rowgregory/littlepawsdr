import AwesomeIcon from '../common/AwesomeIcon';

const TopHeaderInfoBox = ({ obj }: { obj: any }) => {
  return (
    <div onClick={obj.onClick} className={`flex gap-3 ${obj.className}`}>
      <AwesomeIcon icon={obj.icon} className={`text-teal-400 w-5 h-5`} />

      <div className='flex flex-col'>
        <p className='font-QBook text-sm text-[#9a9ca1] hidden md:block whitespace-nowrap'>
          {obj.titleKey}
        </p>
        <p className='font-QBook text-15 text-charcoal md:text-[#feffff] whitespace-nowrap'>
          {obj.textKey}
        </p>
      </div>
    </div>
  );
};

export default TopHeaderInfoBox;
