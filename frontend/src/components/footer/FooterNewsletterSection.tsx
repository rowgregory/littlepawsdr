import { FormEvent, useState } from 'react';
import useForm from '../../hooks/useForm';
import { useCreateNewsletterEmailMutation } from '../../redux/services/newsletterEmailApi';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import { validateEmailRegex } from '../../utils/regex';
import { Send } from 'lucide-react';

const FooterNewsletterSection = () => {
  const { inputs, handleInput } = useForm(['email']);
  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'invalid'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    if (!validateEmailRegex.test(inputs.email || '')) {
      setStatus('invalid');
      return;
    }

    try {
      await createNewsletterEmail({ email: inputs.email }).unwrap();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5 items-center'>
      <div>
        <h3 className='font-quicksand text-lg font-bold mb-2 text-text-light dark:text-text-dark text-center sm:text-left'>
          Subscribe, Support, Rescue
        </h3>
        <p className='text-sm text-muted-light dark:text-muted-dark text-center sm:text-left'>
          Stay updated on rescues, events, and dachshund adoption opportunities!
        </p>
      </div>

      {status === 'success' ? (
        <p className='text-sm text-text-light dark:text-text-dark' role='status'>
          Thank you for subscribing! You&rsquo;re now part of the Little Paws family.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          <div className='flex items-stretch gap-2'>
            <label htmlFor='newsletter-email' className='sr-only'>
              Email address
            </label>
            <input
              id='newsletter-email'
              name='email'
              type='email'
              className='flex-1 min-w-0 p-3 text-base sm:text-sm bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark placeholder:text-muted-light/60 dark:placeholder:text-muted-dark/60 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
              onChange={handleInput}
              value={inputs.email || ''}
              placeholder='Enter email here'
              aria-invalid={status === 'invalid'}
              aria-describedby={
                status === 'invalid' || status === 'error' ? 'newsletter-error' : undefined
              }
            />
            <button
              type='submit'
              disabled={isLoading}
              aria-label='Subscribe'
              className='w-12 shrink-0 bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark disabled:opacity-60 text-bg-light dark:text-bg-dark flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              {isLoading ? (
                <TailwindSpinner color='fill-current' />
              ) : (
                <Send className='w-4 h-4' aria-hidden='true' />
              )}
            </button>
          </div>
          {(status === 'invalid' || status === 'error') && (
            <p id='newsletter-error' role='alert' className='font-mono text-[11px] text-red-400'>
              {status === 'invalid'
                ? 'Please enter a valid email.'
                : 'Something went wrong — try again.'}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default FooterNewsletterSection;
