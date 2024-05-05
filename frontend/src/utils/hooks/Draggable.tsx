import { useRef } from 'react';

const Draggable = ({ scrollRef, children }: any) => {
  const isMouseDownRef = useRef(false);
  const mouseCoordsRef = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const handleDragStart = (e: any) => {
    if (!scrollRef.current) return;
    const slider = scrollRef.current;
    const startX = e.pageX - slider.offsetLeft;
    const startY = e.pageY - slider.offsetTop;
    const scrollLeft = slider.scrollLeft;
    const scrollTop = slider.scrollTop;
    mouseCoordsRef.current = { startX, startY, scrollLeft, scrollTop };
    isMouseDownRef.current = true;
    scrollRef.current.style.cursor = 'grabbing'
  };

  const handleDragEnd = () => {
    isMouseDownRef.current = false;
    if (!scrollRef.current) return;
  };

  const handleDrag = (e: any) => {
    if (!isMouseDownRef.current || !scrollRef.current) return;
    e.preventDefault();
    const slider = scrollRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walkX = (x - mouseCoordsRef.current.startX) * 1.5;

    const newScrollLeft = Math.max(0, mouseCoordsRef.current.scrollLeft - walkX);
    slider.scrollLeft = newScrollLeft;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
      className={'drag flex overflow-auto'}
    >
      {children}
    </div>
  );
};

export default Draggable
