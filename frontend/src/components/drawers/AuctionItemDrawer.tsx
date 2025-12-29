import { useAppDispatch, useAuctionSelector, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions, resetForm, setInputs } from '../../redux/features/form/formSlice';
import { AnimatePresence, motion } from 'framer-motion';
import AuctionItemForm from '../forms/auction/AuctionItemForm';
import validateAuctionItemForm from '../../validations/validateAuctionItemForm';
import { showToast } from '../../redux/features/toastSlice';
import {
  useCreateAuctionItemMutation,
  useUpdateAuctionItemMutation,
} from '../../redux/services/auctionApi';
import { setCloseAuctionItemDrawer } from '../../redux/features/auctionSlice';
import { useEffect } from 'react';

const AuctionItemDrawer = () => {
  const dispatch = useAppDispatch();
  const { auction, auctionItemDrawer } = useAuctionSelector();
  const [createAuctionItem, { isLoading: loadingCreate }] = useCreateAuctionItemMutation();
  const [updateAuctionItem, { isLoading: loadingUpdate }] = useUpdateAuctionItemMutation();
  const { auctionItemForm } = useFormSelector();
  const { handleInput, handleToggle, setErrors } = createFormActions('auctionItemForm', dispatch);
  const inputs = auctionItemForm?.inputs;
  const errors = auctionItemForm?.errors;
  const isLoading = loadingCreate || loadingUpdate;
  const isUpdating = inputs?.isUpdating;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateAuctionItemForm(inputs, setErrors)) return;

    try {
      const itemData = {
        auction: auction._id,
        photos: inputs?.photos,
        name: inputs?.name,
        description: inputs?.description,
        sellingFormat: inputs?.sellingFormat,
        requiresShipping: inputs?.requiresShipping,
        shippingCosts: inputs?.shippingCosts,

        ...(inputs?.sellingFormat === 'fixed' && {
          buyNowPrice: inputs?.buyNowPrice,
          isDigital: inputs?.isDigital,
          totalQuantity: inputs?.totalQuantity,
        }),
        ...(inputs?.sellingFormat === 'auction' && {
          startingPrice: inputs?.startingPrice,
          totalQuantity: 1,
        }),
      };

      if (isUpdating) {
        // Update existing item
        await updateAuctionItem({
          id: inputs?._id,
          ...itemData,
        }).unwrap();

        dispatch(
          showToast({
            message: 'Successfully updated auction item!',
            type: 'success',
          })
        );
      } else {
        await createAuctionItem(itemData).unwrap();

        dispatch(
          showToast({
            message: 'Successfully created an auction item!',
            type: 'success',
          })
        );
      }

      onClose();
    } catch (error) {
      dispatch(
        showToast({
          message: error instanceof Error ? error.message : 'Error processing item',
          type: 'error',
        })
      );
    }
  };

  const onClose = () => {
    dispatch(resetForm('auctionItemForm'));
    dispatch(setCloseAuctionItemDrawer());
  };

  useEffect(() => {
    if (inputs?.isDigital) {
      dispatch(
        setInputs({
          formName: 'auctionItemForm',
          data: { shippingCosts: 0, requiresShipping: false },
        })
      );
    } else {
      dispatch(
        setInputs({
          formName: 'auctionItemForm',
          data: { requiresShipping: true, isDigital: false },
        })
      );
    }
  }, [dispatch, inputs?.isDigital]);

  return (
    <AnimatePresence>
      {auctionItemDrawer && (
        <>
          <motion.div
            key='overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
            onClick={onClose}
          />
          <motion.div
            key='drawer'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className='min-h-screen fixed w-full md:w-[700px] z-50 top-0 right-0'
          >
            <AuctionItemForm
              inputs={inputs}
              errors={errors}
              loading={isLoading}
              handleInput={handleInput}
              handleToggle={handleToggle}
              handleSubmit={handleSubmit}
              onClose={onClose}
              isUpdating={isUpdating}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuctionItemDrawer;
