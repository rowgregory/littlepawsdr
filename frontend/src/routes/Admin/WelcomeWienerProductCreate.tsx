import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/styles/admin/Styles';
import { GoBackAndTitleWrapper, WelcomeText } from '../../components/styles/DashboardStyles';
import { createWelcomeWienerProduct } from '../../actions/welcomeWienerProductActions';
import { WELCOME_WIENER_PRODUCT_CREATE_RESET } from '../../constants/welcomeWienerProductConstants';
import CreateEditWelcomeWienerProductForm from '../../components/forms/CreateEditWelcomeWienerProductForm';
import useWelcomeWienerProductForm from '../../utils/hooks/useWelcomeWienerProductForm';
import GoBackBtn from '../../utils/GoBackBtn';

const WelcomeWienerProductCreate = () => {
  const history = useNavigate();
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
      history('/admin/welcome-wiener/product/list');
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
      <GoBackAndTitleWrapper>
        <GoBackBtn to='/admin/welcome-wiener/product/list' color='#121212' />
        <WelcomeText>Welcome Wiener Product Create</WelcomeText>
      </GoBackAndTitleWrapper>
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
