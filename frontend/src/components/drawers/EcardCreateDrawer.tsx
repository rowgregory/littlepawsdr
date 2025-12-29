import { useCreateEcardMutation } from '../../redux/services/ecardApi';
import AdminEcardForm from '../forms/AdminEcardForm';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { createFormActions, setInputs } from '../../redux/features/form/formSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { setCloseEcardCreateDrawer } from '../../redux/features/ecardSlice';

const EcardCreateDrawer = () => {
  const dispatch = useAppDispatch();
  const [createEcard, { isLoading: loadingCreate }] = useCreateEcardMutation();
  const { ecardCreateForm } = useAppSelector((state: RootState) => state.form);
  const { toggleEcardCreateDrawer } = useAppSelector((state: RootState) => state.ecard);
  const { handleInput } = createFormActions('ecardCreateForm', dispatch);
  const closeEcardDrawer = () => {
    dispatch(setCloseEcardCreateDrawer());
    dispatch(setInputs({ formName: 'ecardCreateForm', data: {} }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await createEcard({
        category: ecardCreateForm?.inputs.category,
        price: ecardCreateForm?.inputs.price,
        name: ecardCreateForm?.inputs.name,
        image: ecardCreateForm?.inputs.image,
      }).unwrap();

      closeEcardDrawer();
    } catch (error) {}
  };

  return (
    <AnimatePresence>
      {toggleEcardCreateDrawer && (
        <>
          <motion.div
            key='overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
            onClick={closeEcardDrawer}
          />
          <motion.div
            key='drawer'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className='min-h-screen fixed w-[500px] z-50 top-0 right-0 bg-white py-3'
          >
            <button
              onClick={closeEcardDrawer}
              className='w-fit px-3.5 py-1.5 gap-x-1 flex items-center'
            >
              <ChevronLeft className='w-4 h-4' />
              <p className='font-Matter-Regular text-sm mt-0.5'>Back to ecards</p>
            </button>
            <AdminEcardForm
              handleSubmit={handleSubmit}
              handleInput={handleInput}
              inputs={ecardCreateForm?.inputs}
              loading={loadingCreate}
              isEditMode={true}
              setInputs={setInputs}
              dispatch={dispatch}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EcardCreateDrawer;
