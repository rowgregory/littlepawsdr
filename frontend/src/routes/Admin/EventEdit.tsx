import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listEventDetails, updateEvent } from '../../actions/eventActions';
import {
  EVENT_DETAILS_RESET,
  EVENT_UPDATE_RESET,
} from '../../constants/eventConstants';
import styled from 'styled-components';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import {
  Container,
  EditForm,
  FormFile,
  RemovePhoto,
  UploadImageSquare,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import PhotoUploadIcon from '../../components/svg/PhotoUploadIcon';
import RemovePhotoIcon from '../../components/svg/RemovePhotoIcon';
import { defaultImages } from '../../utils/defaultImages';
import BreadCrumb from '../../components/common/BreadCrumb';
import { fontColors, gradients } from '../../utils/eventUtils';

const Gradient = styled(Form.Check)<{ selected?: boolean }>`
  border: ${({ selected }) =>
    selected ? '2px solid black' : '2px solid transparent'};
  padding: 0.2rem;
  margin-right: 0;
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
  const [submittedForm, setSubmittedForm] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;
  const [cloudinaryData, setClouadinaryData] = useState({}) as any;

  const {
    eventDetails: { loading, error, event },
    eventUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: EVENT_DETAILS_RESET });
    dispatch(listEventDetails(eventId));
    dispatch({ type: EVENT_UPDATE_RESET });
  }, [dispatch, eventId, successUpdate]);

  useEffect(() => {
    setTitle(event?.title);
    setDescription(event?.description);
    setStartDate(event?.startDate);
    setEndDate(event?.endDate);
    setImage(event?.image);
    setBackground(event?.background);
    setColor(event?.color);
    setPublicId(event?.publicId);
    setStatus(event?.status);
  }, [event]);

  useEffect(() => {
    if (Object.keys(cloudinaryData).length > 0) {
      dispatch(
        updateEvent({
          _id: eventId,
          title,
          description,
          startDate,
          endDate,
          image: cloudinaryData.secureUrl,
          background,
          color,
          status,
          publicId: cloudinaryData.publicId,
        })
      );
    }
  }, [
    background,
    cloudinaryData,
    color,
    description,
    dispatch,
    endDate,
    eventId,
    startDate,
    status,
    title,
  ]);

  useEffect(() => {
    if (successUpdate && submittedForm) {
      setSubmittedForm(false);
      history.push('/admin/eventList');
    }
  }, [history, submittedForm, successUpdate]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setSubmittedForm(true);
    if (file?.name) {
      setUploading(true);
      uploadFileHandler(
        file,
        setUploading,
        publicId,
        setImageUploadStatus,
        setClouadinaryData
      );
    } else {
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
    }
  };

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  const removePhotoHandler = (e: any) => {
    e.preventDefault();
    removePhoto(
      event.publicId,
      setPublicId,
      dispatch,
      updateEvent,
      eventId,
      setErrorMsg
    );
  };

  return (
    <Container>
      <WelcomeText className='mb-1'>Event Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Events'
        step4={event?.title}
        step5='Edit'
        url1='/'
        url2='/admin'
        url3='/admin/eventList'
      />
      {(loading || loadingUpdate || submittedForm || uploading) && (
        <HexagonLoader />
      )}
      {(error || errorUpdate || errorMsg) && (
        <Message variant='danger'>{error || errorUpdate || errorMsg}</Message>
      )}
      <EditForm>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='title'
            placeholder='Enter title'
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId='image' className='d-flex flex-column'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            className='img-link'
            type='text'
            value={image || ''}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <div className='d-flex'>
            <FormFile
              id='image-file'
              label={
                event?.image === defaultImages.upload || file?.name ? (
                  <UploadImageSquare className={uploading ? 'anim' : ''}>
                    <PhotoUploadIcon ready={file} imgStatus={imgUploadStatus} />
                  </UploadImageSquare>
                ) : (
                  <Image
                    src={event?.image}
                    width='200px'
                    height='200px'
                    style={{ objectFit: 'cover' }}
                  />
                )
              }
              onChange={(e: any) => editPhotoHandler(e)}
            ></FormFile>
            <RemovePhoto
              onClick={(e: any) =>
                image === defaultImages.upload ? {} : removePhotoHandler(e)
              }
            >
              <RemovePhotoIcon />
              <Text marginLeft='0.75rem' fontWeight='300' color='#c4c4c4'>
                Remove Photo
              </Text>
            </RemovePhoto>
          </div>
        </Form.Group>
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
            {gradients.map((gradient: string, i: number) => (
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
        <Form.Group
          controlId='fontColor'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Form.Label>Font Color</Form.Label>
          <div>
            {fontColors.map((fontColor: string, i: number) => (
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
        <UpdateBtn onClick={(e: any) => submitHandler(e)}>
          Updat{loadingUpdate ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default EventEdit;
