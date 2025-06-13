import { Check, Code, Copy } from 'lucide-react';
import { useState } from 'react';

const CopyClipboardButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {}
  };

  return (
    <button
      onClick={handleCopyToClipboard}
      className={`
        ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
        text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 
        flex items-center gap-2 transform hover:scale-105 active:scale-95 w-fit
        ${copied ? 'animate-pulse' : ''}
      `}
    >
      <div className='flex items-center gap-2'>
        {copied ? (
          <>
            <Check className='w-4 h-4' />
            Copied!
          </>
        ) : (
          <>
            <Code className='w-4 h-4' />
            <span className='hidden sm:inline'>Bypass code</span>
            <span className='font-mono bg-white/20 px-2 py-1 rounded text-sm'>{code}</span>
            <Copy className='w-4 h-4 ml-1' />
          </>
        )}
      </div>
    </button>
  );
};

export default CopyClipboardButton;
