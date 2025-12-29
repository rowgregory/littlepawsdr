'use client';

import { useState } from 'react';
import { Calendar, Tag, GitBranch, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: 'feature' | 'improvement' | 'bugfix' | 'breaking' | 'ui' | 'refactor' | 'security';
    title: string;
    description: string;
    impact?: 'high' | 'medium' | 'low';
  }[];
}

const changelogData: ChangelogEntry[] = [
  {
    version: '3.0.0',
    date: '2025-12-29',
    changes: [
      {
        type: 'feature',
        title: 'Newsletter Issue Management',
        description:
          'Complete admin dashboard for managing quarterly newsletter issues with CRUD operations, image uploads to Firebase, and public viewing page with zoom functionality.',
        impact: 'high',
      },
      {
        type: 'bugfix',
        title: 'Product Stock Decrement Function',
        description:
          'Fixed broken inventory management system that had stopped working. Completely rewrote updateProductInventory function to properly decrement stock on purchase. Now correctly handles both sized and unsized products. Updates countInStock field and sets isOutofStock flag when inventory reaches zero. Includes proper error handling and logging for missing products.',
        impact: 'high',
      },
      {
        type: 'feature',
        title: 'Auction Timeline & Scheduling',
        description:
          'Flexible auction scheduling allowing admins to set custom start and end times within 6 AM - 9 PM EST window. Automatic cron jobs trigger auction status transitions (DRAFT → ACTIVE → ENDED) at scheduled times. Real-time duration calculation with EST timezone support. Prevents scheduling outside operational hours for consistent auction management.',
        impact: 'high',
      },
      {
        type: 'feature',
        title: 'Supporter Dashboard',
        description:
          'Complete user dashboard with profile overview, activity history, recent purchases, donation tracking, adoption applications, and order history with filtering.',
        impact: 'high',
      },
      {
        type: 'feature',
        title: 'User Model Enhancement',
        description:
          'Expanded user profile fields including profile picture, bio, preferences, notification settings, address management, and security questions. Enhanced data structure for better personalization.',
        impact: 'high',
      },

      {
        type: 'feature',
        title: 'Bug Report System - Full CRUD',
        description:
          'Complete bug reporting platform accessible from supporter dashboard. Create, read, update, delete bug reports with status tracking (open, in-progress, resolved, closed). Image uploads to Firebase, severity levels, category filtering, and priority sorting.',
        impact: 'high',
      },
      {
        type: 'security',
        title: 'Google OAuth Credentials Update',
        description:
          'Updated GCP OAuth 2.0 credentials with new client IDs and refresh tokens. Enhanced security with latest Google authentication standards.',
        impact: 'high',
      },

      {
        type: 'feature',
        title: 'Unified Order & Cart System',
        description:
          'Consolidated product, ecard, and welcome wiener items into single OrderItem model with unified cart logic. Eliminated duplicate item tracking and simplified state management.',
        impact: 'high',
      },
      {
        type: 'feature',
        title: 'Auction Item Management Overhaul',
        description:
          'Separated fixed price and auction items into distinct table layouts. Added sorting, filtering, and real-time bid/increase tracking. Implemented item drawer for detailed bid history.',
        impact: 'high',
      },
      {
        type: 'feature',
        title: 'EST/UTC Timezone Handling',
        description:
          'Implemented proper timezone conversion for auction start/end times. Users input Eastern time, stored as UTC, displayed back as EST with correct offset calculations.',
        impact: 'high',
      },
      {
        type: 'refactor',
        title: 'Logging System Modernization',
        description:
          'Replaced prepareLog/logEvent pattern with journeyId-based event tracking. Centralized logging for better debugging and audit trails across all endpoints.',
        impact: 'medium',
      },
      {
        type: 'feature',
        title: 'Cart Item Matching Logic',
        description:
          'Unified cart matching: products with size match by itemId+size, welcome wieners by itemId+dachshundId, ecards and unsized items by itemId only.',
        impact: 'medium',
      },
      {
        type: 'ui',
        title: 'Framer Motion Animation Suite',
        description:
          'Updated modals, drawers, and components with smooth entrance animations, staggered content reveal, and interactive hover/tap effects using AnimatePresence.',
        impact: 'medium',
      },
      {
        type: 'feature',
        title: 'Ecard Personalization Page',
        description:
          'Single-page ecard customization with real-time preview. Recipients, send timing, personal messages all displayed as user types.',
        impact: 'medium',
      },
      {
        type: 'ui',
        title: 'Responsive Mobile Design',
        description:
          'All tables, cards, and modals tested down to 320px width. Adaptive layouts with proper spacing and touch-friendly button sizes across all breakpoints.',
        impact: 'medium',
      },
      {
        type: 'refactor',
        title: 'Order Receipt & Admin Dashboard',
        description:
          'Comprehensive order details with item breakdown, shipping info, and payment status. Admin drawer for managing orders with shipping status updates.',
        impact: 'medium',
      },
      {
        type: 'feature',
        title: 'Welcome Wiener Redesign',
        description:
          'Gallery cards with live badges, hover overlays showing associated products. Detail page with bio, image gallery, donation card, and product grid.',
        impact: 'medium',
      },
      {
        type: 'ui',
        title: 'Admin Interface Redesign',
        description:
          'Complete overhaul of admin dashboard UI with new collapsible navigation drawer. Restyled all admin pages (users, auctions, orders, products, etc.) with modern design patterns, consistent spacing, and improved visual hierarchy. Updated color palette, typography system, and component styling. Enhanced accessibility with better contrast and keyboard navigation.',
        impact: 'high',
      },
    ],
  },
  {
    version: '2.2.0',
    date: '2025-12-19',
    changes: [
      {
        type: 'feature',
        title: 'Newsletter Issue Management',
        description:
          'Complete admin dashboard for managing quarterly newsletter issues with CRUD operations, image uploads to Firebase, and public viewing page with zoom functionality.',
        impact: 'high',
      },
      {
        type: 'feature',
        title: 'RTK Query API Structure',
        description:
          'Refactored auction and auction API endpoints into separate, focused endpoints (auctionApi, auctionApi, auctionItemApi) with proper cache invalidation.',
        impact: 'high',
      },
      {
        type: 'feature',
        title: 'Redux State Architecture',
        description:
          'Split monolithic auction slice into separate slices (auctionSlice, auctionSlice, auctionItemSlice, tableSlice) with clear separation of concerns.',
        impact: 'high',
      },
      {
        type: 'improvement',
        title: 'Auction Status System',
        description:
          'Replaced multiple boolean flags (hasBegun, hasEnded) with single enum-based status field (DRAFT, ACTIVE, ENDED) with automatic date-based transitions.',
        impact: 'high',
      },
      {
        type: 'feature',
        title: 'Real-time Socket.io Integration',
        description:
          'Added Socket.io listeners for auction and auction updates, enabling real-time notifications without page refresh.',
        impact: 'medium',
      },
      {
        type: 'improvement',
        title: 'Cron Job Architecture',
        description:
          'Implemented scheduled tasks (auction finalization, status updates) running on backend without requiring frontend polling.',
        impact: 'medium',
      },
    ],
  },
  {
    version: '2.1.0',
    date: '2025-12-16',
    changes: [
      {
        type: 'feature',
        title: 'Manual Payment Processing for Auction Winners',
        description:
          'Admins can now manually mark winning bidders as paid when payments are received outside the system. Added support for 8 different payment methods including Venmo, Cash, Check, Zelle, Bank Transfer, Cash App, Wire Transfer, and Other.',
        impact: 'high',
      },
      {
        type: 'feature',
        title: 'Payment Method Tracking',
        description:
          'System now tracks which payment method was used for each transaction. Manual payments are flagged with a special indicator and payment method details are displayed throughout the admin interface.',
        impact: 'medium',
      },
      {
        type: 'feature',
        title: 'Payment Analytics & Winning Bidders Enhancements',
        description:
          'Introduced a comprehensive payment analytics view showing total bids, paid and pending counts, and a breakdown of payment methods used. The winning bidders table was also enhanced with clearer visual indicators for manual payments, including amber highlighting and inline payment method display, making payment status easier to track at a glance.',
        impact: 'medium',
      },
      {
        type: 'improvement',
        title: 'Auction Revenue Display',
        description:
          'Total auction revenue now prominently displayed in the auction status section alongside bidder count and item count.',
        impact: 'low',
      },
      {
        type: 'feature',
        title: 'New API Endpoint',
        description:
          'Added PATCH /api/auctions/auction/winning-bidder/mark-paid endpoint for admin manual payment processing. Includes payment method validation and auction revenue synchronization.',
        impact: 'high',
      },
      {
        type: 'bugfix',
        title: 'PayPal ID Naming Consistency',
        description:
          'Fixed inconsistent naming convention for PayPal ID attributes throughout the codebase. Standardized all variations (paypalId, etc.) to use camelCase "payPalId" for consistency across all schemas and API responses.',
        impact: 'low',
      },
      {
        type: 'bugfix',
        title: 'Missing PayPal ID in Instant Buy Schema',
        description:
          'Added missing payPalId field to auctionItemInstantBuyerSchema to properly track PayPal transactions for instant purchase orders. This ensures payment tracking consistency across all purchase types.',
        impact: 'medium',
      },
      {
        type: 'feature',
        title: 'Admin Changelog Page',
        description:
          'Added a dedicated changelog page for admins to view recent updates, improvements, and fixes within the application, making it easier to track changes over time.',
        impact: 'low',
      },
      {
        type: 'bugfix',
        title: 'Auction Progress Bar Overflow Fix',
        description:
          'Fixed an issue where auction progress bars could overflow their container when the percentage exceeded 100%. Progress values are now properly capped to maintain layout consistency.',
        impact: 'low',
      },
      {
        type: 'improvement',
        title: 'Navigation Cleanup & Active State Fix',
        description:
          'Removed an unused hardcoded auction item ID and improved navigation link active-state logic so links remain active when admins view item detail pages.',
        impact: 'low',
      },
      {
        type: 'feature',
        title: 'Track Last Seen Changelog Version',
        description:
          'Added a new attribute `lastSeenChangelogVersion` to the User model to track which version of the changelog each admin has seen.',
        impact: 'medium',
      },
      {
        type: 'feature',
        title: 'API Route to Update Changelog Version',
        description:
          'Created a new PATCH API route `/api/users/update-last-seen-changelog-version` that updates admin `lastSeenChangelogVersion` when they view the changelog.',
        impact: 'medium',
      },
      {
        type: 'feature',
        title: 'Admin Changelog Modal',
        description:
          'Implemented a new modal for admins that appears on dashboard login if their `lastSeenChangelogVersion` is less than the current version. Includes a blurred background and a button to view the full changelog.',
        impact: 'medium',
      },
      {
        type: 'feature',
        title: 'Added `semver` Package',
        description:
          'Installed the `semver` package in the backend to enable semantic versioning comparisons for features like changelog modals and version tracking.',
        impact: 'low',
      },
    ],
  },
];

