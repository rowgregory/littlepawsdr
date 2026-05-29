import { Check, Code, Copy } from 'lucide-react';
import { useState } from 'react';

const CopyClipboardButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (insecure context / denied) — silently no-op
    }
  };

  return (
    <button
      type='button'
      onClick={handleCopyToClipboard}
      aria-label={copied ? 'Bypass code copied' : 'Copy bypass code'}
      className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark w-fit ${
        copied
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark hover:bg-secondary-light dark:hover:bg-secondary-dark'
      }`}
    >
      {copied ? (
        <>
          <Check className='w-4 h-4' aria-hidden='true' />
          Copied
        </>
      ) : (
        <>
          <Code className='w-4 h-4' aria-hidden='true' />
          <span className='hidden sm:inline'>Bypass code</span>
          <span className='bg-bg-light/20 dark:bg-bg-dark/20 px-2 py-1 normal-case tracking-normal'>
            {code}
          </span>
          <Copy className='w-4 h-4' aria-hidden='true' />
        </>
      )}
    </button>
  );
};

export default CopyClipboardButton;
