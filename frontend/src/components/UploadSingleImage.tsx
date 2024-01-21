import React, { FC } from 'react';
import { Image } from 'react-bootstrap';
import { FormControl, FormFile, FormGroup, FormLabel, UploadImageSquare } from './styles/admin/Styles';
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 160px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    max-height: 160px;
  }
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
    <FormGroup controlId='image' className='d-flex flex-column'>
      <FormLabel>Image</FormLabel>
      <FormControl
        name='image'
        className='img-link'
        type='text'
        value={inputs.image || ''}
        onChange={handleInput}
      ></FormControl>
      <Flex marginRight='0' alignItems='center' flex='0'>
        <FormFile
          id='image-file'
          label={label()}
          onChange={editPhotoHandler}
        ></FormFile>
      </Flex>
    </FormGroup>
  );
};

export default UploadSingleImage;
