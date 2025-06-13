const FloatingParticles = () => {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none z-0'>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className='absolute animate-bounce opacity-20'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <div className='w-2 h-2 bg-white rounded-full blur-sm' />
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
