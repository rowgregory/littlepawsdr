import React, { useEffect, useRef, useState } from 'react';

type AccordionItem = {
  q: string;
  a: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  useEffect(() => {
    contentRefs.current.forEach((content, index) => {
      if (content) {
        content.style.maxHeight = openIndices.includes(index) ? `${content.scrollHeight}px` : '0px';
      }
    });
  }, [openIndices]);

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className='border-[1px] border-zinc-200 hover:border-teal-400 mb-3 rounded-2xl overflow-hidden'
        >
          <button
            onClick={() => toggleAccordion(index)}
            className={`${
              openIndices.includes(index)
                ? 'bg-teal-400 text-white rounded-tl-2xl rounded-tr-2xl'
                : 'rounded-2xl'
            } py-3 px-4 flex items-center justify-between w-full focus:outline-none group transition-all duration-300`}
          >
            <p
              className={`mr-3 font-QBook tracking-wide text-left sm:text-center ${
                openIndices.includes(index) ? 'text-white' : ''
              }`}
            >
              {item.q}
            </p>
            <p>
              <i
                className={`fas fa-chevron-${
                  openIndices.includes(index) ? 'up' : 'down'
                } transition-transform duration-300`}
              ></i>
            </p>
          </button>
          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className='overflow-hidden transition-max-height duration-300 ease-in-out'
            style={{ maxHeight: '0px' }}
          >
            <div className='p-4'>
              <p className='font-QLight'>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
