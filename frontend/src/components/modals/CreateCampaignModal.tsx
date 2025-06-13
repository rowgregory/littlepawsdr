import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, Zap } from 'lucide-react';
import Modal from '../common/Modal';

const CreateCampaignModal = ({ show, handleClose, text, setText, handleCreateCampaign, loadingCreate }: any) => {
  return (
    <AnimatePresence>
      {show && (
        <Modal show={show} onClose={handleClose}>
          <motion.div
            className='bg-gradient-to-br from-white via-gray-50 to-white p-8 rounded-2xl flex flex-col max-w-lg w-full shadow-2xl border border-gray-100 relative overflow-hidden'
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Decorative background elements */}
            <motion.div
              className='absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20'
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className='absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20'
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />

            {/* Header */}
            <motion.div
              className='flex items-center justify-between mb-6 relative z-10'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <motion.div
                onClick={handleClose}
                className='flex items-center cursor-pointer group hover:bg-gray-100 p-2 rounded-lg transition-all duration-200'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className='w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-600 transition-colors' />
                <p className='text-gray-500 text-sm group-hover:text-gray-700 transition-colors'>Back</p>
              </motion.div>
              <motion.div
                className='flex items-center space-x-2'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Sparkles className='w-5 h-5 text-yellow-500' />
                </motion.div>
                <span className='text-sm font-medium text-gray-600'>Create Something Amazing</span>
              </motion.div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className='text-center mb-8 relative z-10'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.div
                className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full mb-6 shadow-lg relative'
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Zap className='w-10 h-10 text-white' />
                <motion.div
                  className='absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500'
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <motion.h2
                className='text-3xl font-bold text-gray-800 mb-2'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                Start Your Campaign
              </motion.h2>
              <motion.p
                className='text-gray-600 text-lg'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                Bring your vision to life
              </motion.p>
            </motion.div>

            {/* Form */}
            <motion.div
              className='space-y-6 relative z-10'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <form onSubmit={handleCreateCampaign} className='space-y-6'>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.3 }}>
                  <motion.label
                    className='block text-sm font-semibold text-gray-700 mb-3'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  >
                    Campaign Title
                  </motion.label>
                  <motion.div className='relative'>
                    <motion.input
                      type='text'
                      placeholder='Enter your campaign title...'
                      value={text || ''}
                      onChange={(e: any) => setText(e.target.value)}
                      className='w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white/80 backdrop-blur-sm'
                      required
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, duration: 0.3 }}
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                        borderColor: '#3B82F6',
                      }}
                    />
                    <motion.div
                      className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: text ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </motion.div>

                <motion.button
                  type='submit'
                  disabled={loadingCreate || !text?.trim()}
                  className='w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 relative overflow-hidden'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.3 }}
                  whileHover={{
                    scale: !loadingCreate && text?.trim() ? 1.02 : 1,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  }}
                  whileTap={{ scale: !loadingCreate && text?.trim() ? 0.98 : 1 }}
                >
                  {/* Button background animation */}
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent'
                    initial={{ x: '-100%' }}
                    animate={{ x: text?.trim() && !loadingCreate ? '100%' : '-100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />

                  <AnimatePresence mode='wait'>
                    {loadingCreate ? (
                      <motion.div
                        key='loading'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='flex items-center space-x-2'
                      >
                        <motion.div
                          className='w-5 h-5 border-2 border-white border-t-transparent rounded-full'
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>Creating...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key='create'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='flex items-center space-x-2'
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          <Sparkles className='w-5 h-5' />
                        </motion.div>
                        <span>Create Campaign</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              {/* Floating elements for extra flair */}
              <motion.div
                className='absolute top-20 right-8 w-2 h-2 bg-yellow-400 rounded-full opacity-60'
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className='absolute bottom-32 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60'
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              />
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CreateCampaignModal;
