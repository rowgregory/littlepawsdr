import { Form, Image } from 'react-bootstrap';
import { FormFile, UploadImageSquare } from '../../styles/admin/Styles';
import PhotoUploadIcon from '../../svg/PhotoUploadIcon';
import styled from 'styled-components';
import { Flex } from '../../styles/Styles';
import React from 'react';

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  gap: 8px;
  marginbottom: 24px;
`;

const StyledImage = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

const MultipleImages = ({
  handleInput,
  setFiles,
  files,
  uploading,
  inputs,
  setInputs,
}: any) => {
  const handleMultipleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs: any) => ({ ...inputs, readyToBeUploaded: true }));
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
  };

  return (
    <div className='my-4'>
      <Form.Group controlId='image' className='d-flex flex-column'>
        <Form.Label>Images</Form.Label>
        <Form.Control
          className='img-link'
          type='file'
          onChange={handleInput}
          multiple
        />
        <Flex position='relative'>
          <FormFile
            type='file'
            multiple
            id='image-file'
            label={
              <UploadImageSquare>
                <PhotoUploadIcon ready={''} isMultiple />
              </UploadImageSquare>
            }
            onChange={handleMultipleImage}
          ></FormFile>
          {Array.from(files)?.map((file: any, i: number) => (
            <UploadImageSquare
              key={i}
              className={uploading ? 'anim mr-2' : 'mr-2'}
            >
              <PhotoUploadIcon ready={file} uploading={uploading} />
            </UploadImageSquare>
          ))}
        </Flex>
      </Form.Group>
      <ImageContainer>
        {Array.from(inputs.images)?.map((img: any, i: number) => (
          <StyledImage
            onClick={() =>
              setInputs((inputs: any) => ({
                ...inputs,
                images: inputs.images.filter((image: any) => image !== img),
              }))
            }
            key={i}
            src={img}
            alt='LPDR'
          />
        ))}
      </ImageContainer>
    </div>
  );
};

export default MultipleImages;
