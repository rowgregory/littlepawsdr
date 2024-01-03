import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { WELCOME_WIENER_DACHSHUND_UPDATE_RESET } from '../../constants/welcomeWienerDachshundConstants';
import {
  getWelcomeWienerDachshundDetails,
  updateWelcomeWienerDachshund,
} from '../../actions/welcomeWienerDachshundActions';
import CreateEditWelcomeWienerDachshundForm from '../../components/forms/CreateEditWelcomeWienerDachshundForm';
import useWelcomeWienerDachshundForm from '../../utils/hooks/useWelcomeWienerDachshundForm';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';

const WelcomeWienerDachshundEdit = () => {
  const { id } = useParams() as any;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;

  const state = useSelector((state: any) => state);
  const loadingUpdate = state.welcomeWienerDachshundUpdate.loading;
  const successUpdate = state.welcomeWienerDachshundUpdate.success;
  const loadingDetails = state.welcomeWienerDachshundDetails.loading;
  const dachshund = state.welcomeWienerDachshundDetails.dachshund;

  const updateWelcomeWienerDachshundCallback = async () => {
    setUploading(true);
    let image = dachshund?.displayUrl;
    if (file?.name) {
      image = await uploadFileToFirebase(file);
    }

    dispatch(
      updateWelcomeWienerDachshund({
        _id: dachshund?._id,
        name: inputs?.name,
        bio: inputs?.bio,
        age: inputs?.age,
        displayUrl: image ?? inputs?.displayUrl,
        associatedProducts: inputs?.associatedProducts,
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      history('/admin/welcome-wiener/dachshund/list');
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
    handleFileInputChange,
    addToAssociatedProducts
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
        errors={errors}
        handleBlur={handleBlur}
        handleFileInputChange={handleFileInputChange}
        addToAssociatedProducts={addToAssociatedProducts}
      />
    </Container>
  );
};

export default WelcomeWienerDachshundEdit;
