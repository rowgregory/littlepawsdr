type SkeletonProps = {
  w?: string; // width class, e.g. "w-32"
  h?: string; // height class, e.g. "h-10"
  maxw?: string; // optional max-width class, e.g. "max-w-xl"
  ar?: string; // aspect ratio, e.g. "1/1"
  rounded?: string; // optional rounded class
};

const Skeleton = ({
  w = 'w-full',
  h = '',
  maxw = '',
  ar = '',
  rounded = 'rounded-md',
}: SkeletonProps) => {
  const aspectClass = ar ? `aspect-[${ar}]` : '';

  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${w} ${h} ${maxw} ${aspectClass} ${rounded}`}
    />
  );
};

export default Skeleton;
