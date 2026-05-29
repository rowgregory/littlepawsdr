import { useState } from 'react';
import { Donate1 } from '../../components/assets';
import DonationConfirmationModal from '../../components/modals/DonationConfirmationModal';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import {
  OneTimeDonationForm,
  OneTimeDonationProgressTracker,
} from '../../components/donate/OneTimeDonation';
import { MonthlyDonationForm } from '../../components/donate/MonthlyDonation';
import { useLocation } from 'react-router-dom';

const Donate = () => {
  const location = useLocation();
  const { user } = useAppSelector((state: RootState) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const [step, setStep] = useState({ step1: true, step2: false, step3: false });
  const [type, setType] = useState(location.state?.cameFromSanctuary ? 'monthly' : 'one-time');

  return (
    <>
      <DonationConfirmationModal openModal={openModal} handleClose={handleClose} user={user} />

      <div className='bg-bg-light dark:bg-bg-dark min-h-screen'>
        <div className='max-w-screen-xl w-full mx-auto px-3 sm:px-6 pt-16 sm:pt-24 pb-24 sm:pb-32'>
          {/* Eyebrow + heading */}
          <div className='flex items-center gap-3 mb-4'>
            <span
              className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
              aria-hidden='true'
            />
            <p className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
              Make a Donation
            </p>
          </div>
          <h1 className='text-3xl sm:text-5xl font-bold text-text-light dark:text-text-dark mb-8 leading-tight'>
            Donate to LPDR and Help Dachshunds
          </h1>

          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            {/* Left — donation flow */}
            <div className='lg:col-span-8'>
              {/* One-time / Monthly toggle */}
              <div
                className='grid grid-cols-2 border border-border-light dark:border-border-dark mb-px'
                role='tablist'
                aria-label='Donation frequency'
              >
                {(['one-time', 'monthly'] as const).map((t) => {
                  const active = type === t;
                  return (
                    <button
                      key={t}
                      type='button'
                      role='tab'
                      aria-selected={active}
                      onClick={() => setType(t)}
                      className={`h-16 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark ${
                        active
                          ? 'bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark'
                          : 'bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                      }`}
                    >
                      {t === 'one-time' ? 'One-Time' : 'Monthly'}
                      <span className='hidden sm:inline'> Donation</span>
                    </button>
                  );
                })}
              </div>

              {/* Form panel */}
              <div className='border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 sm:p-6'>
                <OneTimeDonationProgressTracker step={step} setStep={setStep} type={type} />
                <OneTimeDonationForm
                  type={type}
                  step={step}
                  setStep={setStep}
                  setOpenModal={setOpenModal}
                />
                <MonthlyDonationForm type={type} />
              </div>
            </div>

            {/* Right — image + mission */}
            <div className='lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-px border border-border-light dark:border-border-dark'>
              <img
                src={Donate1}
                alt='A rescued dachshund cared for by LPDR'
                className='w-full sm:w-1/2 lg:w-full aspect-square object-cover'
              />
              <div className='bg-surface-light dark:bg-surface-dark p-6 flex items-center'>
                <p className='text-sm text-muted-light dark:text-muted-dark leading-relaxed'>
                  Little Paws Dachshund Rescue is committed to rescuing, rehabilitating, and
                  rehoming dachshunds in need. Your generous contributions let us continue this
                  vital work — offering a safe haven for dachshunds who have been abandoned, abused,
                  or surrendered. Thank you for helping us make a difference in their lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donate;
