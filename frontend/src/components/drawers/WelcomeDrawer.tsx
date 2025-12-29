import React, { useState, useEffect } from 'react';
import { X, Sparkles, User, Shield, Check, ArrowRight, MapPin, Gavel } from 'lucide-react';

// TypeScript interfaces
interface AuctionData {
  customAuctionLink: string | null;
  auctionItemId?: string | null;
}

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  isAuctionStep?: boolean;
}

interface WelcomeDrawerProps {
  userName?: string;
}

const WelcomeDrawer: React.FC<WelcomeDrawerProps> = ({ userName = 'Greg' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hasAuctionParams, setHasAuctionParams] = useState<boolean>(false);
  const [auctionData, setAuctionData] = useState<AuctionData>({
    customAuctionLink: null,
    auctionItemId: null,
  });

  useEffect(() => {
    // Check for initialLogin parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const isInitialLogin = urlParams.get('initialLogin') === 'true';
    const customAuctionLink = urlParams.get('customAuctionLink');
    const auctionItemId = urlParams.get('auctionItemId');

    // Check if user came from auction
    if (customAuctionLink) {
      setHasAuctionParams(true);
      setAuctionData({ customAuctionLink });
      if (auctionItemId) {
        setAuctionData((prev: any) => ({ ...prev, auctionItemId }));
      }
    }

    if (isInitialLogin) {
      // Small delay to let the page load first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);

      // Clean up the URL parameter after opening the drawer
      const newUrl =
        window.location.pathname +
        window.location.search.replace(/[?&]initialLogin=true/, '').replace(/^&/, '?');
      window.history.replaceState(
        {},
        '',
        newUrl === window.location.pathname ? window.location.pathname : newUrl
      );

      return () => clearTimeout(timer);
    }
  }, []);

  const getSteps = (): Step[] => {
    const baseSteps: Step[] = [
      {
        icon: Sparkles,
        title: 'Welcome to Your Profile!',
        description:
          "Thanks for creating your account. We're excited to have you join our community!",
        color: 'from-purple-500 to-pink-500',
      },
      {
        icon: User,
        title: 'Complete Your Profile',
        description:
          'This is your personal dashboard where you can manage all your information in one place.',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        icon: Shield,
        title: 'Stay Secure',
        description:
          'Your privacy and security are our top priority. All your data is encrypted and protected.',
        color: 'from-emerald-500 to-teal-500',
      },
    ];

    // If user came from auction, add auction-specific step at the beginning
    if (hasAuctionParams) {
      return [
        {
          icon: Gavel,
          title: 'Ready to Bid in the Auction?',
          description:
            'Complete your shipping address to participate in the auction and place bids on items.',
          color: 'from-orange-500 to-red-500',
          isAuctionStep: true,
        },
        ...baseSteps,
      ];
    }

    return baseSteps;
  };

  const steps: Step[] = getSteps();

  const nextStep = (): void => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      // If user came from auction, redirect back to auction item
      if (hasAuctionParams && auctionData.customAuctionLink && auctionData.auctionItemId) {
        window.location.href = `/auctions/${auctionData.customAuctionLink}/item/${auctionData.auctionItemId}`;
      }
      if (hasAuctionParams && auctionData.customAuctionLink) {
        window.location.href = `/auctions/${auctionData.customAuctionLink}`;
      }
    }
  };

  const closeDrawer = (): void => {
    setIsOpen(false);
    // If user came from auction, redirect back to auction item
    if (hasAuctionParams && auctionData.customAuctionLink && auctionData.auctionItemId) {
      window.location.href = `/auctions/${auctionData.customAuctionLink}/item/${auctionData.auctionItemId}`;
    }
    if (hasAuctionParams && auctionData.customAuctionLink) {
      window.location.href = `/auctions/${auctionData.customAuctionLink}`;
    }
  };

  const renderAuctionFeatures = (): JSX.Element => (
    <div className='space-y-4 mb-8'>
      <div className='flex items-start space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl'>
        <div className='flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-0.5'>
          <MapPin className='w-4 h-4 text-orange-600' />
        </div>
        <div>
          <h4 className='font-semibold text-gray-900 mb-1'>🏠 Complete Shipping Address</h4>
          <p className='text-sm text-gray-700 leading-relaxed'>
            You'll need a complete shipping address to participate in auctions. This ensures smooth
            delivery if you win!
          </p>
        </div>
      </div>

      <div className='flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl'>
        <div className='flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5'>
          <Gavel className='w-4 h-4 text-blue-600' />
        </div>
        <div>
          <h4 className='font-semibold text-gray-900 mb-1'>⚡ Start Bidding</h4>
          <p className='text-sm text-gray-700 leading-relaxed'>
            Once your address is complete, you can place bids and compete for amazing items!
          </p>
        </div>
      </div>

      <div className='flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl'>
        <div className='flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5'>
          <Check className='w-4 h-4 text-green-600' />
        </div>
        <div>
          <h4 className='font-semibold text-gray-900 mb-1'>🎯 Secure Bidding</h4>
          <p className='text-sm text-gray-700 leading-relaxed'>
            All bids are secure and verified. Your information is protected throughout the process.
          </p>
        </div>
      </div>
    </div>
  );

  const renderRegularFeatures = (): JSX.Element => (
    <div className='space-y-4 mb-8'>
      <div className='flex items-start space-x-3 p-3 bg-gray-50 rounded-xl'>
        <div className='flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5'>
          <Check className='w-3 h-3 text-green-600' />
        </div>
        <div>
          <h4 className='font-medium text-gray-900'>Manage Personal Info</h4>
          <p className='text-sm text-gray-600'>Update your contact details</p>
        </div>
      </div>

      <div className='flex items-start space-x-3 p-3 bg-gray-50 rounded-xl'>
        <div className='flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5'>
          <Check className='w-3 h-3 text-green-600' />
        </div>
        <div>
          <h4 className='font-medium text-gray-900'>Address Information</h4>
          <p className='text-sm text-gray-600'>Keep your shipping address current</p>
        </div>
      </div>

      <div className='flex items-start space-x-3 p-3 bg-gray-50 rounded-xl'>
        <div className='flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5'>
          <Check className='w-3 h-3 text-green-600' />
        </div>
        <div>
          <h4 className='font-medium text-gray-900'>Privacy Controls</h4>
          <p className='text-sm text-gray-600'>Control your visibility and privacy settings</p>
        </div>
      </div>
    </div>
  );

  // Always render the component, but only show if isOpen is true
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[101] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-white shadow-2xl z-[102] transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='relative overflow-hidden'>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${steps[currentStep].color} opacity-10`}
          ></div>
          <div className='relative px-6 py-8'>
            <button
              onClick={closeDrawer}
              className='absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
            >
              <X className='w-5 h-5 text-gray-500' />
            </button>

            <div className='text-center'>
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${steps[currentStep].color} mb-4`}
              >
                {React.createElement(steps[currentStep].icon, {
                  className: 'w-8 h-8 text-white',
                })}
              </div>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                Hey {userName}! {steps[currentStep].isAuctionStep ? '🎯' : '👋'}
              </h2>
              {hasAuctionParams && steps[currentStep].isAuctionStep && (
                <div className='inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full'>
                  <Gavel className='w-3 h-3 mr-1' />
                  Auction Registration
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='px-6 py-4'>
          <div className='text-center mb-8'>
            <h3 className='text-xl font-semibold text-gray-900 mb-3'>{steps[currentStep].title}</h3>
            <p className='text-gray-600 leading-relaxed'>{steps[currentStep].description}</p>
          </div>

          {/* Features List - Show auction features for auction step, regular features otherwise */}
          {steps[currentStep].isAuctionStep ? renderAuctionFeatures() : renderRegularFeatures()}

          {/* Progress Indicators */}
          <div className='flex justify-center space-x-2 mb-6'>
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentStep
                    ? steps[currentStep].isAuctionStep
                      ? 'bg-orange-500'
                      : 'bg-slate-900'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className='space-y-3'>
            <button
              onClick={nextStep}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-colors duration-200 ${
                steps[currentStep].isAuctionStep
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <span>
                {steps[currentStep].isAuctionStep
                  ? 'Complete Profile for Auction'
                  : currentStep < steps.length - 1
                  ? 'Next'
                  : 'Get Started'}
              </span>
              <ArrowRight className='w-4 h-4' />
            </button>

            <button
              onClick={closeDrawer}
              className='w-full text-gray-600 hover:text-gray-800 py-2 font-medium transition-colors duration-200'
            >
              {hasAuctionParams ? 'Return to Auction' : 'Skip for now'}
            </button>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 ${
            hasAuctionParams
              ? 'bg-gradient-to-r from-orange-500 via-red-500 to-purple-500'
              : 'bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500'
          }`}
        ></div>
      </div>
    </>
  );
};

export default WelcomeDrawer;
