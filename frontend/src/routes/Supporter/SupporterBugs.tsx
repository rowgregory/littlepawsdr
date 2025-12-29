import { motion } from 'framer-motion';
import { Plus, AlertCircle, CheckCircle, Clock, AlertTriangle, Lock } from 'lucide-react';
import { useAppDispatch, useUserSelector } from '../../redux/toolkitStore';
import { setOpenBugDrawer } from '../../redux/features/bugSlice';
import { setInputs } from '../../redux/features/form/formSlice';

const severityColors = {
  low: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    icon: 'text-blue-500',
  },
  medium: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    icon: 'text-yellow-500',
  },
  high: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    icon: 'text-orange-500',
  },
  critical: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    icon: 'text-red-500',
  },
};

const statusColors = {
  open: { label: 'Open', color: 'bg-blue-100 text-blue-800' },
  'in-progress': { label: 'In Progress', color: 'bg-purple-100 text-purple-800' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800' },
};

const SupporterBugs = () => {
  const { user } = useUserSelector();
  const dispatch = useAppDispatch();
  const bugs = user?.bugs;

  const bugStats = {
    total: bugs?.length,
    open: bugs?.filter((b) => b.status === 'open').length,
    inProgress: bugs?.filter((b) => b.status === 'in-progress').length,
    resolved: bugs?.filter((b) => b.status === 'resolved').length,
  };

  return (
    <div className='space-y-8'>
      {/* Welcome Header with Report Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex items-center justify-between'
      >
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Report a Bug</h1>
          <p className='text-gray-600 mt-2'>Help us improve by reporting issues you encounter</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(setOpenBugDrawer())}
          className='flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors'
        >
          <Plus className='w-5 h-5' />
          Report New Bug
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
      >
        {/* Total Bugs */}
        <motion.div
          whileHover={{ y: -4 }}
          className='bg-white rounded-lg border border-gray-200 p-6'
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium'>Total Reports</p>
              <p className='text-3xl font-bold text-gray-900 mt-2'>{bugStats.total}</p>
            </div>
            <AlertCircle className='w-12 h-12 text-gray-400' />
          </div>
        </motion.div>

        {/* Open Bugs */}
        <motion.div
          whileHover={{ y: -4 }}
          className='bg-white rounded-lg border border-gray-200 p-6'
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium'>Open</p>
              <p className='text-3xl font-bold text-blue-600 mt-2'>{bugStats.open}</p>
            </div>
            <AlertTriangle className='w-12 h-12 text-blue-400' />
          </div>
        </motion.div>

        {/* In Progress */}
        <motion.div
          whileHover={{ y: -4 }}
          className='bg-white rounded-lg border border-gray-200 p-6'
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium'>In Progress</p>
              <p className='text-3xl font-bold text-purple-600 mt-2'>{bugStats.inProgress}</p>
            </div>
            <Clock className='w-12 h-12 text-purple-400' />
          </div>
        </motion.div>

        {/* Resolved */}
        <motion.div
          whileHover={{ y: -4 }}
          className='bg-white rounded-lg border border-gray-200 p-6'
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium'>Resolved</p>
              <p className='text-3xl font-bold text-green-600 mt-2'>{bugStats.resolved}</p>
            </div>
            <CheckCircle className='w-12 h-12 text-green-400' />
          </div>
        </motion.div>
      </motion.div>

      {/* Bugs List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className='bg-white rounded-lg border border-gray-200'>
          {bugs?.length === 0 ? (
            <div className='p-12 text-center'>
              <AlertCircle className='w-12 h-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>No bug reports yet</h3>
            </div>
          ) : (
            <div className='divide-y divide-gray-200'>
              {bugs?.map((bug, idx) => {
                const severity = severityColors[bug.severity];
                const status = statusColors[bug.status];
                const isClosed = bug.status === 'closed' || bug.status === 'resolved';

                return (
                  <motion.div
                    key={bug._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      if (bug.status === 'closed' || bug.status === 'resolved') {
                        return;
                      }

                      dispatch(setOpenBugDrawer());
                      dispatch(
                        setInputs({ formName: 'bugForm', data: { ...bug, isUpdating: true } })
                      );
                    }}
                    className={`p-6 transition-all ${
                      isClosed ? 'bg-gray-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <h3
                            className={`text-lg font-semibold ${
                              isClosed ? 'text-gray-500 line-through' : 'text-gray-900'
                            }`}
                          >
                            {bug.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                          >
                            {status.label}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${severity.bg} ${severity.text}`}
                          >
                            {bug.severity}
                          </span>
                          {isClosed && <Lock className='w-4 h-4 text-gray-400 ml-2' />}
                        </div>

                        <p
                          className={`text-sm mb-3 line-clamp-2 ${
                            isClosed ? 'text-gray-500' : 'text-gray-600'
                          }`}
                        >
                          {bug.description}
                        </p>

                        <div className='flex items-center gap-6 text-sm text-gray-600'>
                          <span>Category: {bug.category}</span>
                          <span>Reported: {new Date(bug.createdAt).toLocaleDateString()}</span>
                          {bug.resolvedAt && (
                            <span className='text-green-600'>
                              Resolved: {new Date(bug.resolvedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {bug.notes && bug.notes.length > 0 && (
                          <div className='mt-3 p-3 bg-blue-50 border border-blue-200 rounded'>
                            <p className='text-xs text-blue-900 font-semibold mb-1'>
                              {bug.notes.length} Admin Note{bug.notes.length !== 1 ? 's' : ''}
                            </p>
                            <p className='text-xs text-blue-800 line-clamp-2'>
                              {bug.notes[bug.notes.length - 1].text}
                            </p>
                          </div>
                        )}
                      </div>

                      {!isClosed && (
                        <motion.div whileHover={{ x: 4 }} className='text-gray-400 ml-4'>
                          <AlertCircle className='w-5 h-5' />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SupporterBugs;
