import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/toolkitStore';
import { setInputs } from '../redux/features/form/formSlice';

interface UseFormInitializeProps {
  formName: string;
  data: any;
  shouldInitialize?: boolean;
}

export const useFormInitialize = ({
  formName,
  data,
  shouldInitialize = true,
}: UseFormInitializeProps) => {
  const dispatch = useAppDispatch();
  const formInputs = useAppSelector((state) => state.form[formName]?.inputs);

  useEffect(() => {
    // Only initialize if form is empty and should initialize
    if (!shouldInitialize || !data) return;

    const isEmpty = Object.values(formInputs || {}).every((val) => !val);

    if (isEmpty) {
      dispatch(
        setInputs({
          formName,
          data: {
            ...formInputs, // Keep existing inputs
            ...data, // Add/update new inputs
          },
        })
      );
    }
  }, [formName, data, dispatch, formInputs, shouldInitialize]);
};
