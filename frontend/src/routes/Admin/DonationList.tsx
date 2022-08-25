import React, { useEffect, useState } from 'react';
import { Col, Table, Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listDonations } from '../../actions/donationActions';
import DeleteModal from '../../components/DeleteModal';
import {
  LoadingImg,
  StyledEditBtn,
  Text,
} from '../../components/styles/Styles';
import { formatDate } from '../../utils/formatDate';
import { AiFillDelete } from 'react-icons/ai';
import {
  SearchBar,
  TableHead,
  TableRow,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import toaster from 'toasted-notes';
import { ToastAlert } from '..';

const DonationList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [donationSet, setDonation] = useState([]) as any;

  const donationList = useSelector((state: any) => state.donationList);
  const { loading, error, donations } = donationList;

  const donationDelete = useSelector((state: any) => state.donationDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = donationDelete;

  useEffect(() => {
    if (donations) {
      setDonation(donations);
    }
  }, [donations]);

  useEffect(() => {
    dispatch(listDonations());
  }, [dispatch, successDelete]);

  useEffect(() => {
    if (error || errorDelete) {
      toaster.notify(
        ({ onClose }) => ToastAlert(error || errorDelete, onClose, 'error'),
        {
          position: 'bottom',
          duration: 20000,
        }
      );
    }
  }, [error, errorDelete]);

  const filteredDonations = donationSet?.filter((donations: any) =>
    donations.email.toLowerCase().includes(text.toLowerCase())
  );

  return error ? (
    <></>
  ) : (
    <>
      <DeleteModal
        actionFunc='Donation'
        show={show}
        handleClose={handleClose}
        id={id}
      />
      {loading ? (
        <Col className='mb-3 '>
          <LoadingImg w='20rem' h='2.5rem' />
        </Col>
      ) : (
        <Col className='d-flex align-items-center justify-content-between'>
          <SearchBar>
            <Form.Control
              as='input'
              type='text'
              placeholder='Search by email'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            ></Form.Control>
          </SearchBar>
        </Col>
      )}
      <Col>
        <Table hover responsive className='table-sm'>
          <TableHead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>ADDRESS</th>
              <th>ZIP CODE</th>
              <th>CITY</th>
              <th>STATE</th>
              <th>EMAIL</th>
              <th>DONATION AMOUNT</th>
              <th>IN MEMORY OF</th>
              <th>MEMORY ADDRESS</th>
              <th>IN HONOR OF</th>
              <th>HONOR ADDRESS</th>
              <th>CREATED ON</th>
              <th>LETTER HAS BEEN SENT</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </TableHead>
          <TransitionGroup component='tbody'>
            {filteredDonations
              ?.map((donation: any) => (
                <CSSTransition
                  key={donation?._id}
                  timeout={500}
                  classNames='item'
                >
                  <TableRow>
                    <td>
                      <Text>{donation?.firstName}</Text>
                    </td>
                    <td>
                      <Text>{donation?.lastName}</Text>
                    </td>
                    <td>
                      <Text>{donation?.address}</Text>
                    </td>
                    <td>
                      <Text>{donation?.zipPostalCode}</Text>
                    </td>
                    <td>
                      <Text>{donation?.city}</Text>
                    </td>
                    <td>
                      <Text>{donation?.state}</Text>
                    </td>
                    <td>
                      <Text>{donation?.email}</Text>
                    </td>
                    <td>
                      <Text>{donation?.donationAmount}</Text>
                    </td>
                    <td>
                      <Text>{donation?.inMemoryOfWho}</Text>
                    </td>
                    <td>
                      <Text>{donation?.addressForAcknowledgementMemory}</Text>
                    </td>
                    <td>
                      <Text>{donation?.inHonorOfWho}</Text>
                    </td>
                    <td>
                      <Text>{donation?.addressForAcknowledgementHonor}</Text>
                    </td>
                    <td>
                      <Text>{formatDate(donation?.createdAt)}</Text>
                    </td>
                    <td>
                      {donation?.hasLetterBeenSent ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer
                        to={`/admin/donation/${donation?._id}/edit`}
                      >
                        <StyledEditBtn>
                          <i className='fas fa-edit'></i>
                        </StyledEditBtn>
                      </LinkContainer>
                    </td>
                    <td>
                      <Button
                        variant='danger'
                        className='border-0'
                        onClick={() => {
                          setId(donation?._id);
                          handleShow();
                        }}
                      >
                        {loadingDelete ? (
                          <Spinner animation='border' />
                        ) : (
                          <AiFillDelete />
                        )}
                      </Button>
                    </td>
                  </TableRow>
                </CSSTransition>
              ))
              .reverse()}
          </TransitionGroup>
        </Table>
      </Col>
    </>
  );
};

export default DonationList;
