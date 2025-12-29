import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppDispatch, useBugSelector, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions, resetForm } from '../../redux/features/form/formSlice';
import { useCreateBugMutation, useUpdateBugMutation } from '../../redux/services/bugApi';
import { setCloseBugDrawer } from '../../redux/features/bugSlice';
import { showToast } from '../../redux/features/toastSlice';
import BugForm from '../forms/BugForm';

const validateForm = (inputs, setErrors) => {
  const newErrors: Record<string, string> = {};

  if (!inputs.title?.trim()) {
    newErrors.title = 'Title is required';
  } else if (inputs.title.length < 5) {
    newErrors.title = 'Title must be at least 5 characters';
  }

  if (!inputs.description?.trim()) {
    newErrors.description = 'Description is required';
  } else if (inputs.description.length < 20) {
    newErrors.description = 'Description must be at least 20 characters';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const BugDrawer = () => {
  const dispatch = useAppDispatch();
  const { bugForm } = useFormSelector();
  const { bugDrawer } = useBugSelector();
  const { handleInput, setErrors } = createFormActions('bugForm', dispatch);
  const [createBug, { isLoading: lodingCreate }] = useCreateBugMutation();
  const [updateBug, { isLoading: loadingUpdate }] = useUpdateBugMutation();

  const inputs = bugForm?.inputs || {};
  const errors = bugForm?.errors || {};
  const isUpdating = inputs?.isUpdating || false;
  const isLoading = loadingUpdate || lodingCreate;
  const onClose = () => dispatch(setCloseBugDrawer());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(inputs, setErrors)) return;

    try {
      if (isUpdating) {
        // Update existing bug
        await updateBug({
          _id: inputs._id,
          title: inputs.title,
          description: inputs.description,
          severity: inputs.severity,
          category: inputs.category,
          url: inputs.url,
          steps: inputs.steps,
          expectedBehavior: inputs.expectedBehavior,
          actualBehavior: inputs.actualBehavior,
          status: inputs.status,
        }).unwrap();
      } else {
        // Create new bug
        await createBug({
          title: inputs.title,
          description: inputs.description,
          severity: inputs.severity || 'medium',
          category: inputs.category || 'other',
          url: inputs.url,
          steps: inputs.steps,
          expectedBehavior: inputs.expectedBehavior,
          actualBehavior: inputs.actualBehavior,
        }).unwrap();
      }

      // Success
      dispatch(
        showToast({ message: isUpdating ? 'Bug updated!' : 'Bug created!', type: 'success' })
      );
      dispatch(resetForm('bugForm'));
      onClose();
    } catch (error: any) {
      dispatch(
        showToast({
          message: isUpdating ? 'Failed to update bug' : 'Failed to create bug',
          type: 'error',
        })
      );
    }
  };

  return (
    <AnimatePresence>
      {bugDrawer && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-[100]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Drawer */}
          <motion.div
            className='fixed right-0 top-0 h-screen w-full max-w-2xl bg-white z-[101] overflow-y-auto'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className='sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>
                  {isUpdating ? 'Update Bug Report' : 'Report a New Bug'}
                </h2>
                <p className='text-gray-600 text-sm mt-1'>
                  {isUpdating
                    ? 'Help us fix this issue by providing more details'
                    : 'Tell us what went wrong. The more details, the better!'}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <X className='w-6 h-6 text-gray-900' />
              </motion.button>
            </div>

            {/* Content */}
            <div className='p-6'>
              {errors?.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'
                >
                  <p className='text-red-700 text-sm'>{errors.submit}</p>
                </motion.div>
              )}

              <BugForm
                inputs={inputs}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                errors={errors}
                isUpdating={isUpdating}
                loading={isLoading}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BugDrawer;
