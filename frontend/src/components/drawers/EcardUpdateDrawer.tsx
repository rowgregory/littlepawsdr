import { useEffect } from 'react';
import { useUpdateEcardMutation } from '../../redux/services/ecardApi';
import AdminEcardForm from '../forms/AdminEcardForm';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { createFormActions, setInputs } from '../../redux/features/form/formSlice';
import { setCloseEcardUpdateDrawer } from '../../redux/features/ecardSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const EcardUpdateDrawer = () => {
  const dispatch = useAppDispatch();
  const [updateEcard, { isLoading: loadingUpdate }] = useUpdateEcardMutation();
  const { ecardUpdateForm } = useAppSelector((state: RootState) => state.form);
  const { toggleEcardUpdateDrawer, ecard } = useAppSelector((state: RootState) => state.ecard);
  const { handleInput } = createFormActions('ecardUpdateForm', dispatch);

  useEffect(() => {
    if (ecard?.name && !ecardUpdateForm?.inputs?.name) {
      dispatch(
        setInputs({
          formName: 'ecardUpdateForm',
          data: {
            id: ecard._id,
            category: ecard.category,
            price: ecard.price,
            name: ecard.name,
            image: ecard.image,
          },
        })
      );
    }
  }, [dispatch, ecard, ecardUpdateForm?.inputs?.name]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await updateEcard({
        id: ecardUpdateForm?.inputs?._id,
        category: ecardUpdateForm?.inputs.category,
        price: ecardUpdateForm?.inputs.price,
        name: ecardUpdateForm?.inputs.name,
        image: ecardUpdateForm?.inputs.image,
      }).unwrap();

      closeEcardDrawer();
    } catch (error) {}
  };

  const closeEcardDrawer = () => {
    dispatch(setCloseEcardUpdateDrawer());
    dispatch(setInputs({ formName: 'ecardUpdateForm', data: null }));
  };

  return (
    <AnimatePresence>
      {toggleEcardUpdateDrawer && (
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
              inputs={ecardUpdateForm?.inputs}
              loading={loadingUpdate}
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

export default EcardUpdateDrawer;
