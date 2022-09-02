import React, { useEffect, useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRaffleWinnerDetails,
  updateRaffleWinner,
} from '../../actions/raffleWinnerActions';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { RAFFLE_WINNER_UPDATE_RESET } from '../../constants/raffleWinnerContants';
import {
  StyledUloadedImg,
  Text,
  UpdateBtn,
} from '../../components/styles/Styles';
import GoBackBtn from '../../utils/GoBackBtn';
import styled from 'styled-components';
import { FormFile } from './EventEdit';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { useRouteMatch, useHistory } from 'react-router-dom';
import toaster from 'toasted-notes';
import { ToastAlert } from '../../components/common/ToastAlert';
import { LoadingImg } from '../../components/LoadingImg';

export const EditBtn = styled.div<{ top?: string; left?: string }>`
  border: ${({ theme }) => `1px solid ${theme.input.border}`};
  padding: 0.15rem 0.65rem;
  background: ${({ theme }) => theme.input.bg};
  border-radius: 0.5rem;
  position: absolute;
  top: ${({ top }) => (top ? top : '-50px')};
  left: ${({ left }) => (left ? left : '20px')};
  z-index: 10;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  &.imgOptions {
    top: ${({ top }) => (top ? top : '-17px')};
    cursor: pointer;
    :active {
      filter: brightness(0.7);
    }
    :hover {
      background: ${({ theme }) => theme.separator};
    }
  }
  div {
    label {
      margin-bottom: 0;
      cursor: pointer;
    }
  }
  .remove-img {
    :hover {
      filter: brightness(1.2);
    }
  }
`;

const RaffleWinnerEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const raffleWinnerId = match.params.id;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [month, setMonth] = useState('');
  const [uploading, setUploading] = useState(false);
  const [publicId, setPublicId] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);

  const raffleWinnerDetails = useSelector(
    (state: any) => state.raffleWinnerDetails
  );
  const { loading, error, raffleWinner } = raffleWinnerDetails;

  const uploadDefaultImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1628374521/upload_2.png';

  const raffleWinnerUpdate = useSelector(
    (state: any) => state.raffleWinnerUpdate
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = raffleWinnerUpdate;

  useMemo(() => {
    dispatch(getRaffleWinnerDetails(raffleWinnerId));
  }, [dispatch, raffleWinnerId]);

  useEffect(() => {
    if (successUpdate) {
      if (submittedForm) {
        setSubmittedForm(false);
        return history.push('/admin/raffleWinnerList');
      }
      dispatch(getRaffleWinnerDetails(raffleWinnerId));
      dispatch({ type: RAFFLE_WINNER_UPDATE_RESET });
    } else {
      if (raffleWinner?.month === 'January') {
        setMonth(`${new Date().getFullYear()}-01`);
      } else if (raffleWinner?.month === 'February') {
        setMonth(`${new Date().getFullYear()}-02`);
      } else if (raffleWinner?.month === 'March') {
        setMonth(`${new Date().getFullYear()}-03`);
      } else if (raffleWinner?.month === 'April') {
        setMonth(`${new Date().getFullYear()}-04`);
      } else if (raffleWinner?.month === 'May') {
        setMonth(`${new Date().getFullYear()}-05`);
      } else if (raffleWinner?.month === 'June') {
        setMonth(`${new Date().getFullYear()}-06`);
      } else if (raffleWinner?.month === 'July') {
        setMonth(`${new Date().getFullYear()}-07`);
      } else if (raffleWinner?.month === 'August') {
        setMonth(`${new Date().getFullYear()}-08`);
      } else if (raffleWinner?.month === 'September') {
        setMonth(`${new Date().getFullYear()}-09`);
      } else if (raffleWinner?.month === 'October') {
        setMonth(`${new Date().getFullYear()}-10`);
      } else if (raffleWinner?.month === 'November') {
        setMonth(`${new Date().getFullYear()}-11`);
      } else if (raffleWinner?.month === 'December') {
        setMonth(`${new Date().getFullYear()}-12`);
      }

      setName(raffleWinner?.name);
      setImage(raffleWinner?.image);
      setMessage(raffleWinner?.message);
      setPublicId(raffleWinner?.publicId);
    }
  }, [
    dispatch,
    history,
    raffleWinner,
    raffleWinnerId,
    submittedForm,
    successUpdate,
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

  const raffleWinnerDataToUploadWithImg = {
    name,
    message,
    month,
  };

  const getMonth = (month: any) => {
    const digits = month.split('-')[1];
    switch (digits) {
      case '01':
        return 'January';
      case '02':
        return 'February';
      case '03':
        return 'March';
      case '04':
        return 'April';
      case '05':
        return 'May';
      case '06':
        return 'June';
      case '07':
        return 'July';
      case '08':
        return 'August';
      case '09':
        return 'September';
      case '10':
        return 'October';
      case '11':
        return 'November';
      case '12':
        return 'December';
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateRaffleWinner({
        _id: raffleWinnerId,
        name,
        image,
        publicId,
        month: getMonth(month),
        message,
      })
    );
    setSubmittedForm(true);
  };

  return error ? (
    <></>
  ) : (
    <>
      <GoBackBtn to='/admin/raffleWinnerList' />
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
            <div className='mb-4 d-flex justify-content-center align-items-center'>
              <LoadingImg w='200px' h='200px' borderRadius='50%' />
            </div>
          ) : (
            <Form.Group controlId='image' className='d-flex flex-column'>
              <Form.Label>Raffle winner image</Form.Label>
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
                            updateRaffleWinner,
                            dispatch,
                            publicId,
                            raffleWinnerId,
                            raffleWinnerDataToUploadWithImg,
                            '',
                            image,
                            () => {},
                            setImage,
                            'raffle-winner'
                          )
                        }
                      ></FormFile>
                      {image !== uploadDefaultImgUrl && (
                        <div
                          className='remove-img'
                          onClick={() =>
                            removePhoto(
                              raffleWinner.publicId,
                              setPublicId,
                              dispatch,
                              updateRaffleWinner,
                              raffleWinnerId,
                              setErrorMsg
                            )
                          }
                        >
                          Remove photo
                        </div>
                      )}
                    </EditBtn>
                  )}
                </div>
              </div>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='10rem' />
            </div>
          ) : (
            <Form.Group controlId='message' className='mt-5'>
              <Form.Label>Message</Form.Label>
              <Form.Control
                rows={5}
                as='textarea'
                placeholder='Enter message'
                value={message || ''}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='month'>
              <Form.Label>Month</Form.Label>
              <Form.Control
                type='month'
                value={month || ''}
                onChange={(e) => setMonth(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}

          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='8rem' h='2.5rem' borderRadius='0.5rem' />
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

export default RaffleWinnerEdit;
