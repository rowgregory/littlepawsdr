import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Text } from '../Styles';

const PopoverContent = ({ validations }: any) => {
  return (
    <OverlayTrigger
      trigger='click'
      placement='top'
      overlay={
        <Popover
          id='popover-basic'
          style={{ background: '#f6f8fa', border: 'none' }}
        >
          <Popover.Title>Password Requirements</Popover.Title>
          <Popover.Content className='d-flex align-items-start flex-column'>
            <Text fontSize='0.875rem'>
              {validations[0] ? (
                <i className='fas fa-check' style={{ color: '#77b300' }}></i>
              ) : (
                <i className='fas fa-times' style={{ color: 'red' }}></i>
              )}
              &nbsp; must be at least 9 characters
            </Text>
            <Text fontSize='0.875rem'>
              {' '}
              {validations[1] ? (
                <i className='fas fa-check' style={{ color: '#77b300' }}></i>
              ) : (
                <i className='fas fa-times' style={{ color: 'red' }}></i>
              )}
              &nbsp; must contain a capital letter
            </Text>
            <Text fontSize='0.875rem'>
              {' '}
              {validations[2] ? (
                <i className='fas fa-check' style={{ color: '#77b300' }}></i>
              ) : (
                <i className='fas fa-times' style={{ color: 'red' }}></i>
              )}
              &nbsp; must contain a number
            </Text>
            <Text fontSize='0.875rem'>
              {' '}
              {validations[3] ? (
                <i className='fas fa-check' style={{ color: '#77b300' }}></i>
              ) : (
                <i className='fas fa-times' style={{ color: 'red' }}></i>
              )}
              &nbsp; must contain one of ~`! @#$%^&*()_+=
              {}
              |:;"',.?
            </Text>
          </Popover.Content>
        </Popover>
      }
    >
      <i className='fas fa-unlock fa-sm'></i>
    </OverlayTrigger>
  );
};

export default PopoverContent;
