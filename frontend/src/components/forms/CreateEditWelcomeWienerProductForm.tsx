import React from 'react';
import {
  EditForm,
  EditFormAndPreviewContainer,
  FormFile,
  UploadImageSquare,
} from '../styles/admin/Styles';
import { Form, Image } from 'react-bootstrap';
import { ErrorText, UpdateBtn } from '../styles/Styles';
import PhotoUploadIcon from '../svg/PhotoUploadIcon';
import UploadImg from '../assets/upload.png';

const CreateEditWelcomeWienerProductForm = ({
  inputs,
  handleInput,
  file,
  uploading,
  onSubmit,
  submitBtnText,
  imgUploadStatus,
  errors,
  handleBlur,
  handleFileInputChange,
}: any) => {
  return (
    <EditFormAndPreviewContainer>
      <EditForm>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='name'
            type='text'
            value={inputs.name || ''}
            onChange={handleInput}
            onBlur={handleBlur}
          ></Form.Control>
          <ErrorText>{errors?.name}</ErrorText>
        </Form.Group>
        <Form.Group controlId='price' className='mt-4'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            name='price'
            type='number'
            value={inputs.price || ''}
            onChange={handleInput}
            onBlur={handleBlur}
          ></Form.Control>
          <ErrorText>{errors?.price}</ErrorText>
        </Form.Group>
        <Form.Group controlId='description' className='mt-4'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name='description'
            as='textarea'
            rows={6}
            type='text'
            value={inputs.description || ''}
            onChange={handleInput}
            onBlur={handleBlur}
          ></Form.Control>
          <ErrorText>{errors?.description}</ErrorText>
        </Form.Group>
        <Form.Group controlId='displayUrl' className='d-flex flex-column'>
          <Form.Label>Image</Form.Label>
          <FormFile
            id='image-file'
            label={
              file?.name ? (
                <UploadImageSquare className={uploading ? 'anim' : ''}>
                  <PhotoUploadIcon ready={file} imgStatus={imgUploadStatus} />
                </UploadImageSquare>
              ) : (
                <Image
                  src={inputs?.displayUrl || UploadImg}
                  width='200px'
                  height='200px'
                  style={{ objectFit: 'cover', padding:'8px' }}
                  alt='Board Member'
                />
              )
            }
            onChange={(e: any) => handleFileInputChange(e)}
            onBlur={handleBlur}
          ></FormFile>
          <ErrorText>{errors?.displayUrl}</ErrorText>
        </Form.Group>
        <UpdateBtn onClick={onSubmit}>
          {submitBtnText}
          {uploading ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </EditFormAndPreviewContainer>
  );
};

export default CreateEditWelcomeWienerProductForm;
