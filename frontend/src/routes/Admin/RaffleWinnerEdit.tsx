import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRaffleWinnerDetails,
  updateRaffleWinner,
} from '../../actions/raffleWinnerActions';
import {
  RAFFLE_WINNER_DETAILS_RESET,
  RAFFLE_WINNER_UPDATE_RESET,
} from '../../constants/raffleWinnerContants';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import styled from 'styled-components';
import { removePhoto } from '../../utils/removePhoto';
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
import { getMonth } from '../../utils/raffleWinnerUtils';

export const EditBtn = styled.div<{ top?: string; left?: string }>`
  border: ${({ theme }) => `1px solid ${theme.input.border}`};

  background: ${({ theme }) => theme.input.bg};
  border-radius: 0.5rem;
  position: absolute;
  top: ${({ top }) => (top ? top : '-50px')};
  left: ${({ left }) => (left ? left : '20px')};
  z-index: 10;
  cursor: pointer;

  font-weight: 300;
  &.imgOptions {
    top: ${({ top }) => (top ? top : '-17px')};
    cursor: pointer;
  }
  div {
    label {
      margin-bottom: 0;
      cursor: pointer;
    }
  }
`;

const RaffleWinnerEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const raffleWinnerId = match.params.id;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [month, setMonth] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [file, setFile] = useState({}) as any;

  const {
    raffleWinnerDetails: { loading, error, raffleWinner },
    raffleWinnerUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: RAFFLE_WINNER_DETAILS_RESET });
    dispatch(getRaffleWinnerDetails(raffleWinnerId));
    dispatch({ type: RAFFLE_WINNER_UPDATE_RESET });
  }, [dispatch, raffleWinnerId]);

  useEffect(() => {
    if (raffleWinner?.month === 'January') {
      setMonth(`${new Date().getFullYear()}-01`);
    } else if (raffleWinner?.month === 'February') {
      setMonth(`${new Date().getFullYear()}-02`);
    } else if (raffleWinner?.month === 'March') {
      setMonth(`${new Date().getFullYear()}-03`);
    } else if (raffleWinner?.month === 'April') {
      setMonth(`${new Date().getFullYear()}-04`);
    } else if (raffleWinner?.month === 'May') {
      setMonth(`${new Date().getFullYear()}-05`);
    } else if (raffleWinner?.month === 'June') {
      setMonth(`${new Date().getFullYear()}-06`);
    } else if (raffleWinner?.month === 'July') {
      setMonth(`${new Date().getFullYear()}-07`);
    } else if (raffleWinner?.month === 'August') {
      setMonth(`${new Date().getFullYear()}-08`);
    } else if (raffleWinner?.month === 'September') {
      setMonth(`${new Date().getFullYear()}-09`);
    } else if (raffleWinner?.month === 'October') {
      setMonth(`${new Date().getFullYear()}-10`);
    } else if (raffleWinner?.month === 'November') {
      setMonth(`${new Date().getFullYear()}-11`);
    } else if (raffleWinner?.month === 'December') {
      setMonth(`${new Date().getFullYear()}-12`);
    }

    setName(raffleWinner?.name);
    setImage(raffleWinner?.image);
    setMessage(raffleWinner?.message);
  }, [raffleWinner]);

  useEffect(() => {
    if (successUpdate && submittedForm) {
      setSubmittedForm(false);
      history.push('/admin/raffleWinnerList');
    }
  }, [history, submittedForm, successUpdate]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setSubmittedForm(true);

    setUploading(true);
    // TODO use new upload image function

    dispatch(
      updateRaffleWinner({
        _id: raffleWinnerId,
        name,
        month: getMonth(month),
        message,
        image,
      })
    );
  };

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  const removePhotoHandler = (e: any) => {
    e.preventDefault();
    removePhoto(
      raffleWinner.publicId,
      () => {},
      dispatch,
      updateRaffleWinner,
      raffleWinnerId,
      setErrorMsg
    );
  };

  return (
    <Container>
      <WelcomeText className='mb-1'>Raffle Winner Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Raffle Winners'
        step4={raffleWinner?.name}
        step5='Edit'
        url1='/'
        url2='/admin'
        url3='/admin/raffleWinnerList'
      />
      {(error || errorUpdate || errorMsg) && (
        <Message variant='danger'>{error || errorUpdate || errorMsg}</Message>
      )}
      {(loading || loadingUpdate || submittedForm) && <HexagonLoader />}

      <EditForm>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
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
                raffleWinner?.image === defaultImages.upload || file?.name ? (
                  <UploadImageSquare className={uploading ? 'anim' : ''}>
                    <PhotoUploadIcon ready={file} />
                  </UploadImageSquare>
                ) : (
                  <Image
                    src={raffleWinner?.image}
                    width='200px'
                    height='200px'
                    style={{ objectFit: 'cover' }}
                    alt='Raffle Winner Edit'
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
        <Form.Group controlId='message' className='mt-5'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            rows={5}
            as='textarea'
            placeholder='Enter message'
            value={message || ''}
            onChange={(e) => setMessage(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='month'>
          <Form.Label>Month</Form.Label>
          <Form.Control
            type='month'
            value={month || ''}
            onChange={(e) => setMonth(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <UpdateBtn onClick={(e: any) => submitHandler(e)}>
          Updat{loadingUpdate ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default RaffleWinnerEdit;
