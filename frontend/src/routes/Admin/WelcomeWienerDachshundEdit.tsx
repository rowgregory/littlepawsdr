import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import API from '../../utils/api';
import { WELCOME_WIENER_DACHSHUND_UPDATE_RESET } from '../../constants/welcomeWienerDachshundConstants';
import {
  getWelcomeWienerDachshundDetails,
  updateWelcomeWienerDachshund,
} from '../../actions/welcomeWienerDachshundActions';
import CreateEditWelcomeWienerDachshundForm from '../../components/forms/CreateEditWelcomeWienerDachshundForm';
import useWelcomeWienerDachshundForm from '../../utils/hooks/useWelcomeWienerDachshundForm';

const WelcomeWienerDachshundEdit = () => {
  const { id } = useParams() as any;
  const history = useHistory();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;

  const {
    welcomeWienerDachshundUpdate: {
      loading: loadingUpdate,
      success: successUpdate,
    },
    welcomeWienerDachshundDetails: { loading: loadingDetails, dachshund },
  } = useSelector((state: any) => state);

  const updateWelcomeWienerDachshundCallback = async () => {
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
      updateWelcomeWienerDachshund({
        _id: dachshund?._id,
        name: inputs?.name,
        bio: inputs?.bio,
        age: inputs?.age,
        displayUrl: image?.data?.url ?? inputs?.displayUrl,
        associatedProducts: inputs?.associatedProducts,
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      history.push('/admin/welcome-wiener/dachshund/list');
      dispatch({ type: WELCOME_WIENER_DACHSHUND_UPDATE_RESET });
    } else {
      dispatch(getWelcomeWienerDachshundDetails(id));
    }
  }, [dispatch, history, id, successUpdate]);

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
    updateWelcomeWienerDachshundCallback,
    setFile,
    dachshund
  );

  return (
    <Container>
      <WelcomeText className='mb-1'>Welcome Wiener Dachshund Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Welcome Wiener Dachshunds'
        step4='Edit'
        step5=''
        url1='/'
        url2='/admin'
        url3='/admin/welcome-wiener/dachshund/list'
      />
      <CreateEditWelcomeWienerDachshundForm
        inputs={inputs}
        handleInput={handleInput}
        file={file}
        uploading={uploading || loadingDetails || loadingUpdate}
        setFile={setFile}
        onSubmit={onSubmit}
        submitBtnText='Updat'
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

export default WelcomeWienerDachshundEdit;
