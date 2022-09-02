import React, { useEffect, useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEducationTipDetails,
  updateEducationTip,
} from '../../actions/educationTipActions';
import FormContainer from '../../components/FormContainer';
import { EDUCATION_TIP_UPDATE_RESET } from '../../constants/educationTipConstants';
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
import { LoadingImg } from '../../components/LoadingImg';

const EducationTipEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const educationTipId = match.params.id;
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [publicId, setPublicId] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);

  const educationTipDetails = useSelector(
    (state: any) => state.educationTipDetails
  );
  const { loading, error, educationTip } = educationTipDetails;

  const uploadDefaultImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1628374521/upload_2.png';

  const educationTipUpdate = useSelector(
    (state: any) => state.educationTipUpdate
  );
  const {
    loading: loadingEducationTipUpdate,
    error: errorUpdate,
    success: successEducationTipUpdate,
  } = educationTipUpdate;

  useMemo(() => {
    dispatch(getEducationTipDetails(educationTipId));
  }, [dispatch, educationTipId]);

  useEffect(() => {
    if (successEducationTipUpdate) {
      if (submittedForm) {
        setSubmittedForm(false);
        return history.push('/admin/education-tips');
      }
      dispatch(getEducationTipDetails(educationTipId));
      dispatch({ type: EDUCATION_TIP_UPDATE_RESET });
    } else {
      setTitle(educationTip?.title);
      setImage(educationTip?.image);
      setExternalLink(educationTip?.message);
      setPublicId(educationTip?.publicId);
    }
  }, [
    dispatch,
    educationTip,
    educationTipId,
    history,
    submittedForm,
    successEducationTipUpdate,
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

  const educationTipDataToUploadWithImg = {
    title,
    externalLink,
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateEducationTip({
        _id: educationTipId,
        title,
        image,
        publicId,
        externalLink,
      })
    );
    setSubmittedForm(true);
  };

  return error ? (
    <></>
  ) : (
    <>
      <GoBackBtn to='/admin/education-tips' />

      <FormContainer>
        <Form onSubmit={submitHandler}>
          {loading ? (
            <div className='mb-4 mt-4'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='name'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-4 mt-4 d-flex align-items-center justify-content-center'>
              <LoadingImg w='200px' h='200px' borderRadius='50%' />
            </div>
          ) : (
            <Form.Group controlId='image' className='d-flex flex-column'>
              <Form.Label>Education tip image</Form.Label>
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
                            updateEducationTip,
                            dispatch,
                            publicId,
                            educationTipId,
                            educationTipDataToUploadWithImg,
                            '',
                            image,
                            () => {},
                            setImage,
                            'education-tip'
                          )
                        }
                      ></FormFile>
                      {image !== uploadDefaultImgUrl && (
                        <div
                          className='remove-img'
                          onClick={() =>
                            removePhoto(
                              educationTip?.publicId,
                              setPublicId,
                              dispatch,
                              updateEducationTip,
                              educationTipId,
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
            <Form.Group controlId='externalLink' className='mt-5'>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type='text'
                value={externalLink || ''}
                onChange={(e) => setExternalLink(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}

          {loading ? (
            <div className='mb-4 mt-4'>
              <LoadingImg w='8rem' h='2.5rem' borderRadius='0.5rem' />
            </div>
          ) : (
            <UpdateBtn type='submit'>
              {loadingEducationTipUpdate ? (
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

export default EducationTipEdit;
