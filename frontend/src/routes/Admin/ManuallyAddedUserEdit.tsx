import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import {
  StyledUloadedImg,
  Text,
  UpdateBtn,
} from '../../components/styles/Styles';
import GoBackBtn from '../../utils/GoBackBtn';
import { FormFile } from './EventEdit';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { EditBtn } from './RaffleWinnerEdit';
import toaster from 'toasted-notes';
import { ToastAlert } from '../../components/common/ToastAlert';
import Loader from '../../components/Loader';
import {
  getManuallyAddedUserDetails,
  updateManuallyAddedUser,
} from '../../actions/manuallyAddUserActions';
import { MANUALLY_ADD_USER_UPDATE_RESET } from '../../constants/manuallyAddUserConstants';
import { LoadingImg } from '../../components/LoadingImg';

const ManuallyAddedUserEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const manuallyAddedUserId = match.params.id;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [publicId, setPublicId] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);

  const manuallyAddedUserDetails = useSelector(
    (state: any) => state.manuallyAddedUserDetails
  );
  const { loading, error, manuallyAddedUser } = manuallyAddedUserDetails;

  const uploadDefaultImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1628374521/upload_2.png';

  const manuallyAddedUserUpdate = useSelector(
    (state: any) => state.manuallyAddedUserUpdate
  );
  const {
    loading: loadingManuallyAddedUserUpdate,
    error: errorUpdate,
    success: successManuallyAddedUserUpdate,
  } = manuallyAddedUserUpdate;

  useEffect(() => {
    dispatch(getManuallyAddedUserDetails(manuallyAddedUserId));
  }, [dispatch, manuallyAddedUserId]);

  useEffect(() => {
    if (successManuallyAddedUserUpdate) {
      if (submittedForm) {
        setSubmittedForm(false);
        return history.push('/admin/manuallyAddedUserList');
      }
      dispatch(getManuallyAddedUserDetails(manuallyAddedUserId));
      dispatch({ type: MANUALLY_ADD_USER_UPDATE_RESET });
    } else {
      setName(manuallyAddedUser?.name);
      setImage(manuallyAddedUser?.image);
      setAffiliation(manuallyAddedUser?.affiliation);
      setMessage(manuallyAddedUser?.message);
      setPublicId(manuallyAddedUser?.publicId);
    }
  }, [
    dispatch,
    history,
    submittedForm,
    successManuallyAddedUserUpdate,
    manuallyAddedUser,
    manuallyAddedUserId,
  ]);

  useEffect(() => {
    if (error || errorUpdate || errorMsg) {
      toaster.notify(
        ({ onClose }) => ToastAlert(error || errorUpdate, onClose, 'error'),
        {
          position: 'bottom',
          duration: 20000,
        }
      );
    }
  }, [errorUpdate, error, errorMsg]);

  const manuallyAddedUserDataToUploadWithImg = {
    name,
    message,
    affiliation,
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateManuallyAddedUser({
        _id: manuallyAddedUserId,
        name,
        image,
        affiliation,
        message,
      })
    );
    setSubmittedForm(true);
  };

  return error ? (
    <></>
  ) : (
    <>
      <GoBackBtn to='/admin/manuallyAddedUserList' />

      <FormContainer>
        <Form onSubmit={submitHandler}>
          {loading ? (
            <div className='mb-4 mt-4'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-4 mt-4 d-flex align-items-center justify-content-center'>
              <LoadingImg w='200px' h='200px' borderRadius='50%' />
            </div>
          ) : (
            <Form.Group controlId='image' className='d-flex flex-column'>
              <Form.Label>Volunteer Image</Form.Label>
              <div className='mx-auto'>
                <Form.Control
                  className='img-link'
                  type='text'
                  value={image || ''}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <StyledUloadedImg
                  src={image || ''}
                  alt='avatar'
                  onClick={() => setShowImageOptions(!showImageOptions)}
                />

                <div style={{ position: 'relative' }}>
                  <EditBtn
                    onClick={() => setShowImageOptions(!showImageOptions)}
                  >
                    <i className='fas fa-edit mr-2'></i>Edit
                  </EditBtn>
                  {showImageOptions && (
                    <EditBtn className='d-flex flex-column imgOptions'>
                      <FormFile
                        mb={(image !== uploadDefaultImgUrl).toString()}
                        id='image-file'
                        label='Upload a photo...'
                        onChange={(e: any) =>
                          uploadFileHandler(
                            e,
                            setUploading,
                            setShowImageOptions,
                            setErrorMsg,
                            setPublicId,
                            updateManuallyAddedUser,
                            dispatch,
                            publicId,
                            manuallyAddedUserId,
                            manuallyAddedUserDataToUploadWithImg,
                            '',
                            image,
                            () => {},
                            setImage,
                            'manually-added-user'
                          )
                        }
                      ></FormFile>
                      {image !== uploadDefaultImgUrl && (
                        <div
                          className='remove-img'
                          onClick={() =>
                            removePhoto(
                              manuallyAddedUser?.publicId,
                              setPublicId,
                              dispatch,
                              updateManuallyAddedUser,
                              manuallyAddedUserId,
                              setErrorMsg
                            )
                          }
                        >
                          Remove photo
                        </div>
                      )}
                    </EditBtn>
                  )}
                  {uploading && (
                    <Loader
                      w='200px'
                      h='200px'
                      p='absolute'
                      z='1'
                      top='-200px'
                      left='0px'
                    />
                  )}
                </div>
              </div>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-4 mt-4'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='affiliation' className='mt-5'>
              <Form.Label>Affiliation</Form.Label>
              <Form.Control
                type='text'
                value={affiliation || ''}
                onChange={(e) => setAffiliation(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-4 mt-4'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='message' className='mt-5'>
              <Form.Label>Message</Form.Label>
              <Form.Control
                type='textarea'
                value={message || ''}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}

          {loading ? (
            <div className='mb-4 mt-4'>
              <LoadingImg w='8rem' h='2.5rem' borderRadius='0.5rem' />
            </div>
          ) : (
            <UpdateBtn type='submit'>
              {loadingManuallyAddedUserUpdate ? (
                <div className='d-flex align-items-center'>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  <Text className='text-white ml-2'>Updating...</Text>
                </div>
              ) : (
                <Text className='text-white'>Update</Text>
              )}
            </UpdateBtn>
          )}
        </Form>
      </FormContainer>
    </>
  );
};

export default ManuallyAddedUserEdit;
