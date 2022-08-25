import React, { useEffect, useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { listEventDetails, updateEvent } from '../../actions/eventActions';
import { EVENT_UPDATE_RESET } from '../../constants/eventConstants';
import styled from 'styled-components';
import GoBackBtn from '../../utils/GoBackBtn';
import {
  LoadingImg,
  StyledUloadedImg,
  Text,
  UpdateBtn,
} from '../../components/styles/Styles';
import { EditBtn } from './RaffleWinnerEdit';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { useRouteMatch, useHistory } from 'react-router-dom';
import toaster from 'toasted-notes';
import { ToastAlert } from '..';

const Gradient = styled(Form.Check)<{ selected?: boolean }>`
  border: ${({ selected }) =>
    selected ? '2px solid black' : '2px solid transparent'};
  padding: 0.2rem;
  margin-right: 0;
`;

export const FormFile = styled(Form.File)<{ mb?: string }>`
  label {
    margin-bottom: 0 !important;
  }
`;

const EventEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const eventId = match.params.id;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [background, setBackground] = useState('');
  const [color, setColor] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [publicId, setPublicId] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);

  const uploadDefaultImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1628374521/upload_2.png';

  const eventDetails = useSelector((state: any) => state.eventDetails);
  const { loading, error, event } = eventDetails;

  const eventUpdate = useSelector((state: any) => state.eventUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = eventUpdate;

  useMemo(() => {
    dispatch(listEventDetails(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    if (successUpdate) {
      if (submittedForm) {
        setSubmittedForm(false);
        return history.push('/admin/eventList');
      }
      dispatch(listEventDetails(eventId));
      dispatch({ type: EVENT_UPDATE_RESET });
    } else {
      setTitle(event?.title);
      setDescription(event?.description);
      setStartDate(event?.startDate);
      setEndDate(event?.endDate);
      setImage(event?.image);
      setBackground(event?.background);
      setColor(event?.color);
      setPublicId(event?.publicId);
      setStatus(event?.status);
    }
  }, [dispatch, event, history, eventId, successUpdate, submittedForm]);

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

  const eventDataToUploadWithImg = {
    title,
    description,
    background,
    color,
    startDate,
    endDate,
    status,
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateEvent({
        _id: eventId,
        title,
        description,
        startDate,
        endDate,
        image,
        background,
        color,
        status,
        publicId,
      })
    );
    setSubmittedForm(true);
  };

  const gradients = [
    'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
    'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
    'linear-gradient(to top, #fddb92 0%, #d1fdff 100%)',
    'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)',
    'linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)',
    'linear-gradient(to top, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%)',
    'linear-gradient(to right, #434343 0%, black 100%)',
    'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)',
    'linear-gradient(to right, #868f96 0%, #596164 100%)',
    'linear-gradient(to right, #f83600 0%, #f9d423 100%)',
    'linear-gradient(-20deg, #d558c8 0%, #24d292 100%)',
    'linear-gradient(60deg, #abecd6 0%, #fbed96 100%)',
    'linear-gradient(to top, #09203f 0%, #537895 100%)',
    'linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
    'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
    'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
    'linear-gradient(to top, #0fd850 0%, #f9f047 100%)',
    'linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%)',
    'linear-gradient(to right, #d7d2cc 0%, #304352 100%)',
  ];

  const fontColors = [
    '#ffffff',
    '#fafafa',
    '#f4f3f4',
    '#eeedef',
    '#e7e6e8',
    '#e4e2e4',
    '#dfdedf',
    '#d9d8da',
    '#c0bec0',
    '#908f90',
    '#727983',
    '#717681',
    '#6a6b70',
    '#616167',
    '#515158',
    '#4c4c4f',
    '#44454a',
    '#36363c',
  ];

  return (
    <>
      <GoBackBtn to='/admin/eventList' />
      <FormContainer>
        <Form onSubmit={submitHandler}>
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='title'
                placeholder='Enter title'
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='5rem' />
            </div>
          ) : (
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                type='description'
                placeholder='Enter description'
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='startDate'>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                required
                as='input'
                type='date'
                value={startDate || ''}
                onChange={(e) => setStartDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group controlId='endDate'>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                required
                as='input'
                type='date'
                value={endDate || ''}
                onChange={(e) => setEndDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3 d-flex justify-content-center align-items-center'>
              <LoadingImg w='200px' h='200px' borderRadius='50%' />
            </div>
          ) : (
            <Form.Group controlId='image' className='d-flex flex-column'>
              <Form.Label>Event image</Form.Label>
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
                            updateEvent,
                            dispatch,
                            publicId,
                            eventId,
                            eventDataToUploadWithImg,
                            '',
                            image,
                            () => {},
                            setImage,
                            'event'
                          )
                        }
                      ></FormFile>
                      {image !== uploadDefaultImgUrl && (
                        <div
                          className='remove-img'
                          onClick={() =>
                            removePhoto(
                              event.publicId,
                              setPublicId,
                              dispatch,
                              updateEvent,
                              eventId,
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
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group
              controlId='backgroundColor'
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '4rem',
              }}
            >
              <Form.Label>Background Color</Form.Label>
              <div>
                {gradients.map((gradient, i) => (
                  <Gradient
                    key={i}
                    selected={gradient === background}
                    inline
                    label={
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          backgroundImage: gradient,
                        }}
                      ></div>
                    }
                    type='radio'
                    id={`inline-radio-${i} bgColor`}
                    isValid
                    value={gradient}
                    checked={background === gradient}
                    onChange={(e: any) => setBackground(e.target.value)}
                    name='backgroundColor'
                  />
                ))}
              </div>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
            <Form.Group
              controlId='fontColor'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Form.Label>Font Color</Form.Label>
              <div>
                {fontColors.map((fontColor, i) => (
                  <Gradient
                    key={i}
                    selected={fontColor === color}
                    inline
                    label={
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          backgroundColor: fontColor,
                        }}
                      ></div>
                    }
                    type='radio'
                    id={`inline-radio-${i} fontColor`}
                    isValid
                    value={fontColor}
                    checked={fontColor === color}
                    onChange={(e: any) => setColor(e.target.value)}
                    name='fontColor'
                  />
                ))}
              </div>
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

export default EventEdit;
