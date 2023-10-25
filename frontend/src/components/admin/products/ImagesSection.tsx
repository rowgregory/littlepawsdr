import { Form, Image } from 'react-bootstrap';
import { FormFile, UploadImageSquare } from '../../styles/admin/Styles';
import { defaultImages } from '../../../utils/defaultImages';
import { editPhotoHandler } from '../../../utils/adminProductUtils';
import PhotoUploadIcon from '../../svg/PhotoUploadIcon';

const ImagesSection = ({
  handleInput,
  setFiles,
  files,
  uploading,
  inputs,
  setInputs,
}: any) => {
  return (
    <>
      <Form.Group controlId='image' className='d-flex flex-column'>
        <Form.Label>Image</Form.Label>
        <Form.Control
          className='img-link'
          type='file'
          onChange={handleInput}
          multiple
        />
        <div className='d-flex' style={{ position: 'relative' }}>
          <FormFile
            type='file'
            multiple
            id='image-file'
            label={
              <Image
                src={defaultImages.upload}
                width='100px'
                height='100px'
                style={{ objectFit: 'cover' }}
                alt='Product'
                className='p-3'
              />
            }
            onChange={(e: any) => editPhotoHandler(e, setFiles)}
          ></FormFile>
          {Array.from(files)?.map((file: any, i: number) => (
            <UploadImageSquare key={i} className={uploading ? 'anim' : ''}>
              <PhotoUploadIcon ready={file} uploading={uploading} />
            </UploadImageSquare>
          ))}
        </div>
      </Form.Group>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 100px)',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {Array.from(inputs.images)?.map((img: any, i: number) => (
          <Image
            onClick={() =>
              setInputs((inputs: any) => ({
                ...inputs,
                images: inputs.images.filter((image: any) => image !== img),
              }))
            }
            key={i}
            src={img}
            width='100px'
            style={{
              objectFit: 'cover',
              aspectRatio: '1/1',
            }}
            alt='Product'
          />
        ))}
      </div>
    </>
  );
};

export default ImagesSection;
