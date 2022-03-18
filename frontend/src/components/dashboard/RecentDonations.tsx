import React from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate } from '../../utils/formatDate';
import { StyledCard } from '../styles/Styles';

const GoldText = styled(Card.Text)`
  font-family: Fredoka One;
  font-size: 40px;
  background: -webkit-linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: radial-gradient(
      ellipse farthest-corner at right bottom,
      #fedb37 0%,
      #fdb931 8%,
      #9f7928 30%,
      #8a6e2f 40%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      #ffffff 0%,
      #ffffac 8%,
      #d1b464 25%,
      #5d4a1f 62.5%,
      #5d4a1f 100%
    );
`;

const Column = styled(Col)`
  flex-wrap: wrap;
`;

const DonationCard = styled(Card)`
  width: 175px;
  height: 175px;
  border-radius: 12px;
  background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
  border: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
`;

const CardBody = styled(Card.Body)`
  flex-direction: column;
  justify-content: space-between;
`;

const ListGroupItem = styled(ListGroup.Item)`
  font-weight: bold;
  background: transparent;
  color: #fff;
  :hover {
    background: none;
  }
`;

const Text = styled(Card.Text)`
  color: #fff;
`;

const RecentDonations = ({ donations, history }: any) => {
  return (
    <StyledCard className='p-3'>
      <Row>
        <Col className='my-3'>
          <h5>Recent Donations</h5>
        </Col>
      </Row>
      <Row>
        <Column className='d-flex mb-3'>
          {donations !== undefined &&
            donations.length !== 0 &&
            donations
              .map((donation: any) => (
                <DonationCard
                  onClick={() =>
                    history.push(`/admin/donation/${donation._id}/edit`)
                  }
                  className='m-2 d-flex '
                  key={donation._id}
                >
                  <CardBody className='d-flex'>
                    <ListGroup variant='flush'>
                      <ListGroupItem className='m-0 pl-0 pt-0 pr-0'>
                        {donation.firstName} {donation.lastName}
                      </ListGroupItem>
                      <Text className='mt-1'>
                        {formatDate(donation.createdAt)}
                      </Text>
                    </ListGroup>
                    <div>
                      <GoldText>${donation.donationAmount}</GoldText>
                    </div>
                  </CardBody>
                </DonationCard>
              ))
              .reverse()
              .filter((_: any, d: number) => d < 5)}
        </Column>
      </Row>
      <Row>
        <Col className='mx-3 my-4 d-flex justify-content-end'>
          <Link to='/admin/donationList'>See All Donations</Link>
        </Col>
      </Row>
    </StyledCard>
  );
};

export default RecentDonations;
