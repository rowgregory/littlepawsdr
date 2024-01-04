import React, { FC } from 'react';
import { Form, Image } from 'react-bootstrap';
import { FormFile, UploadImageSquare } from './styles/admin/Styles';
import { defaultImages } from '../utils/defaultImages';
import PhotoUploadIcon from './svg/PhotoUploadIcon';
import { Flex } from './styles/Styles';
import styled from 'styled-components';

interface UploadSingleImageProps {
  inputs: { image: string };
  handleInput: React.ChangeEventHandler<any>;
  item: { image: string };
  file: any;
  uploading: boolean;
  editPhotoHandler: Function;
}

const StyledImage = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const UploadSingleImage: FC<UploadSingleImageProps> = ({
  inputs,
  handleInput,
  item,
  file,
  uploading,
  editPhotoHandler,
}) => {
  const label = () => {
    return item?.image === defaultImages.upload || file?.name ? (
      <UploadImageSquare className={uploading ? 'anim' : ''}>
        <PhotoUploadIcon ready={file} />
      </UploadImageSquare>
    ) : (
      <StyledImage src={item?.image} alt='Education Tip' />
    );
  };

  return (
    <Form.Group controlId='image' className='d-flex flex-column my-4'>
      <Form.Label>Image</Form.Label>
      <Form.Control
        name='image'
        className='img-link'
        type='text'
        value={inputs.image || ''}
        onChange={handleInput}
      ></Form.Control>
      <Flex>
        <FormFile
          id='image-file'
          label={label()}
          onChange={editPhotoHandler}
        ></FormFile>
      </Flex>
    </Form.Group>
  );
};

export default UploadSingleImage;
