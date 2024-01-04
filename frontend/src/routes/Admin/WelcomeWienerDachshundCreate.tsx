import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  GoBackAndTitleWrapper,
  WelcomeText,
} from '../../components/styles/DashboardStyles';
import { WELCOME_WIENER_DACHSHUND_CREATE_RESET } from '../../constants/welcomeWienerDachshundConstants';
import { createWelcomeWienerDachshund } from '../../actions/welcomeWienerDachshundActions';
import CreateEditWelcomeWienerDachshundForm from '../../components/forms/CreateEditWelcomeWienerDachshundForm';
import useWelcomeWienerDachshundForm from '../../utils/hooks/useWelcomeWienerDachshundForm';
import { uploadMultipleFilesToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';
import styled from 'styled-components';

export const Container = styled.div`
  background: #f6f9fe;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  min-height: 100vh;
`;

const WelcomeWienerDachshundCreate = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]) as any;
  const state = useSelector((state: any) => state);
  const loading = state.welcomeWienerDachshundCreate.loading;
  const success = state.welcomeWienerDachshundCreate.success;

  const createWelcomeWienerDachshundCallback = async () => {
    setUploading(true);

    const imageUrls = await uploadMultipleFilesToFirebase(files);

    dispatch(
      createWelcomeWienerDachshund({
        name: inputs?.name,
        bio: inputs?.bio,
        age: inputs?.age,
        displayUrl: imageUrls[0],
        associatedProducts: inputs?.associatedProducts?.map((obj) => obj?._id),
        images: imageUrls.filter(Boolean),
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
    addToAssociatedProducts,
    setInputs,
  } = useWelcomeWienerDachshundForm(createWelcomeWienerDachshundCallback);

  return (
    <Container>
      <GoBackAndTitleWrapper>
        <GoBackBtn to='/admin/welcome-wiener/dachshund/list' color='#121212' />
        <WelcomeText>Welcome Wiener Dachshund Create</WelcomeText>
      </GoBackAndTitleWrapper>
      <CreateEditWelcomeWienerDachshundForm
        inputs={inputs}
        handleInput={handleInput}
        setFiles={setFiles}
        files={files}
        uploading={uploading || loading}
        onSubmit={onSubmit}
        submitBtnText='Creat'
        errors={errors}
        handleBlur={handleBlur}
        addToAssociatedProducts={addToAssociatedProducts}
        setInputs={setInputs}
      />
    </Container>
  );
};

export default WelcomeWienerDachshundCreate;
