import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';
import { useAppDispatch } from '../../redux/toolkitStore';

const BlackPageOverlay = ({ open }: { open: boolean }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: false }))}
      className={`${open ? 'block' : 'hidden'} fixed top-0 left-0 h-screen w-screen bg-black/80 z-[101] fade-in`}
    ></div>
  );
};

export default BlackPageOverlay;
