const Checkmark = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 52 52'
      className='w-[35px] h-[35px] rounded-full block
                 stroke-white stroke-[4] stroke-miterlimit-10
                 animate-fill animate-scale'
      style={{
        boxShadow: 'inset 0 0 0 0 green', // initial, will be overridden by animation
      }}
    >
      <circle
        cx='26'
        cy='26'
        r='25'
        fill='none'
        className='stroke-[#7ac142] stroke-[2] stroke-miterlimit-10'
        style={{
          strokeDasharray: 166,
          strokeDashoffset: 166,
          animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
        }}
      />
      <path
        fill='none'
        d='M14.1 27.2l7.1 7.2 16.7-16.8'
        style={{
          transformOrigin: '50% 50%',
          strokeDasharray: 48,
          strokeDashoffset: 48,
          animation: 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
        }}
      />
    </svg>
  );
};

export default Checkmark;
