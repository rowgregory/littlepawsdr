import { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../../actions/eventActions';
import { EVENT_CREATE_RESET, EVENT_UPDATE_RESET } from '../../constants/eventConstants';
import styled from 'styled-components';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { fontColors, gradients } from '../../utils/eventUtils';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';
import UploadSingleImage from '../../components/UploadSingleImage';
import EventEditCreateLayout from '../../components/dashboard/dashboard2024/layouts/EventEditCreateLayout';
import { FormControl, FormGroup, FormLabel } from '../../components/styles/admin/Styles';

const Gradient = styled(Form.Check) <{ selected?: boolean }>`
  border: ${({ selected }) => (selected ? '2px solid black' : '2px solid transparent')};
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
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({}) as any;
  const state = useSelector((state: any) => state);
  const loadingUpdate = state.eventUpdate.loading;
  const errorUpdate = state.eventUpdate.error;
  const successUpdate = state.eventUpdate.success;
  const loadingCreate = state.eventCreate.loading;
  const errorCreate = state.eventCreate.error;
  const successCreate = state.eventCreate.success;

  const editEventCallback = async () => {
    setUploading(true);

    let image = event?.image;
    if (file?.name) {
      image = await uploadFileToFirebase(file);
    }

    if (isEditMode) {
      dispatch(
        updateEvent({
          _id: event._id,
          title: inputs.title,
          description: inputs.description,
          startDate: inputs.startDate,
          endDate: inputs.endDate,
          image,
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
          image,
          background: inputs.background,
          color: inputs.color,
          externalLink: inputs.externalLink,
        })
      );
    }
  };

  const { inputs, handleInput, onSubmit } = useEventEditForm(editEventCallback, event);

  useEffect(() => {
    if (successCreate || successUpdate) {
      history('/admin/eventList');
      dispatch({ type: EVENT_UPDATE_RESET });
      dispatch({ type: EVENT_CREATE_RESET });
    }
  }, [successCreate, successUpdate, history, dispatch]);

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  return (
    <EventEditCreateLayout
      error={errorUpdate || errorCreate}
      box1={<GoBackBtn to='/admin/eventList' color='#121212' />}
      box2={
        <Text fontFamily='Rust' fontSize='24px' color='#fc5b82' textAlign='center' width='100%'>
          Event {isEditMode ? 'Edit' : 'Create'}
        </Text>
      }
      box3={
        loadingUpdate || loadingCreate ? (
          <Spinner animation='border' size='sm' />
        ) : (
          errorUpdate ||
          (errorCreate && (
            <Text fontFamily='Rust' fontSize='20px'>
              {errorUpdate || errorCreate}
            </Text>
          ))
        )
      }
      box4={
        <UploadSingleImage
          inputs={inputs}
          handleInput={handleInput}
          item={event}
          file={file}
          uploading={uploading}
          editPhotoHandler={editPhotoHandler}
        />
      }
      box5={
        <FormGroup controlId='title'>
          <FormLabel>Title</FormLabel>
          <FormControl
            name='title'
            type='text'
            value={inputs.title || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box6={
        <FormGroup controlId='externalLink'>
          <FormLabel>External Link</FormLabel>
          <FormControl
            name='externalLink'
            type='text'
            value={inputs.externalLink || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box7={
        <FormGroup controlId='description'>
          <FormLabel>Description</FormLabel>
          <FormControl
            className='px-3 py-2'
            name='description'
            rows={6}
            as='textarea'
            value={inputs?.description || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box8={
        <div style={{ position: 'relative' }} className='w-100'>
          <FormGroup controlId='startDate'>
            <FormLabel>Start Date</FormLabel>
            <FormControl
              name='startDate'
              required
              as='input'
              type='date'
              value={inputs.startDate || ''}
              onChange={handleInput}
            ></FormControl>
          </FormGroup>
        </div>
      }
      box9={
        <div style={{ position: 'relative' }} className='w-100'>
          <FormGroup controlId='endDate'>
            <FormLabel>End Date</FormLabel>
            <FormControl
              name='endDate'
              required
              as='input'
              type='date'
              value={inputs.endDate || ''}
              onChange={handleInput}
            ></FormControl>
          </FormGroup>
        </div>
      }
      box10={
        <FormGroup
          controlId='backgroundColor'
        >
          <FormLabel>Background Color</FormLabel>
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
        </FormGroup>
      }
      box11={
        <FormGroup controlId='fontColor' style={{ display: 'flex', flexDirection: 'column' }}>
          <FormLabel>Font Color</FormLabel>
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
        </FormGroup>
      }
      box12={
        <UpdateBtn onClick={onSubmit}>
          {isEditMode ? 'Updat' : 'Creat'}
          {loadingUpdate || loadingCreate ? 'ing...' : 'e'}
        </UpdateBtn>
      }
    />
  );
};

export default EventEdit;
