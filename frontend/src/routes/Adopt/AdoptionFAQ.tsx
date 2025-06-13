import { useState } from 'react';
import { ChevronDown, HelpCircle, Dog } from 'lucide-react';
import { faq } from '../../components/data/adopt/faq';

const AdoptionFAQ = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(-1);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50'>
      {/* Header Section */}
      <div className='bg-gradient-to-r from-orange-600 to-red-600 text-white'>
        <div className='max-w-4xl mx-auto px-6 py-16'>
          <div className='text-center'>
            <div className='flex justify-center mb-6'>
              <div className='bg-white/20 rounded-full p-4'>
                <HelpCircle className='w-12 h-12 text-white' />
              </div>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>Adoption FAQ</h1>
            <p className='text-xl md:text-2xl text-orange-100 mb-8'>
              Everything you need to know about adopting from Little Paws
            </p>
            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block'>
              <p className='text-lg text-white/90'>🐕 Saving lives, one dachshund at a time 🐕</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='max-w-4xl mx-auto px-6 py-16'>
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>Frequently Asked Questions</h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Have questions about our adoption process? We've got answers! Click on any question
            below to learn more about rescuing a dachshund.
          </p>
        </div>

        <div className='space-y-4'>
          {faq.map(
            (
              item: {
                icon: any;
                q: string;
                a: string;
              },
              index: number
            ) => {
              const IconComponent = item.icon;
              const isOpen = openAccordion === index;

              return (
                <div
                  key={index}
                  className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100'
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className='w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-4'>
                        <div
                          className={`p-3 rounded-xl transition-colors duration-300 ${
                            isOpen ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'
                          }`}
                        >
                          <IconComponent className='w-5 h-5' />
                        </div>
                        <h3
                          className={`text-lg font-semibold transition-colors duration-300 ${
                            isOpen ? 'text-orange-600' : 'text-gray-900'
                          }`}
                        >
                          {item.q}
                        </h3>
                      </div>
                      <div
                        className={`transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        <ChevronDown
                          className={`w-6 h-6 ${isOpen ? 'text-orange-500' : 'text-gray-400'}`}
                        />
                      </div>
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className='px-6 pb-6'>
                      <div className='pl-16'>
                        <div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-l-4 border-orange-500'>
                          <p className='text-gray-700 leading-relaxed'>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Call to Action */}
        <div className='mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-center text-white'>
          <h3 className='text-2xl font-bold mb-4'>Ready to Welcome a New Family Member?</h3>
          <p className='text-lg mb-6 text-orange-100'>
            Browse our available dachshunds and start your adoption journey today!
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-300 flex items-center justify-center space-x-2'>
              <Dog className='w-5 h-5' />
              <span>View Available Dogs</span>
            </button>
            <button className='bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors duration-300 border-2 border-white/20'>
              Apply to Adopt
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <div className='mt-12 text-center'>
          <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
            <h4 className='text-xl font-semibold text-gray-900 mb-4'>Still Have Questions?</h4>
            <p className='text-gray-600 mb-6'>
              Our team is here to help! Don't hesitate to reach out if you need more information.
            </p>
            <button className='bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl'>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionFAQ;
