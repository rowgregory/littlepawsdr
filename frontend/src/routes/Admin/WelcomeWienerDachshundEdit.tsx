import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../components/styles/admin/Styles';
import {
  GoBackAndTitleWrapper,
  WelcomeText,
} from '../../components/styles/DashboardStyles';
import { WELCOME_WIENER_DACHSHUND_UPDATE_RESET } from '../../constants/welcomeWienerDachshundConstants';
import {
  getWelcomeWienerDachshundDetails,
  updateWelcomeWienerDachshund,
} from '../../actions/welcomeWienerDachshundActions';
import CreateEditWelcomeWienerDachshundForm from '../../components/forms/CreateEditWelcomeWienerDachshundForm';
import useWelcomeWienerDachshundForm from '../../utils/hooks/useWelcomeWienerDachshundForm';
import { uploadMultipleFilesToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';

const WelcomeWienerDachshundEdit = () => {
  const { id } = useParams() as any;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]) as any;
  const state = useSelector((state: any) => state);
  const loadingUpdate = state.welcomeWienerDachshundUpdate.loading;
  const successUpdate = state.welcomeWienerDachshundUpdate.success;
  const loadingDetails = state.welcomeWienerDachshundDetails.loading;
  const dachshund = state.welcomeWienerDachshundDetails.dachshund;

  const updateWelcomeWienerDachshundCallback = async () => {
    setUploading(true);

    const imageUrls = await uploadMultipleFilesToFirebase(files);

    const updatedImages = [...inputs.images, ...imageUrls.filter(Boolean)];

    dispatch(
      updateWelcomeWienerDachshund({
        _id: dachshund?._id,
        name: inputs?.name,
        bio: inputs?.bio,
        age: inputs?.age,
        displayUrl: updatedImages[0],
        associatedProducts: inputs?.associatedProducts,
        images: updatedImages,
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
    addToAssociatedProducts,
    setInputs,
  } = useWelcomeWienerDachshundForm(
    updateWelcomeWienerDachshundCallback,
    dachshund
  );

  return (
    <Container>
      <GoBackAndTitleWrapper>
        <GoBackBtn to='/admin/welcome-wiener/dachshund/list' color='#121212' />
        <WelcomeText>Welcome Wiener Dachshund Edit</WelcomeText>
      </GoBackAndTitleWrapper>
      <CreateEditWelcomeWienerDachshundForm
        inputs={inputs}
        handleInput={handleInput}
        setFiles={setFiles}
        files={files}
        uploading={uploading || loadingDetails || loadingUpdate}
        onSubmit={onSubmit}
        submitBtnText='Updat'
        errors={errors}
        handleBlur={handleBlur}
        addToAssociatedProducts={addToAssociatedProducts}
        setInputs={setInputs}
      />
    </Container>
  );
};

export default WelcomeWienerDachshundEdit;
