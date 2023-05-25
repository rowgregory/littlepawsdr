import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import {
  getWelcomeWienerProductDetails,
  updateWelcomeWienerProduct,
} from '../../actions/welcomeWienerProductActions';
import { WELCOME_WIENER_PRODUCT_UPDATE_RESET } from '../../constants/welcomeWienerProductConstants';
import CreateEditWelcomeWienerProductForm from '../../components/forms/CreateEditWelcomeWienerProductForm';
import useWelcomeWienerProductForm from '../../utils/hooks/useWelcomeWienerProductForm';

const WelcomeWienerProductEdit = () => {
  const { id } = useParams() as any;
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  const loadingUpdate = state.welcomeWienerProductUpdate.loading;
  const successUpdate = state.welcomeWienerProductUpdate.success;

  const loadingDetails = state.welcomeWienerProductDetails.loading;
  const product = state.welcomeWienerProductDetails.product;

  const updateWelcomeWienerProductCallback = async () => {
    dispatch(
      updateWelcomeWienerProduct({
        _id: id,
        name: inputs?.name,
        description: inputs?.description,
        price: inputs?.price,
        icon: inputs?.icon,
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      history.push('/admin/welcome-wiener/product/list');
      dispatch({ type: WELCOME_WIENER_PRODUCT_UPDATE_RESET });
    } else if (id) {
      dispatch(getWelcomeWienerProductDetails(id));
    }
  }, [dispatch, history, id, successUpdate]);

  const {
    onSubmit,
    handleInput,
    handleBlur,
    inputs,
    errors,
    setInputs,
    validate,
  } = useWelcomeWienerProductForm(updateWelcomeWienerProductCallback, product);

  return (
    <Container>
      <WelcomeText className='mb-1'>Welcome Wiener Product Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Welcome Wiener Products'
        step4='Edit'
        step5=''
        url1='/'
        url2='/admin'
        url3='/admin/welcome-wiener/product/list'
      />
      <CreateEditWelcomeWienerProductForm
        inputs={inputs}
        handleInput={handleInput}
        uploading={loadingDetails || loadingUpdate}
        onSubmit={onSubmit}
        submitBtnText='Updat'
        setInputs={setInputs}
        errors={errors}
        handleBlur={handleBlur}
        validate={validate}
      />
    </Container>
  );
};

export default WelcomeWienerProductEdit;
