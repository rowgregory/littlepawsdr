const BlackPageOverlay = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`${
        open ? 'block' : 'hidden'
      } fixed top-0 left-0 h-screen w-screen bg-black/80 z-[60] fade-in`}
    ></div>
  );
};

export default BlackPageOverlay;
