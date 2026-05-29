import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className='py-16 sm:py-20 px-3 bg-surface-light dark:bg-surface-dark relative flex flex-col items-center justify-center text-center'>
      <div className='flex items-center gap-3 mb-5'>
        <span className='block w-8 h-px bg-primary-light dark:bg-primary-dark' aria-hidden='true' />
        <h2 className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
          Surrender a Dachshund in Need
        </h2>
        <span className='block w-8 h-px bg-primary-light dark:bg-primary-dark' aria-hidden='true' />
      </div>

      <h3 className='font-quicksand text-3xl sm:text-5xl font-bold text-text-light dark:text-text-dark mb-5'>
        Let&apos;s Help Dachshunds Together
      </h3>

      <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark mb-8 max-w-xl leading-relaxed'>
        If you&apos;re unable to care for your dachshund, we&apos;re here to help. Little Paws
        Dachshund Rescue offers a safe, loving solution for dachshunds in need, ensuring they find a
        caring home.
      </p>

      <Link
        to='/dachshunds/surrender'
        className='font-mono text-xs uppercase tracking-[0.15em] py-4 px-9 bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
      >
        Surrender
      </Link>
    </div>
  );
};

export default Contact;
