import React, { useEffect, useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDonationById, updateDonation } from '../../actions/donationActions';
import { DONATE_UPDATE_RESET } from '../../constants/donationConstants';
import GoBackBtn from '../../utils/GoBackBtn';
import styled from 'styled-components';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import FormContainer from '../../components/FormContainer';
import { formatDateTime } from '../../utils/formatDateTime';
import toaster from 'toasted-notes';
import { ToastAlert } from '../../components/common/ToastAlert';
import { LoadingImg } from '../../components/LoadingImg';

const ContactInfoContainer = styled.div`
  background: ${({ theme }) => theme.input.bg};
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
`;

const DonationEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const donationId = match.params.id;
  const [hasLetterBeenSent, setHasLetterBeenSent] = useState(false);

  const donationDetails = useSelector((state: any) => state.donationDetails);
  const { loading, error, donation } = donationDetails;

  const donationUpdate = useSelector((state: any) => state.donationUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = donationUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DONATE_UPDATE_RESET });
      history.push('/admin/donationList');
    } else {
      setHasLetterBeenSent(donation?.hasLetterBeenSent);
    }
  }, [dispatch, donationId, history, donation, successUpdate]);

  useMemo(() => dispatch(getDonationById(donationId)), [dispatch, donationId]);

  useEffect(() => {
    if (error || errorUpdate) {
      toaster.notify(
        ({ onClose }) => ToastAlert(error || errorUpdate, onClose, 'error'),
        {
          position: 'bottom',
          duration: 20000,
        }
      );
    }
  }, [errorUpdate, error]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateDonation({
        _id: donationId,
        hasLetterBeenSent,
      })
    );
  };

  return error ? (
    <></>
  ) : (
    <>
      <GoBackBtn to='/admin/donationList' />
      <FormContainer>
        <div>
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='6rem' />
            </div>
          ) : (
            <>
              <Text>
                Donation Id: <span>{donation?._id}</span>
              </Text>
              <Text>
                Date:
                <span>
                  {formatDateTime(donation.createdAt, { year: '2-digit' })}
                </span>
              </Text>
              <Text className='mt-3 mb-1'>
                Donation amount:
                <span style={{ fontSize: '1.25rem' }}>
                  ${donation?.donationAmount.toFixed(2)}
                </span>
              </Text>
            </>
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='20rem' />
            </div>
          ) : (
            <ContactInfoContainer>
              <div className='d-flex mb-5'>
                <div className='d-flex flex-column mr-4' style={{ flex: 1 }}>
                  <Text fontSize='1.125rem' className='mb-3'>
                    Contact Information
                  </Text>
                  <Text>
                    {donation?.firstName} {donation?.lastName}
                    <br />
                    {donation?.address}
                    <br />
                    {donation?.city}
                    <br />
                    {donation?.state}
                    <br />
                    {donation?.zipPostalCode}
                  </Text>
                </div>
                <div style={{ flex: 1 }}>
                  <Text fontSize='1.125rem' className='mb-3'>
                    Email
                  </Text>
                  <Text>{donation?.email}</Text>
                </div>
              </div>
              <div>
                <Text fontSize='1.125rem' className='mb-3'>
                  In Honor/Memory
                </Text>
                <Text>
                  In Memory Of: {donation?.inMemoryOfWho}
                  <br />
                  Memory Address: {donation?.addressForAcknowledgementMemory}
                  <br />
                  In Honor Of: {donation?.inHonorOfWho}
                  <br />
                  Honor Address: {donation?.addressForAcknowledgementHonor}
                </Text>
              </div>
            </ContactInfoContainer>
          )}
        </div>
        <Form onSubmit={submitHandler}>
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='10rem' h='2.5rem' />
            </div>
          ) : (
            <Form.Group
              controlId='hasLetterBeenSent'
              className='my-4 d-flex align-items-center'
            >
              <Form.Check
                type='switch'
                checked={hasLetterBeenSent ? hasLetterBeenSent : false}
                onChange={(e) => setHasLetterBeenSent(e.target.checked)}
              ></Form.Check>
              <Form.Label className='mb-0'>Letter has been sent</Form.Label>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='5rem' h='2.5rem' borderRadius='0.5rem' />
            </div>
          ) : (
            <UpdateBtn type='submit'>
              {loadingUpdate ? (
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
          )}
        </Form>
      </FormContainer>
    </>
  );
};

export default DonationEdit;
