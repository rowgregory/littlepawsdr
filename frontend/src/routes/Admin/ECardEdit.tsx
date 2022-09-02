import React, { useEffect, useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { getECardDetails, updateECard } from '../../actions/eCardActions';
import { ECARD_UPDATE_RESET } from '../../constants/eCardConstants';
import {
  UpdateBtn,
  Text,
  StyledUloadedImg,
} from '../../components/styles/Styles';
import GoBackBtn from '../../utils/GoBackBtn';
import { EditBtn } from './RaffleWinnerEdit';
import { FormFile } from './EventEdit';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { eCardCategories } from '../../utils/eCardCategories';
import { useRouteMatch, useHistory } from 'react-router-dom';
import toaster from 'toasted-notes';
import { ToastAlert } from '../../components/common/ToastAlert';
import { LoadingImg } from '../../components/LoadingImg';

const ECardEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const eCardId = match.params.id;
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [publicId, setPublicId] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);

  const eCardDetails = useSelector((state: any) => state.eCardDetails);
  const { loading, error, eCard } = eCardDetails;

  const eCardUpdate = useSelector((state: any) => state.eCardUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = eCardUpdate;

  const uploadDefaultImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1628374521/upload_2.png';

  useMemo(() => {
    dispatch(getECardDetails(eCardId));
  }, [dispatch, eCardId]);

  useEffect(() => {
    if (successUpdate) {
      if (submittedForm) {
        setSubmittedForm(false);
        return history.push('/admin/eCardList');
      }
      dispatch(getECardDetails(eCardId));
      dispatch({ type: ECARD_UPDATE_RESET });
    } else {
      setCategory(eCard?.category);
      setImage(eCard?.image);
      setPrice(eCard?.price);
      setPublicId(eCard?.publicId);
    }
  }, [dispatch, history, eCard, successUpdate, submittedForm, eCardId]);

  useEffect(() => {
    if (errorUpdate || errorMsg || error) {
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(errorUpdate || errorMsg || error, onClose, 'error'),
        {
          position: 'bottom',
          duration: 20000,
        }
      );
    }
  }, [errorUpdate, errorMsg, error]);

  const eCardDataToUploadWithImg = {
    category,
    price,
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateECard({
        _id: eCardId,
        category,
        image,
        price,
        publicId,
      })
    );
    setSubmittedForm(true);
  };

  return error ? (
    <></>
  ) : (
    <>
      <GoBackBtn to='/admin/eCardList' />

      <FormContainer>
        <Form onSubmit={submitHandler}>
          {loading ? (
            <div className='mb-3 mt-4'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                value={category || ''}
                onChange={(e) => setCategory(e.target.value)}
              >
                {eCardCategories().map((category, i) => (
                  <option key={i}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                min={1}
                type='number'
                value={price || ''}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3 d-flex justify-content-center align-items-center'>
              <LoadingImg w='200px' h='200px' borderRadius='50%' />
            </div>
          ) : (
            <Form.Group controlId='image' className='d-flex flex-column'>
              <Form.Label>Image</Form.Label>
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
                    top='-45px'
                    left='0px'
                    onClick={() => {
                      setShowImageOptions(!showImageOptions);
                    }}
                  >
                    <i className='fas fa-edit mr-2'></i>Edit
                  </EditBtn>
                  {showImageOptions && (
                    <EditBtn
                      top='-17px'
                      left='0px'
                      className='d-flex flex-column imgOptions'
                    >
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
                            updateECard,
                            dispatch,
                            publicId,
                            eCardId,
                            eCardDataToUploadWithImg,
                            '',
                            image,
                            () => {},
                            setImage,
                            'e-card'
                          )
                        }
                      ></FormFile>

                      {image !== uploadDefaultImgUrl && (
                        <div
                          className='remove-img'
                          onClick={() =>
                            removePhoto(
                              eCard.publicId,
                              setPublicId,
                              dispatch,
                              updateECard,
                              eCardId,
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
            <div className='mb-3'>
              <LoadingImg w='5rem' h='3rem' borderRadius='0.5rem' />
            </div>
          ) : (
            <UpdateBtn type='submit'>
              {loadingUpdate ? (
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

export default ECardEdit;
