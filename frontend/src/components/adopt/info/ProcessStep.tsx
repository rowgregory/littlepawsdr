import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ProcessStep = ({ titleKey, text, text2, text3, linkKey, path, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className='flex gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow'
  >
    <div className='flex-shrink-0'>
      <div className='w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-semibold text-sm'>{index + 1}</div>
    </div>
    <div className='flex-1'>
      <h4 className='font-semibold text-xl text-gray-800 mb-2'>{titleKey}</h4>
      <p className='text-gray-600 leading-relaxed mb-2'>{text}</p>
      {text2 && <p className='text-gray-600 leading-relaxed mb-2'>{text2}</p>}
      {text3 && <p className='text-gray-600 leading-relaxed mb-2'>{text3}</p>}
      {linkKey && (
        <motion.a href={path} whileHover={{ x: 5 }} className='inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mt-2'>
          {linkKey} <ArrowRight className='w-4 h-4' />
        </motion.a>
      )}
    </div>
  </motion.div>
);

export default ProcessStep;
