import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/esm/Row';
import {
  Text,
  CardTitle,
  StyledCard,
  LoadingImg,
} from '../../components/styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { useEffect } from 'react';
import { listEducationTips } from '../../actions/educationTipActions';
import NoItemsDefault from '../../components/common/NoItemsDefault';
import styled from 'styled-components';

const Path = styled.path`
  fill: ${({ theme }) => theme.text};
`;

const NoEducation = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 512 512'
      width='200px'
      height='200px'
    >
      <g>
        <g>
          <Path
            d='M503.467,207.556h-8.533v-8.166c0-14.319-11.648-25.967-25.967-25.967h-4.096l29.457-73.626
			c0.162-0.418,0.128-0.845,0.23-1.263c0.136-0.597,0.316-1.169,0.324-1.775c0.009-0.555-0.137-1.075-0.23-1.621
			c-0.094-0.538-0.145-1.067-0.341-1.579c-0.23-0.58-0.597-1.067-0.947-1.587c-0.23-0.35-0.341-0.751-0.631-1.067l-58.701-65.033
			c-0.026-0.034-0.068-0.043-0.102-0.077c-0.068-0.077-0.12-0.162-0.196-0.239c-7.245-7.253-16.888-11.247-27.153-11.247
			c-10.257,0-19.9,3.994-27.145,11.238l-15.095,15.087c-1.596,1.604-2.5,3.772-2.5,6.033c0,2.27,0.905,4.437,2.5,6.042l42.24,42.231
			c1.673,1.673,3.857,2.5,6.042,2.5c2.176,0,4.361-0.828,6.033-2.5l15.078-15.078c4.992-4.992,8.303-11.145,9.967-17.809
			l32.802,36.335l-30.012,75.034h-10.923c-14.319,0-25.967,11.648-25.967,25.967v8.166h-68.924l-11.674-144.23
			c-1.289-13.961-9.361-26.735-22.178-35.063c-8.329-5.41-18.731-8.26-30.097-8.26H240.06c-13.756,0-26.197,3.874-35.994,11.204
			c-11.264,8.448-18.091,19.849-19.226,32.102l-13.423,144.247h-39.953c-2.219-2.526-3.456-5.453-3.465-8.482
			c-0.009-3.063,1.246-6.025,3.49-8.585h13.576c3.601,0,6.818-2.261,8.03-5.649c1.22-3.388,0.179-7.177-2.594-9.463
			c-3.499-2.884-5.427-6.588-5.436-10.436c-0.008-3.874,1.937-7.62,5.461-10.556c2.756-2.295,3.789-6.084,2.56-9.463
			c-1.22-3.379-4.429-5.632-8.021-5.632h-102.4c-14.114,0-25.6,11.486-25.6,25.6c0,3.371,0.691,6.571,1.877,9.523
			C8.064,177.357,0,187.221,0,199.023c0,3.942,0.973,7.637,2.577,10.982C0.99,211.558,0,213.7,0,216.09v34.133
			c0,4.71,3.814,8.533,8.533,8.533h8.533v179.2v51.2c0,4.71,3.814,8.533,8.533,8.533h34.133c4.719,0,8.533-3.823,8.533-8.533V446.49
			h176.939c-0.546,0.853-1.186,1.732-2.014,2.637c-4.924,5.385-18.679,14.43-55.057,14.438c-6.647-0.299-40.499-1.22-53.99,11.674
			c-4.019,3.823-6.144,8.644-6.144,13.918c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533c0-0.324,0-0.759,0.853-1.57
			c6.11-5.845,27.938-7.603,41.813-6.963c33.246,0,56.218-6.793,68.267-20.207c12.049,13.406,34.987,20.198,68.591,20.198h0.068
			c13.491-0.631,35.311,1.126,41.421,6.972c0.853,0.811,0.853,1.246,0.853,1.57c0,4.71,3.814,8.533,8.533,8.533
			s8.533-3.823,8.533-8.533c0-5.274-2.125-10.095-6.144-13.918c-13.491-12.877-47.343-11.972-53.589-11.682
			c-36.779,0-50.534-9.045-55.458-14.43c-0.828-0.905-1.468-1.783-2.014-2.637h176.939v42.667c0,4.71,3.814,8.533,8.533,8.533H486.4
			c4.719,0,8.533-3.823,8.533-8.533v-51.2v-179.2h8.533c4.719,0,8.533-3.823,8.533-8.533V216.09
			C512,211.379,508.186,207.556,503.467,207.556z M25.6,190.49h17.067h69.547c-0.845,2.773-1.289,5.666-1.28,8.619
			c0.009,2.901,0.435,5.734,1.263,8.448H25.6c-4.71,0-8.533-3.831-8.533-8.533C17.067,194.321,20.89,190.49,25.6,190.49z
			 M443.733,365.85c0,20.932-17.033,37.973-37.973,37.973H106.24c-20.941,0-37.973-17.041-37.973-37.973v-43.52
			c0-20.932,17.033-37.973,37.973-37.973h299.52c20.941,0,37.973,17.041,37.973,37.973V365.85z M494.933,241.69H486.4H25.6h-8.533
			v-17.067H25.6H128h51.2h153.6h85.333H486.4h8.533V241.69z'
          />
        </g>
      </g>
    </svg>
  );
};

const Education = () => {
  const educationTipList = useSelector((state: any) => state.educationTipList);
  const {
    loading: loadingEducationTips,
    error: errorEducationTips,
    educationTips,
  } = educationTipList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listEducationTips());
  }, [dispatch]);

  if (educationTips?.length === 0) {
    return <NoItemsDefault items='education tips' Icon={NoEducation} />;
  }

  return (
    <>
      {errorEducationTips ? (
        <Message variant='danger'>{errorEducationTips}</Message>
      ) : (
        educationTipList.length > 0 && (
          <>
            <Row>
              <Col className='mb-3'>
                <Text>
                  You have come to the right spot to further educate yourself on
                  our favorite breed, THE DACHSHUND!
                </Text>
              </Col>
            </Row>
            <Row>
              <Col className='my-3 d-flex flex-wrap'>
                {loadingEducationTips
                  ? [1, 2, 3, 4].map((i: number) => (
                      <div className='mr-3' key={i}>
                        <LoadingImg h='368.21px' w='300px' />
                      </div>
                    ))
                  : educationTips?.map((obj: any, i: number) => (
                      <StyledCard
                        className='mr-3'
                        key={i}
                        onClick={() => window.open(obj.externalLink)}
                        style={{ width: '300px' }}
                      >
                        <Card.Img
                          src={obj.image}
                          alt='bg'
                          height='250px'
                          style={{ objectFit: 'cover' }}
                        />
                        <Card.Body>
                          <CardTitle>{obj.title}</CardTitle>
                          <Text>Read</Text>
                        </Card.Body>
                      </StyledCard>
                    ))}
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default Education;