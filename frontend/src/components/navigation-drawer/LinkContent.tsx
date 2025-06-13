import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkContentProps } from '../../types/navigation-drawer-types';
import navigationDrawerLinks from '../../utils/navigation-utils/navigationDrawerLinks';
import NavigationDrawerAccordion from './NavigationDrawerAccordion';
import NavigationLinkBtn from './NavigationLinkBtn';
import { useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';

const LinkContent: FC<LinkContentProps> = ({ closeMenu }) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const campaign = useAppSelector((state: any) => state.campaign);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const campaignStatus = campaign?.campaign?.campaignStatus;
  const customCampaignLink = campaign?.campaign?.customCampaignLink;
  const campaignLinkKey = campaignStatus === 'Active Campaign' && customCampaignLink ? `/campaigns/${customCampaignLink}/auction` : '/campaigns';
  const isActiveCampaign = campaignStatus === 'Active Campaign' && customCampaignLink;
  const isUpcomingCampaign = campaignStatus === 'Pre-Campaign';

  return (
    <div className='list-none w-full overflow-y-scroll flex flex-col no-scrollbar gap-y-2.5'>
      {/* Active Campaign Banner */}
      <AnimatePresence>
        {isActiveCampaign && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className='relative overflow-hidden mb-4'
          >
            {/* Animated background */}
            <Link to={`/campaigns/${customCampaignLink}/auction`} onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: false }))}>
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500'
                animate={{
                  background: [
                    'linear-gradient(45deg, #ef4444, #f97316, #ef4444)',
                    'linear-gradient(45deg, #f97316, #ef4444, #f97316)',
                    'linear-gradient(45deg, #ef4444, #f97316, #ef4444)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Pulsing overlay */}
              <motion.div
                className='absolute inset-0 bg-white/10'
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Shimmer effect */}
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent'
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1,
                }}
              />

              <div className='relative z-10 p-4 text-center'>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className='flex items-center justify-center space-x-2 mb-2'
                >
                  <motion.span
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className='text-2xl'
                  >
                    🔥
                  </motion.span>
                  <span className='text-white font-bold text-lg uppercase tracking-wide'>LIVE AUCTION</span>
                  <motion.span
                    animate={{
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                    className='text-2xl'
                  >
                    🔥
                  </motion.span>
                </motion.div>

                <motion.p
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className='text-white/90 text-sm font-medium'
                >
                  Bidding is happening right now!
                </motion.p>

                {/* Floating particles */}
                <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className='absolute w-1 h-1 bg-white/60 rounded-full'
                      style={{
                        left: `${20 + i * 12}%`,
                        top: `${30 + Math.sin(i) * 20}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isUpcomingCampaign && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className='relative overflow-hidden mb-4'
          >
            {/* Animated background */}
            <Link to={`/campaigns/${customCampaignLink}/auction`} onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: false }))}>
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600'
                animate={{
                  background: [
                    'linear-gradient(45deg, #2563eb, #9333ea, #2563eb)',
                    'linear-gradient(45deg, #9333ea, #2563eb, #9333ea)',
                    'linear-gradient(45deg, #2563eb, #9333ea, #2563eb)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Pulsing overlay */}
              <motion.div
                className='absolute inset-0 bg-white/10'
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Shimmer effect */}
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 2,
                }}
              />

              <div className='relative z-10 p-4 text-center'>
                <motion.div
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className='flex items-center justify-center space-x-2 mb-2'
                >
                  <span className='text-white font-bold text-lg uppercase tracking-wide'>{campaign?.campaign?.title} COMING SOON</span>
                </motion.div>

                <motion.p
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className='text-white/90 text-sm font-medium'
                >
                  Get ready for something amazing!
                </motion.p>

                {/* Countdown dots */}
                <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1'>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className='w-1.5 h-1.5 bg-white/60 rounded-full'
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Links */}
      {navigationDrawerLinks(campaignLinkKey).map((item, index) => {
        // Special styling for active campaign auction link
        const isActiveCampaignLink = isActiveCampaign && item?.link === campaignLinkKey;

        if (item?.links) {
          return (
            <NavigationDrawerAccordion
              key={index}
              item={item}
              isOpen={openIndex === index}
              toggleAccordion={() => toggleAccordion(index)}
              closeMenu={closeMenu}
            />
          );
        } else {
          return (
            <NavigationLinkBtn
              key={index}
              closeMenu={closeMenu}
              item={{
                ...item,
                // Add rainbow dot to auction link text
                title: isActiveCampaignLink ? (
                  <div className='flex items-center space-x-2'>
                    <span>{item.title}</span>
                    <motion.div
                      className='w-2 h-2 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500'
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </div>
                ) : (
                  item.title
                ),
              }}
              isActive={pathname === item?.link}
            />
          );
        }
      })}
    </div>
  );
};

export default LinkContent;
