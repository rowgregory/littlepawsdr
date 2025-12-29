import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, AlertTriangle, Zap, Filter, X } from 'lucide-react';
import { useAppDispatch } from '../../redux/toolkitStore';
import { setInputs } from '../../redux/features/form/formSlice';
import { IBug } from '../../types/entities/bug';
import { useGetBugsQuery } from '../../redux/services/bugApi';
import { setOpenBugDrawer } from '../../redux/features/bugSlice';
import { useState } from 'react';

const severityColors = {
  low: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    icon: 'text-blue-500',
    badge: 'bg-blue-100 text-blue-800',
  },
  medium: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    icon: 'text-yellow-500',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  high: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    icon: 'text-orange-500',
    badge: 'bg-orange-100 text-orange-800',
  },
  critical: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    icon: 'text-red-500',
    badge: 'bg-red-100 text-red-800',
  },
};

const statusColors = {
  open: { label: 'Open', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  'in-progress': { label: 'In Progress', color: 'bg-purple-100 text-purple-800', icon: Clock },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800', icon: AlertTriangle },
};

const AdminBugs = () => {
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState({
    status: '',
    severity: '',
    category: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Build query params from filters
  const queryParams = Object.entries(filters).reduce((acc, [key, value]) => {
    if (value) acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const { data, isLoading } = useGetBugsQuery(queryParams);
  const bugs = data?.bugs || [];

  const bugStats = {
    total: bugs.length,
    open: bugs.filter((b: { status: string }) => b.status === 'open').length,
    inProgress: bugs.filter((b: { status: string }) => b.status === 'in-progress').length,
    resolved: bugs.filter((b: { status: string }) => b.status === 'resolved').length,
    closed: bugs.filter((b: { status: string }) => b.status === 'closed').length,
  };

  const criticalCount = bugs.filter((b: { severity: string }) => b.severity === 'critical').length;

  // Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === prev[key] ? '' : value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ status: '', severity: '', category: '' });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v);

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
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>Bug Reports</h1>
              <p className='text-gray-600 text-sm sm:text-base mt-1'>
                Review and manage all user-submitted bug reports
              </p>
            </div>
            {criticalCount > 0 && (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className='flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg'
              >
                <Zap className='w-5 h-5 text-red-600' />
                <span className='font-semibold text-red-700'>{criticalCount} Critical Issues</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          {/* Total Bugs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-lg border border-gray-200 p-6'
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-gray-100 rounded-lg'>
                <AlertCircle className='w-5 h-5 text-gray-700' />
              </div>
              <h3 className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                Total Reports
              </h3>
            </div>
            <p className='text-3xl font-bold text-gray-900'>{bugStats.total}</p>
          </motion.div>

          {/* Open Bugs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='bg-white rounded-lg border border-gray-200 p-6'
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <AlertTriangle className='w-5 h-5 text-blue-700' />
              </div>
              <h3 className='text-sm font-medium text-gray-600 uppercase tracking-wide'>Open</h3>
            </div>
            <p className='text-3xl font-bold text-blue-600'>{bugStats.open}</p>
          </motion.div>

          {/* In Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='bg-white rounded-lg border border-gray-200 p-6'
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <Clock className='w-5 h-5 text-purple-700' />
              </div>
              <h3 className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                In Progress
              </h3>
            </div>
            <p className='text-3xl font-bold text-purple-600'>{bugStats.inProgress}</p>
          </motion.div>

          {/* Resolved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='bg-white rounded-lg border border-gray-200 p-6'
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <CheckCircle className='w-5 h-5 text-green-700' />
              </div>
              <h3 className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                Resolved
              </h3>
            </div>
            <p className='text-3xl font-bold text-green-600'>{bugStats.resolved}</p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='mb-8'
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
          >
            <Filter className='w-4 h-4' />
            <span className='font-medium text-gray-900'>Filters</span>
            {hasActiveFilters && (
              <span className='ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded'>
                {Object.values(filters).filter(Boolean).length} active
              </span>
            )}
          </button>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-4 p-6 bg-white border border-gray-200 rounded-lg'
            >
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                {/* Status Filter */}
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-3'>Status</label>
                  <div className='space-y-2'>
                    {['open', 'in-progress', 'resolved', 'closed'].map((status) => (
                      <motion.button
                        key={status}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleFilterChange('status', status)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          filters.status === status
                            ? 'bg-blue-100 text-blue-900 font-semibold'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {statusColors[status as keyof typeof statusColors].label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Severity Filter */}
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-3'>Severity</label>
                  <div className='space-y-2'>
                    {['low', 'medium', 'high', 'critical'].map((severity) => (
                      <motion.button
                        key={severity}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleFilterChange('severity', severity)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          filters.severity === severity
                            ? `${
                                severityColors[severity as keyof typeof severityColors].badge
                              } font-semibold`
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {severity.charAt(0).toUpperCase() + severity.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-3'>Category</label>
                  <div className='space-y-2'>
                    {['ui', 'functionality', 'performance', 'payment', 'other'].map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleFilterChange('category', category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          filters.category === category
                            ? 'bg-blue-100 text-blue-900 font-semibold'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearFilters}
                  className='mt-6 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors'
                >
                  <X className='w-4 h-4' />
                  Clear All Filters
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Bugs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='bg-white rounded-lg border border-gray-200'
        >
          {isLoading ? (
            <div className='p-12 text-center'>
              <p className='text-gray-600'>Loading bug reports...</p>
            </div>
          ) : bugs.length === 0 ? (
            <div className='p-12 text-center'>
              <CheckCircle className='w-12 h-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>No bug reports</h3>
              <p className='text-gray-600'>All systems running smoothly!</p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='border-b border-gray-200 bg-gray-50'>
                  <tr>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>
                      Title
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>
                      Reporter
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>
                      Severity
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>
                      Category
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>
                      Reported
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {bugs.map((bug: IBug, idx: number) => {
                    const severity = severityColors[bug.severity];
                    const status = statusColors[bug.status];
                    const StatusIcon = status.icon;

                    return (
                      <motion.tr
                        key={bug._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className='hover:bg-gray-50 transition-colors'
                      >
                        <td className='px-6 py-4'>
                          <p className='font-medium text-gray-900 truncate max-w-xs'>{bug.title}</p>
                          <p className='text-xs text-gray-600 truncate max-w-xs mt-1'>
                            {bug.description}
                          </p>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex flex-col'>
                            <p className='text-sm font-medium text-gray-900'>{bug.user.name}</p>
                            <p className='text-xs text-gray-600'>{bug.user.email}</p>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${severity.badge}`}
                          >
                            {bug.severity.charAt(0).toUpperCase() + bug.severity.slice(1)}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <StatusIcon className='w-4 h-4' />
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                            >
                              {status.label}
                            </span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <span className='text-sm text-gray-600 capitalize'>{bug.category}</span>
                        </td>
                        <td className='px-6 py-4'>
                          <span className='text-sm text-gray-600'>
                            {new Date(bug.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              dispatch(setOpenBugDrawer());
                              dispatch(
                                setInputs({
                                  formName: 'bugForm',
                                  data: { ...bug, isUpdating: true },
                                })
                              );
                            }}
                            className='px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors'
                          >
                            Manage
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminBugs;
