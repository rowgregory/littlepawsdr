import React, { useEffect, useMemo, useState } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEducationTipDetails,
  updateEducationTip,
} from '../../actions/educationTipActions';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { EDUCATION_TIP_UPDATE_RESET } from '../../constants/educationTipConstants';
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

const EducationTipRow = styled(Row)`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

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
  &.imgOptions {
    top: ${({ top }) => (top ? top : '-17px')};
    cursor: pointer;
  }
  div {
    label {
      cursor: pointer;
      :hover {
        filter: brightness(1.2);
      }
    }
  }
  .remove-img {
    :hover {
      filter: brightness(1.2);
    }
  }
`;

const EducationTipEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const educationTipId = match.params.id;
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [publicId, setPublicId] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);

  const educationTipDetails = useSelector(
    (state: any) => state.educationTipDetails
  );
  const {
    loading: loadingEducationTipDetails,
    error: errorEducationTipDetails,
    educationTip,
  } = educationTipDetails;

  const uploadDefaultImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1628374521/upload_2.png';

  const educationTipUpdate = useSelector(
    (state: any) => state.educationTipUpdate
  );
  const {
    loading: loadingEducationTipUpdate,
    error: errorEducationTipUpdate,
    success: successEducationTipUpdate,
  } = educationTipUpdate;

  useMemo(() => {
    dispatch(getEducationTipDetails(educationTipId));
  }, [dispatch, educationTipId]);

  useEffect(() => {
    if (successEducationTipUpdate) {
      if (submittedForm) {
        setSubmittedForm(false);
        return history.push('/admin/education-tips');
      }
      dispatch(getEducationTipDetails(educationTipId));
      dispatch({ type: EDUCATION_TIP_UPDATE_RESET });
    } else {
      setTitle(educationTip?.title);
      setImage(educationTip?.image);
      setExternalLink(educationTip?.message);
      setPublicId(educationTip?.publicId);
    }
  }, [
    dispatch,
    educationTip,
    educationTipId,
    history,
    submittedForm,
    successEducationTipUpdate,
  ]);

  const educationTipDataToUploadWithImg = {
    title,
    externalLink,
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateEducationTip({
        _id: educationTipId,
        title,
        image,
        publicId,
        externalLink,
      })
    );
    setSubmittedForm(true);
  };

  return (
    <>
      <GoBackBtn to='/admin/education-tips' />
      {errorMsg && <Message variant='danger'>No photo to remove</Message>}
      <FormContainer>
        {errorEducationTipUpdate && (
          <Message variant='danger'>{errorEducationTipUpdate}</Message>
        )}
        {loadingEducationTipDetails ? (
          <Loader />
        ) : errorEducationTipDetails ? (
          <Message variant='danger'>{errorEducationTipDetails}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <EducationTipRow>
              <Col xl={8} md={12}>
                <Form.Group controlId='name'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='image' className='d-flex flex-column'>
                  <Form.Label>Education tip image</Form.Label>
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
                    {uploading && (
                      <Spinner
                        style={{
                          width: '200px',
                          height: '200px',
                          position: 'absolute',
                          top: '129px',
                          left: '279px',
                        }}
                        animation='border'
                      />
                    )}
                    <div style={{ position: 'relative' }}>
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
                                updateEducationTip,
                                dispatch,
                                publicId,
                                educationTipId,
                                educationTipDataToUploadWithImg,
                                '',
                                image,
                                () => {},
                                setImage,
                                'education-tip'
                              )
                            }
                          ></FormFile>
                          {image !== uploadDefaultImgUrl && (
                            <div
                              className='remove-img'
                              onClick={() =>
                                removePhoto(
                                  educationTip?.publicId,
                                  setPublicId,
                                  dispatch,
                                  updateEducationTip,
                                  educationTipId,
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
                <Form.Group controlId='externalLink' className='mt-5'>
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type='text'
                    value={externalLink || ''}
                    onChange={(e) => setExternalLink(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </EducationTipRow>
            <UpdateBtn type='submit'>
              {loadingEducationTipUpdate ? (
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
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EducationTipEdit;
