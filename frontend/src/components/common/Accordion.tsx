import React from 'react';

type AccordionProps = {
  toggle: boolean;
  maxheight?: string;
  children: React.ReactNode;
};

const Accordion = ({ toggle, maxheight = '1000px', children }: AccordionProps) => {
  return (
    <div
      className='overflow-hidden transition-[max-height] duration-200 ease-out'
      style={{ maxHeight: toggle ? maxheight : '0px' }}
    >
      {children}
    </div>
  );
};

export default Accordion;
