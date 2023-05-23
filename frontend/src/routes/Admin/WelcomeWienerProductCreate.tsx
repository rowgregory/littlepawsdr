import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import API from '../../utils/api';
import { createWelcomeWienerProduct } from '../../actions/welcomeWienerProductActions';
import { WELCOME_WIENER_PRODUCT_CREATE_RESET } from '../../constants/welcomeWienerProductConstants';
import CreateEditWelcomeWienerProductForm from '../../components/forms/CreateEditWelcomeWienerProductForm';
import useWelcomeWienerProductForm from '../../utils/hooks/useWelcomeWienerProductForm';

const WelcomeWienerProductCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;

  const {
    welcomeWienerProductCreate: {
      loading: loadingCreate,
      success: successCreate,
    },
  } = useSelector((state: any) => state);

  const createWelcomeWienerProductCallback = async () => {
    let image;
    if (file) {
      setUploading(true);
      setImageUploadStatus('Uploading to Imgbb');
      const formData = new FormData();
      formData.append('image', file);
      image = await API.uploadImageToImgbb(formData);
      setImageUploadStatus('Image uploaded!');
    }

    dispatch(
      createWelcomeWienerProduct({
        name: inputs?.name,
        description: inputs?.description,
        price: inputs?.price,
        displayUrl: image?.data?.url,
      })
    );
  };

  useEffect(() => {
    if (successCreate) {
      history.push('/admin/welcome-wiener/product/list');
      dispatch({ type: WELCOME_WIENER_PRODUCT_CREATE_RESET });
    }
  }, [dispatch, history, successCreate]);

  const {
    onSubmit,
    handleInput,
    handleBlur,
    inputs,
    errors,
    setInputs,
    handleFileInputChange,
    validate,
  } = useWelcomeWienerProductForm(createWelcomeWienerProductCallback, setFile);

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
        file={file}
        uploading={uploading || loadingCreate}
        setFile={setFile}
        onSubmit={onSubmit}
        submitBtnText='Creat'
        imgUploadStatus={imgUploadStatus}
        setInputs={setInputs}
        errors={errors}
        handleBlur={handleBlur}
        handleFileInputChange={handleFileInputChange}
        validate={validate}
      />
    </Container>
  );
};

export default WelcomeWienerProductCreate;
