import { Fragment } from 'react';
import './index.css';
import styled from 'styled-components';

const Card3DWrap = styled.div`
  background-color: transparent;
  border: 1px solid #f1f1f1;
  perspective: 1000px;
  border: 0 !important;
  border-radius: 0px;
  width: 100%;
  height: 500px;
  margin-inline: 8px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 600px;
    height: 380px;
    background: none;
    border-radius: 16px;
  }
`;

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h6 {
    text-align: center;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex-direction: row;

    h6 {
      align-self: center;
    }
  }
`;


const CardFlip = ({ user }: any) => {

  return (
    <Fragment>
      <input
        className='pricing'
        type='checkbox'
        id={user._id}
        name={user._id}
      />
      <Card3DWrap className='card-3d-wrap mx-auto'>
        <div className='card-3d-wrapper'>
          <div className='card-front'>
            <label className='w-100' htmlFor={user._id}>
              <OuterWrapper>

              </OuterWrapper>
            </label>
          </div>
          <div className='card-back'>
            <label className='w-100 mx-auto p-3 ' htmlFor={user._id}>
              <div className='pricing-wrap d-flex justify-content-center flex-column align-items-center'>
                <p className='text-center'>Test</p>

              </div>
            </label>
          </div>
        </div>
      </Card3DWrap>
    </Fragment>
  );
};

export default CardFlip;