const Changelog = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <CheckCircle2 className='w-4 h-4' />;
      case 'improvement':
        return <GitBranch className='w-4 h-4' />;
      case 'bugfix':
        return <AlertCircle className='w-4 h-4' />;
      case 'breaking':
        return <Info className='w-4 h-4' />;
      default:
        return <Info className='w-4 h-4' />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'improvement':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'bugfix':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'breaking':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getImpactBadge = (impact?: string) => {
    if (!impact) return null;

    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700',
    };

    return (
      <span
        className={`px-2 py-0.5 rounded text-xs font-semibold ${
          colors[impact as keyof typeof colors]
        }`}
      >
        {impact.toUpperCase()}
      </span>
    );
  };

  const filteredChangelog = changelogData
    .map((entry) => ({
      ...entry,
      changes:
        selectedType === 'all'
          ? entry.changes
          : entry.changes.filter((change) => change.type === selectedType),
    }))
    .filter((entry) => entry.changes.length > 0);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white border-b border-gray-200'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='min-w-0'>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>Changelog</h1>
              <p className='text-gray-600 text-sm sm:text-base mt-1'>
                Track all updates, improvements, and new features to the platform
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Filter Tabs */}
        <div className='mb-8 flex items-center gap-2 flex-wrap'>
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedType === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Changes
          </button>
          <button
            onClick={() => setSelectedType('feature')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              selectedType === 'feature'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <CheckCircle2 className='w-4 h-4' />
            Features
          </button>
          <button
            onClick={() => setSelectedType('improvement')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              selectedType === 'improvement'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <GitBranch className='w-4 h-4' />
            Improvements
          </button>
          <button
            onClick={() => setSelectedType('bugfix')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              selectedType === 'bugfix'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <AlertCircle className='w-4 h-4' />
            Bug Fixes
          </button>
        </div>

        {/* Changelog Entries */}
        <div className='space-y-8'>
          {filteredChangelog.map((entry, index) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'
            >
              {/* Version Header */}
              <div className='bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 px-6 py-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <Tag className='w-6 h-6 text-indigo-600' />
                    <div>
                      <h2 className='text-xl font-bold text-gray-900'>Version {entry.version}</h2>
                      <div className='flex items-center gap-2 mt-1'>
                        <Calendar className='w-4 h-4 text-gray-500' />
                        <span className='text-sm text-gray-600'>
                          {new Date(`${entry.date}T12:00:00`).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='text-sm font-medium text-indigo-600 bg-white px-3 py-1 rounded-full border border-indigo-200'>
                    {entry.changes.length} {entry.changes.length === 1 ? 'change' : 'changes'}
                  </div>
                </div>
              </div>

              {/* Changes List */}
              <div className='p-6 space-y-4'>
                {entry.changes.map((change, changeIndex) => (
                  <motion.div
                    key={changeIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + changeIndex * 0.05 }}
                    className='flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100'
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${getTypeColor(
                        change.type
                      )}`}
                    >
                      {getTypeIcon(change.type)}
                    </div>

                    <div className='flex-1'>
                      <div className='flex items-start justify-between gap-3 mb-2'>
                        <h3 className='font-semibold text-gray-900'>{change.title}</h3>
                        <div className='flex items-center gap-2'>
                          {getImpactBadge(change.impact)}
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(
                              change.type
                            )}`}
                          >
                            {change.type}
                          </span>
                        </div>
                      </div>
                      <p className='text-sm text-gray-600 leading-relaxed'>{change.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredChangelog.length === 0 && (
          <div className='text-center py-12 bg-white rounded-2xl border border-gray-200'>
            <Info className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <p className='text-gray-600'>No changes found for the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Changelog;
