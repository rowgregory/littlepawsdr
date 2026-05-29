import { SurrenderToUsImg } from '../../components/assets';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../../lib/constants/motion';

const SurrenderToUs = () => {
  return (
    <section
      aria-labelledby='surrender-heading'
      className='px-3 sm:px-6 bg-bg-light dark:bg-bg-dark'
    >
      <div className='max-w-screen-lg w-full mx-auto pt-16 sm:pt-28 pb-24 sm:pb-32'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className='space-y-6 sm:space-y-8'
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className='flex items-center gap-3'>
            <span
              className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
              aria-hidden='true'
            />
            <h3
              id='surrender-heading'
              className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'
            >
              Surrender a Dachshund
            </h3>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants}>
            <h2 className='text-2xl sm:text-4xl lg:text-5xl font-bold text-text-light dark:text-text-dark mb-3 leading-tight'>
              Ideally, all dogs live in one loving home from puppyhood until death.
            </h2>
            <p className='text-base sm:text-lg text-muted-light dark:text-muted-dark'>
              But LPDR understands that isn&rsquo;t always possible — and when it isn&rsquo;t,
              we&rsquo;re here to help.
            </p>
          </motion.div>

          {/* Intro with image */}
          <motion.div
            variants={itemVariants}
            className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center pt-4'
          >
            <img
              src={SurrenderToUsImg}
              alt='A dachshund in a loving home'
              className='md:col-span-7 aspect-square object-cover w-full border border-border-light dark:border-border-dark'
            />
            <div className='md:col-span-5 flex flex-col gap-4'>
              <p className='text-lg font-bold text-text-light dark:text-text-dark leading-snug'>
                People become ill, die, divorce, move overseas, develop allergies, lose their jobs,
                or lose their homes.
              </p>
              <p className='text-base text-muted-light dark:text-muted-dark'>
                Any of these situations, among others, can be a reason for a dog coming into rescue.
              </p>
            </div>
          </motion.div>

          {/* Options before surrendering */}
          <motion.div variants={itemVariants} className='space-y-10 pt-4'>
            <section>
              <h4 className='text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark mb-3'>
                Considering re-homing because of behavior problems?
              </h4>
              <p className='text-muted-light dark:text-muted-dark leading-relaxed'>
                Talk to your vet to ensure the behavior isn&rsquo;t a result of a medical problem,
                or because the dog hasn&rsquo;t been spayed or neutered. You may also want to
                consult a behaviorist who can help resolve the problem with training (for you and
                your dog).
              </p>
            </section>

            <section>
              <h4 className='text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark mb-3'>
                Considering re-homing because of financial issues or high vet costs?
              </h4>
              <p className='text-muted-light dark:text-muted-dark leading-relaxed'>
                There are foundations that may offer financial assistance. A search of resources
                serving your geographic area may yield good results, and local governments often
                offer lower-cost veterinary services.
              </p>
            </section>

            <section>
              <h4 className='text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark mb-3'>
                Have you explored your own network?
              </h4>
              <p className='text-muted-light dark:text-muted-dark leading-relaxed'>
                Consider trusted friends, family, and co-workers who may be able to provide a good
                home. When all options have been considered and you believe surrendering is the best
                choice for you and your dachshund, Little Paws may be able to help. All dachshunds
                that come into our rescue live in the home of an approved foster — generally staying
                two weeks before being posted for adoption so we can understand their needs and
                personality. All potential adopters go through a rigorous, carefully screened
                application process.
              </p>
            </section>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className='w-full h-px bg-border-light dark:bg-border-dark'
          />

          {/* Form */}
          <motion.div variants={itemVariants}>
            <div className='flex items-center gap-3 mb-4'>
              <span
                className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
                aria-hidden='true'
              />
              <h3 className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
                Surrender Questionnaire
              </h3>
            </div>
            <h4 className='text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark mb-8 leading-tight'>
              To be considered for surrender, please complete and submit the form below.
            </h4>
            <div className='border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-2 sm:p-4'>
              <iframe
                className='w-full h-[600px]'
                title='Surrender questionnaire form'
                src='https://toolkit.rescuegroups.org/of/f?c=QCVXZJTH'
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SurrenderToUs;
