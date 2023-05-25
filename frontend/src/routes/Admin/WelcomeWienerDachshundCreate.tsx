import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import API from '../../utils/api';
import { WELCOME_WIENER_DACHSHUND_CREATE_RESET } from '../../constants/welcomeWienerDachshundConstants';
import { createWelcomeWienerDachshund } from '../../actions/welcomeWienerDachshundActions';
import CreateEditWelcomeWienerDachshundForm from '../../components/forms/CreateEditWelcomeWienerDachshundForm';
import useWelcomeWienerDachshundForm from '../../utils/hooks/useWelcomeWienerDachshundForm';

const WelcomeWienerDachshundCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imgUploadStatus, setImageUploadStatus] = useState('');

  const {
    welcomeWienerDachshundCreate: {
      loading: loadingCreate,
      success: successCreate,
    },
  } = useSelector((state: any) => state);

  const createWelcomeWienerDachshundCallback = async () => {
    let image;
    if (file?.name) {
      setUploading(true);
      setImageUploadStatus('Uploading to Imgbb');
      const formData = new FormData();
      formData.append('image', file);
      image = await API.uploadImageToImgbb(formData);
      setImageUploadStatus('Image uploaded!');
    }

    dispatch(
      createWelcomeWienerDachshund({
        name: inputs?.name,
        bio: inputs?.bio,
        age: inputs?.age,
        displayUrl: image?.data?.url,
        associatedProducts: inputs?.associatedProducts?.map((obj) => obj?._id),
      })
    );
  };

  useEffect(() => {
    if (successCreate) {
      history.push('/admin/welcome-wiener/dachshund/list');
      dispatch({ type: WELCOME_WIENER_DACHSHUND_CREATE_RESET });
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
        uploading={uploading || loadingCreate}
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

export default WelcomeWienerDachshundCreate;
