import React, { useEffect, useMemo, useState } from 'react';
import { Form, Button, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getDonationById, updateDonation } from '../../actions/donationActions';
import { DONATE_UPDATE_RESET } from '../../constants/donationConstants';
import { formatDate } from '../../utils/formatDate';
import GoBackBtn from '../../utils/GoBackBtn';
import styled from 'styled-components';
import { useRouteMatch, useHistory } from 'react-router-dom';

const DonationDetails = styled.div`
  border: 1px solid ${({ theme }) => theme.input.border};
  padding: 2rem;
`;

const HeaderDetails = styled.div`
  font-weight: bold;
  font-size: 1rem;
  line-height: 2rem;
  font-family: 'Roboto';
  span {
    font-weight: normal;
  }
`;

const ContactInfoContainer = styled.div`
  margin-top: 2rem;
  background: ${({ theme }) => theme.input.bg};
  padding: 1.75rem 2rem;
  display: flex;
  justify-content: space-between;
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
    <>
      <GoBackBtn to='/admin/donationList' />
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading || loadingUpdate ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Col md={10} className='mx-auto'>
          <DonationDetails>
            <HeaderDetails>
              Donation Id: <span>{donation._id}</span>
            </HeaderDetails>
            <HeaderDetails>
              Date: <span>{formatDate(donation.createdAt)}</span>
            </HeaderDetails>
            <HeaderDetails>
              Donation amount:{' '}
              <span>${donation.donationAmount.toFixed(2)}</span>
            </HeaderDetails>
            <ContactInfoContainer>
              <div className='d-flex flex-column'>
                <HeaderDetails>Contact Information</HeaderDetails>
                <Card.Text>
                  {donation.firstName} {donation.lastName}
                  <br />
                  {donation.address}
                  <br />
                  {donation.city}
                  <br />
                  {donation.state}
                  <br />
                  {donation.zipPostalCode}
                </Card.Text>
              </div>
              <div>
                <HeaderDetails>Email</HeaderDetails>
                <Card.Text>{donation.email}</Card.Text>
              </div>
              <div>
                <HeaderDetails>In honor/memory</HeaderDetails>
                <Card.Text>
                  In Memory Of: {donation.inMemoryOfWho}
                  <br />
                  Memory Address: {donation.addressForAcknowledgementMemory}
                  <br />
                  In Honor Of: {donation.inHonorOfWho}
                  <br />
                  Honor Address: {donation.addressForAcknowledgementHonor}
                </Card.Text>
              </div>
            </ContactInfoContainer>
            <Card.Text></Card.Text>
          </DonationDetails>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='hasLetterBeenSent' className='my-4'>
              <Form.Check
                type='switch'
                label='Letter has been sent out'
                checked={hasLetterBeenSent ? hasLetterBeenSent : false}
                onChange={(e) => setHasLetterBeenSent(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        </Col>
      )}
    </>
  );
};

export default DonationEdit;
