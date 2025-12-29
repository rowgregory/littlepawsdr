import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, MapPin, Truck, Clock, Shield, Users } from 'lucide-react';
import PageBanner from '../../components/common/PageBanner';
import { AdoptionInfo } from '../../components/assets';
import { fadeInUp, staggerContainer, staggerItem } from '../../lib/constants/motion';
import { adoptionGuidelinesAndRequirements, fiveStepProcess, statesWeRescue } from '../../lib/constants/adopt';
import ProcessStep from '../../components/adopt/info/ProcessStep';

const AdoptionInformation = () => {
  return (
    <Fragment>
      <PageBanner imgSrc={AdoptionInfo} title='Adoption Information' />

      <div className='max-w-screen-lg mx-auto px-6 py-16'>
        {/* Main Introduction */}
        <motion.section className='mb-20' {...fadeInUp}>
          <div className='text-center mb-16'>
            <Heart className='w-12 h-12 text-teal-500 mx-auto mb-6' />
            <h2 className='text-4xl font-bold text-gray-800 mb-6'>Adopting is a Big Decision</h2>
          </div>

          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <motion.div className='space-y-6' initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h3 className='text-2xl font-semibold text-gray-800 leading-relaxed'>
                You are considering adopting a dog that is intelligent, loyal, fun loving, full of love, and more than likely very vocal.
              </h3>
              <p className='text-lg text-gray-600 leading-relaxed'>
                A dachshund will bring you so much enjoyment, fun, and fulfillment. They have this fantastic way of bringing joy to their families
                every day! We are committed to finding each of our dachshunds responsible and loving new owners. We strive to make the best match we
                can, setting each dog and adopter up for success. Our number one concern is for our dogs.
              </p>
            </motion.div>
            <motion.div className='relative' initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className='aspect-square bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center'>
                <Users className='w-32 h-32 text-teal-400' />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Guidelines & Requirements */}
        <motion.section className='mb-20' {...fadeInUp}>
          <div className='text-center mb-12'>
            <Shield className='w-12 h-12 text-teal-500 mx-auto mb-6' />
            <h3 className='text-3xl font-bold text-gray-800 mb-6'>Our Adoption Guidelines & Requirements</h3>
            <p className='text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto'>
              To ensure that we are working with people who are committed to adopting and welcoming a rescue into their family,
              <span className='font-semibold text-gray-800'>
                {' '}
                we require all individuals to read each dog's bio/requirements completely to ensure the dog of interest is the best match for your
                family
              </span>{' '}
              and that the needs of the dog can be met.
            </p>
          </div>

          <motion.div
            className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'
            variants={staggerContainer}
            initial='initial'
            whileInView='animate'
          >
            <div className='flex items-start gap-6'>
              <div className='flex-shrink-0'>
                <div className='w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center'>
                  <CheckCircle className='w-8 h-8' />
                </div>
              </div>
              <div className='flex-1'>
                <h4 className='text-2xl font-bold text-gray-800 mb-6'>Requirements we strongly adhere to:</h4>
                <motion.div className='space-y-4' variants={staggerContainer}>
                  {adoptionGuidelinesAndRequirements.map((requirement, i) => (
                    <motion.div key={i} className='flex items-start gap-3' variants={staggerItem}>
                      <CheckCircle className='w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0' />
                      <p className='text-gray-700 leading-relaxed'>{requirement}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Puppy Section */}
        <motion.section className='mb-20' {...fadeInUp}>
          <div className='text-center mb-12'>
            <Clock className='w-12 h-12 text-teal-500 mx-auto mb-6' />
            <h3 className='text-3xl font-bold text-gray-800 mb-6'>Adopting a Puppy</h3>
            <p className='text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto'>
              The general guideline is that puppies may be left alone for no longer in hours than the number of months of their age.
            </p>
          </div>

          <div className='bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-8'>
            <h4 className='text-2xl font-semibold text-gray-800 mb-4'>
              Puppies require extensive attention, especially initially. Please consider a young adult if your schedule doesn't permit frequent puppy
              breaks.
            </h4>
          </div>

          <div className='space-y-6'>
            {fiveStepProcess.map((step, i) => (
              <ProcessStep key={i} {...step} index={i} />
            ))}
          </div>
        </motion.section>

        {/* Service Areas */}
        <motion.section className='mb-20' {...fadeInUp}>
          <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
            <div className='flex items-start gap-6'>
              <div className='flex-shrink-0'>
                <div className='w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center'>
                  <MapPin className='w-8 h-8' />
                </div>
              </div>
              <div className='flex-1'>
                <h3 className='text-2xl font-bold text-gray-800 mb-6'>We currently help rescue in the following states:</h3>
                <motion.div
                  className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'
                  variants={staggerContainer}
                  initial='initial'
                  whileInView='animate'
                >
                  {statesWeRescue.map((state, i) => (
                    <motion.div key={i} variants={staggerItem} className='bg-teal-50 border border-teal-100 rounded-lg p-3 text-center'>
                      <span className='text-gray-700 font-medium'>{state}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Transportation */}
        <motion.section {...fadeInUp}>
          <div className='text-center mb-12'>
            <Truck className='w-12 h-12 text-teal-500 mx-auto mb-6' />
            <h3 className='text-3xl font-bold text-gray-800 mb-6'>Transportation Help!</h3>
          </div>

          <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
            <div className='prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6'>
              <p>
                We do not have a physical location, as all our dogs are fostered in individual homes on the east coast. A LPDR volunteer transport may
                be arranged to bring a dog to you; however, the distance of the transport must be reasonable.
              </p>

              <div className='grid md:grid-cols-2 gap-6'>
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
                  <h4 className='font-semibold text-gray-800 mb-3'>Travel Restrictions</h4>
                  <ul className='space-y-2 text-sm'>
                    <li>Dogs in the south may not be available for transport to northern states and vice versa</li>
                    <li>Dogs in southern Florida and southern Georgia have travel restrictions limited to Florida and parts of South Carolina</li>
                  </ul>
                </div>

                <div className='bg-green-50 border border-green-200 rounded-lg p-6'>
                  <h4 className='font-semibold text-gray-800 mb-3'>Transport Costs</h4>
                  <ul className='space-y-2 text-sm'>
                    <li>Includes health certificate required by law when crossing state lines</li>
                    <li>Certificate costs vary and may exceed adoption fees in some cases</li>
                  </ul>
                </div>
              </div>

              <p>
                We will inform you if the dog you applied for is not able to travel long distances by car. We want to find the best family for each of
                our dachshunds, even if they are out of state.
              </p>

              <p>
                Adopters are also welcome to travel to their newly adopted dog to bring the dog home with them. A crate to safely transport the dog
                would be the responsibility of the adopter.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </Fragment>
  );
};

export default AdoptionInformation;
