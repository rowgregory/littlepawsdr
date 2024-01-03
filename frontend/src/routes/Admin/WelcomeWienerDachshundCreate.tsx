import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { WELCOME_WIENER_DACHSHUND_CREATE_RESET } from '../../constants/welcomeWienerDachshundConstants';
import { createWelcomeWienerDachshund } from '../../actions/welcomeWienerDachshundActions';
import CreateEditWelcomeWienerDachshundForm from '../../components/forms/CreateEditWelcomeWienerDachshundForm';
import useWelcomeWienerDachshundForm from '../../utils/hooks/useWelcomeWienerDachshundForm';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';

const WelcomeWienerDachshundCreate = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;
  const state = useSelector((state: any) => state);
  const loading = state.welcomeWienerDachshundCreate.loading;
  const success = state.welcomeWienerDachshundCreate.success;

  const createWelcomeWienerDachshundCallback = async () => {
    setUploading(true);

    const image = await uploadFileToFirebase(file);

    dispatch(
      createWelcomeWienerDachshund({
        name: inputs?.name,
        bio: inputs?.bio,
        age: inputs?.age,
        displayUrl: image,
        associatedProducts: inputs?.associatedProducts?.map((obj) => obj?._id),
      })
    );
  };

  useEffect(() => {
    if (success) {
      history('/admin/welcome-wiener/dachshund/list');
      dispatch({ type: WELCOME_WIENER_DACHSHUND_CREATE_RESET });
    }
  }, [dispatch, history, success]);

  const {
    onSubmit,
    handleInput,
    handleBlur,
    inputs,
    errors,
    handleFileInputChange,
    addToAssociatedProducts,
  } = useWelcomeWienerDachshundForm(
    createWelcomeWienerDachshundCallback,
    setFile
  );

  return (
    <Container>
      <WelcomeText className='mb-1'>
        Welcome Wiener Dachshund Create
      </WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Welcome Wiener Dachshunds'
        step4='Create'
        step5=''
        url1='/'
        url2='/admin'
        url3='/admin/welcome-wiener/dachshund/list'
      />
      <CreateEditWelcomeWienerDachshundForm
        inputs={inputs}
        handleInput={handleInput}
        file={file}
        uploading={uploading || loading}
        onSubmit={onSubmit}
        submitBtnText='Creat'
        errors={errors}
        handleBlur={handleBlur}
        handleFileInputChange={handleFileInputChange}
        addToAssociatedProducts={addToAssociatedProducts}
      />
    </Container>
  );
};

export default WelcomeWienerDachshundCreate;
