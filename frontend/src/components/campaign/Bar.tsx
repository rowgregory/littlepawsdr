type BarProps = {
  width: number;
  prevWidth: number;
};

const Bar = ({ width }: BarProps) => {
  return (
    <div
      className='h-full relative transition-all duration-300 ease-out bg-current'
      style={{ width: `${width}%` }}
    />
  );
};

export { Bar };
