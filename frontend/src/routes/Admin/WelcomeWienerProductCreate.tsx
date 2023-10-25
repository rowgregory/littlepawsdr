import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { createWelcomeWienerProduct } from '../../actions/welcomeWienerProductActions';
import { WELCOME_WIENER_PRODUCT_CREATE_RESET } from '../../constants/welcomeWienerProductConstants';
import CreateEditWelcomeWienerProductForm from '../../components/forms/CreateEditWelcomeWienerProductForm';
import useWelcomeWienerProductForm from '../../utils/hooks/useWelcomeWienerProductForm';

const WelcomeWienerProductCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const loading = state.welcomeWienerProductCreate.loading;
  const success = state.welcomeWienerProductCreate.success;

  const createWelcomeWienerProductCallback = () => {
    dispatch(
      createWelcomeWienerProduct({
        name: inputs?.name,
        description: inputs?.description,
        price: inputs?.price,
        icon: inputs.icon,
      })
    );
  };

  useEffect(() => {
    if (success) {
      history.push('/admin/welcome-wiener/product/list');
      dispatch({ type: WELCOME_WIENER_PRODUCT_CREATE_RESET });
    }
  }, [dispatch, history, success]);

  const {
    onSubmit,
    handleInput,
    handleBlur,
    inputs,
    errors,
    setInputs,
    validate,
  } = useWelcomeWienerProductForm(createWelcomeWienerProductCallback);

  return (
    <Container>
      <WelcomeText className='mb-1'>Welcome Wiener Product Create</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Welcome Wiener Products'
        step4='Create'
        step5=''
        url1='/'
        url2='/admin'
        url3='/admin/welcome-wiener/product/list'
      />
      <CreateEditWelcomeWienerProductForm
        inputs={inputs}
        handleInput={handleInput}
        uploading={loading}
        onSubmit={onSubmit}
        submitBtnText='Creat'
        setInputs={setInputs}
        errors={errors}
        handleBlur={handleBlur}
        validate={validate}
      />
    </Container>
  );
};

export default WelcomeWienerProductCreate;
