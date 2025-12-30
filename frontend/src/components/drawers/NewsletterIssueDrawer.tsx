import {
  useAppDispatch,
  useFormSelector,
  useNewsletterIssueSelector,
} from '../../redux/toolkitStore';
import { createFormActions, resetForm } from '../../redux/features/form/formSlice';
import {
  useCreateNewsletterIssueMutation,
  useUpdateNewsletterIssueMutation,
} from '../../redux/services/newsletterIssueApi';
import validateNewsletterIssueForm from '../../validations/validateNewsletterIssueForm';
import { showToast } from '../../redux/features/toastSlice';
import { setCloseNewsletterIssueDrawer } from '../../redux/features/newsletterIssueSlice';
import { AnimatePresence, motion } from 'framer-motion';
import NewsletterIssueForm from '../forms/NewsletterIssueForm';

const NewsletterIssueDrawer = () => {
  const dispatch = useAppDispatch();
  const { handleInput, setErrors } = createFormActions('newsletterIssueForm', dispatch);

  const [createNewsletterIssue, { isLoading: loadingCreate }] = useCreateNewsletterIssueMutation();
  const [updateNewsletterIssue, { isLoading: loadingUpdate }] = useUpdateNewsletterIssueMutation();

  const { newsletterIssueForm } = useFormSelector();
  const { newsletterIssueDrawer } = useNewsletterIssueSelector();

  const inputs = newsletterIssueForm?.inputs;
  const errors = newsletterIssueForm?.errors;
  const isUpdating = inputs?.isUpdating;
  const isLoading = loadingCreate || loadingUpdate;

  const onClose = () => {
    dispatch(setCloseNewsletterIssueDrawer());
    dispatch(resetForm('newsletterIssueForm'));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateNewsletterIssueForm(inputs, setErrors)) return;

    try {
      const dataToSubmit = {
        year: inputs?.year,
        quarter: inputs.quarter,
        title: inputs.title,
        description: inputs.description,
        photos: inputs.photos,
      };

      if (isUpdating) {
        await updateNewsletterIssue({
          id: inputs._id,
          ...dataToSubmit,
        }).unwrap();
      } else {
        await createNewsletterIssue(dataToSubmit).unwrap();
      }

      dispatch(
        showToast({
          message: `Successfully ${isUpdating ? 'updated' : 'created'} newsletter issue`,
          type: 'success',
        })
      );
      onClose();
    } catch (error: any) {
      console.log('ERROR: ', error);
    }
  };

  return (
    <AnimatePresence>
      {newsletterIssueDrawer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className='fixed inset-0 bg-black/50 z-50'
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className='fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl flex flex-col'
          >
            <NewsletterIssueForm
              inputs={inputs}
              errors={errors}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              isUpdating={isUpdating}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterIssueDrawer;
