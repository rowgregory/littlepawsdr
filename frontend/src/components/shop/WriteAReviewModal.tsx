import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../Message';
import { Text } from '../styles/Styles';

const WriteAReviewModal = ({
  show,
  handleClose,
  productId,
  rating,
  comment,
  errorProductReview,
  userInfo,
  setComment,
  setRating,
  loading,
}: any) => {
  const submitHandler = (e: any) => {
    e.preventDefault();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Text fontFamily='Roboto Condensed' fontSize='1.5rem' color='#fff'>
            Write a customer review
          </Text>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#fff' }}>
        <div className='p-3'>
          {errorProductReview && (
            <Message variant='danger'>{errorProductReview}</Message>
          )}
          {userInfo ? (
            <Form onSubmit={submitHandler}>
              <Form.Group className='d-flex flex-column' controlId='rating'>
                <Form.Label className='mt-3'>Rating</Form.Label>
                <Form.Control
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                  }}
                  className='p-2'
                  as='select'
                  value={rating}
                  onChange={(e: any) => setRating(parseInt(e.target.value))}
                >
                  <option value=''>Select...</option>
                  <option value='1'>1 - Poor</option>
                  <option value='2'>2 - Fair</option>
                  <option value='3'>3 - Good</option>
                  <option value='4'>4 - Very Good</option>
                  <option value='5'>5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className='d-flex flex-column' controlId='comment'>
                <Form.Label className='mt-3'>Comment</Form.Label>
                <Form.Control
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                  }}
                  as='textarea'
                  rows={3}
                  value={comment}
                  onChange={(e: any) => setComment(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                type='submit'
                variant='primary'
                className='align-self-end'
              >
                {loading ? 'Loading...' : 'Submit'}
              </Button>
            </Form>
          ) : (
            <Row>
              <Col className='my-3'>
                Please <Link to='/login'>Sign In </Link>to write a review
              </Col>
            </Row>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WriteAReviewModal;
