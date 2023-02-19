import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../../actions/eventActions';
import {
  EVENT_CREATE_RESET,
  EVENT_UPDATE_RESET,
} from '../../constants/eventConstants';
import styled from 'styled-components';
import { UpdateBtn } from '../../components/styles/Styles';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { useHistory, useLocation } from 'react-router-dom';
import Message from '../../components/Message';
import {
  Container,
  EditForm,
  FormFile,
  UploadImageSquare,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import PhotoUploadIcon from '../../components/svg/PhotoUploadIcon';
import { defaultImages } from '../../utils/defaultImages';
import BreadCrumb from '../../components/common/BreadCrumb';
import { fontColors, gradients } from '../../utils/eventUtils';
import API from '../../utils/api';
import { staticUploadImage } from '../../utils/misc';

const Gradient = styled(Form.Check)<{ selected?: boolean }>`
  border: ${({ selected }) =>
    selected ? '2px solid black' : '2px solid transparent'};
  padding: 0.2rem;
  margin-right: 0;
`;

const useEventEditForm = (callback?: any, data?: any) => {
  const values = {
    title: '',
    externalLink: '',
    description: '',
    startDate: '',
    endDate: '',
    image: '',
    background: '',
    color: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        title: data.title,
        externalLink: data.externalLink,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        image: data.image,
        background: data.background,
        color: data.color,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInput, setInputs, onSubmit };
};

const EventEdit = () => {
  const {
    state: { event, isEditMode },
  } = useLocation() as any;
  const history = useHistory();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;

  const {
    eventUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
    eventCreate: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
    },
  } = useSelector((state: any) => state);

  const editEventCallback = async () => {
    setUploading(true);
    setImageUploadStatus('Uploading to Imgbb');
    const formData = new FormData();
    formData.append('image', file);
    const isFile = file?.name;
    const image = isFile && (await API.uploadImageToImgbb(formData));
    setImageUploadStatus('Image uploaded!');
    setImageUploadStatus(
      isEditMode ? 'Updating ecard details' : 'Creating ecard details'
    );
    if (isEditMode) {
      dispatch(
        updateEvent({
          _id: event._id,
          title: inputs.title,
          description: inputs.description,
          startDate: inputs.startDate,
          endDate: inputs.endDate,
          image: image?.data?.url,
          background: inputs.background,
          color: inputs.color,
          externalLink: inputs.externalLink,
        })
      );
    } else {
      dispatch(
        createEvent({
          title: inputs.title,
          description: inputs.description,
          startDate: inputs.startDate,
          endDate: inputs.endDate,
          image: image?.data?.url,
          background: inputs.background,
          color: inputs.color,
          externalLink: inputs.externalLink,
        })
      );
    }
  };

  const { inputs, handleInput, onSubmit } = useEventEditForm(
    editEventCallback,
    event
  );

  useEffect(() => {
    if (successCreate || successUpdate) {
      history.push('/admin/eventList');
      dispatch({ type: EVENT_UPDATE_RESET });
      dispatch({ type: EVENT_CREATE_RESET });
    }
  }, [successCreate, successUpdate, history, dispatch]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <Container>
      <WelcomeText className='mb-1'>Event Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Events'
        step4={isEditMode ? 'Update' : 'Create'}
        step5=''
        url1='/'
        url2='/admin'
        url3='/admin/eventList'
      />
      {(errorCreate || errorUpdate) && (
        <Message variant='danger'>{errorCreate || errorUpdate}</Message>
      )}
      <EditForm>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name='title'
            type='text'
            value={inputs.title || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='externalLink'>
          <Form.Label>External Link</Form.Label>
          <Form.Control
            name='externalLink'
            type='text'
            value={inputs.externalLink || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name='description'
            as='textarea'
            rows={3}
            type='text'
            value={inputs.description || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <div style={{ position: 'relative' }}>
          <Form.Group controlId='startDate'>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              name='startDate'
              required
              as='input'
              type='date'
              value={inputs.startDate || ''}
              onChange={handleInput}
            ></Form.Control>
          </Form.Group>
        </div>
        <div style={{ position: 'relative' }}>
          <Form.Group controlId='endDate'>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              name='endDate'
              required
              as='input'
              type='date'
              value={inputs.endDate || ''}
              onChange={handleInput}
            ></Form.Control>
          </Form.Group>
        </div>
        <Form.Group controlId='image' className='d-flex flex-column'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            name='image'
            className='img-link'
            type='text'
            value={inputs.image || ''}
            onChange={handleInput}
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
                    alt='Event Edit'
                  />
                )
              }
              onChange={(e: any) => editPhotoHandler(e)}
            ></FormFile>
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
                name='background'
                key={i}
                selected={gradient === inputs.background}
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
                checked={inputs.background === gradient}
                onChange={handleInput}
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
                name='color'
                key={i}
                selected={fontColor === inputs.color}
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
                checked={fontColor === inputs.color}
                onChange={handleInput}
              />
            ))}
          </div>
        </Form.Group>
        <UpdateBtn onClick={onSubmit}>
          {isEditMode ? 'Updat' : 'Creat'}
          {loadingUpdate || loadingCreate ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default EventEdit;
