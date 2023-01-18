import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDonationById, updateDonation } from '../../actions/donationActions';
import { DONATE_UPDATE_RESET } from '../../constants/donationConstants';
import styled from 'styled-components';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { formatDate } from '../../utils/formatDate';
import {
  Container,
  TableAndPaginationContainer,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
`;

const DonationEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const donationId = match.params.id;
  const [hasLetterBeenSent, setHasLetterBeenSent] = useState(false);

  const {
    donationDetails: { loading, error, donation },
    donationUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DONATE_UPDATE_RESET });
      history.push('/admin/donationList');
    } else {
      setHasLetterBeenSent(donation?.hasLetterBeenSent);
    }
  }, [dispatch, donationId, history, donation, successUpdate]);

  useEffect(() => {
    dispatch(getDonationById(donationId));
  }, [dispatch, donationId]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateDonation({
        _id: donationId,
        hasLetterBeenSent,
      })
    );
  };

  return (
    <Container>
      <WelcomeText className='mb-1'>Donation Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Donations'
        step4={`${donation?.firstName} ${donation?.lastName}`}
        step5={
          hasLetterBeenSent ? 'Letter Sent ✅' : 'Letter has not been sent'
        }
        url1='/'
        url2='/admin'
        url3='/admin/donationList'
      />
      {(loading || loadingUpdate) && <HexagonLoader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {error ? (
        <div className='d-flex flex-column align-items-center'>
          <Message variant='danger'>{error}</Message>
        </div>
      ) : (
        <TableAndPaginationContainer>
          <div>
            <Text className='mb-1'>
              Donation amount:{' '}
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#9761aa',
                }}
              >
                ${donation?.donationAmount?.toFixed(2)}
              </span>
            </Text>
            <Text className='mb-1'>
              Donation cycle: <span>{donation?.donationType}</span>
            </Text>
            <Text className='mb-1'>
              Donation Id: <span>{donation?._id}</span>
            </Text>
            <Text className='mb-1'>
              Date: <span>{formatDate(donation?.createdAt)}</span>
            </Text>
            <ContactInfoContainer>
              <div className='mb-5'>
                <Text fontWeight='400' className='mb-1'>
                  Contact Information
                </Text>
                <Text>
                  {donation?.firstName} {donation?.lastName}
                  <br />
                  {donation?.address}
                  <br />
                  {donation?.city}, {donation?.state} {donation?.zipPostalCode}
                </Text>
              </div>

              <div className='mb-5'>
                <Text fontWeight='400' className='mb-1'>
                  Email
                </Text>
                <Text>{donation?.email}</Text>
              </div>
              <div className='mb-5'>
                <Text fontWeight='400' className='mb-1'>
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
          </div>
          <Form>
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

            <UpdateBtn onClick={(e: any) => submitHandler(e)}>
              Updat{loadingUpdate ? 'ing...' : 'e'}
            </UpdateBtn>
          </Form>
        </TableAndPaginationContainer>
      )}
    </Container>
  );
};

export default DonationEdit;
