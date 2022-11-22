import React, { FC } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from '../styles/Styles';
import { AiOutlineCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NoItemsContainer = styled.div`
  min-height: calc(100vh);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NoItemsDefault: FC<{ items: string; Icon?: any }> = ({ items, Icon }) => {
  return (
    <NoItemsContainer>
      <Row>
        <Col className='d-flex flex-column align-items-center'>
          <div className='mb-4'>
            <Icon />
          </div>

          {items === 'orders' && (
            <Text>
              You have not ordered anything yet.{' '}
              <Link to='/shop'>
                Go to the shop
                <AiOutlineCaretRight />
              </Link>
            </Text>
          )}
          {!['cart', 'orders'].includes(items) && (
            <Text>
              Sorry, no {items} available at the moment. Check back soon!
            </Text>
          )}
          {items === 'cart' && (
            <Text>
              Your {items} is empty.{' '}
              <Link to='/shop'>
                Go to the shop
                <AiOutlineCaretRight />
              </Link>
            </Text>
          )}
        </Col>
      </Row>
    </NoItemsContainer>
  );
};

export default NoItemsDefault;
