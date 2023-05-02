import { useEffect, useRef, useState } from 'react';

const IFrame = ({ src }: { src: string }) => {
  const [height, setHeight] = useState('0px');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      const handleResize = () => {
        const newHeight =
          iframe.contentWindow?.document.body.scrollHeight + '0px';

        setHeight(newHeight || '0px');
      };

      iframe.addEventListener('load', handleResize);
      window.addEventListener('resize', handleResize);

      return () => {
        iframe.removeEventListener('load', handleResize);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <iframe ref={iframeRef} src={src} title='My Iframe' style={{ height }} />
  );
};

export default IFrame;
