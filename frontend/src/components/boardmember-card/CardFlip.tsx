import React from 'react';
import './index.css';
import { Image } from 'react-bootstrap';
import Logo from '../../components/assets/logo.png';
import { Link } from 'react-router-dom';
import {
  Affiliation,
  BlobWrap,
  Card3DWrap,
  Email,
  Inner,
  Location,
  Name,
  OuterWrapper,
  ProfileCardImg,
  Right,
} from '../styles/board-members/Styles';
import { LoadingImg } from '../LoadingImg';

const CardFlip = ({ user, loading }: any) => {
  const retroHeart = `Donate! <3`;
  return (
    <div className=''>
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
                {loading ? (
                  <LoadingImg w='100%' h='380px' borderRadius='16px' />
                ) : (
                  <>
                    <Inner className='inner'>
                      <BlobWrap
                        img={user?.avatar || user?.image}
                        className='pricing-wrap'
                        name={user?.name}
                      >
                        <div className='blob'></div>
                      </BlobWrap>
                    </Inner>
                    <ProfileCardImg
                      src={user?.profileCardTheme}
                      alt={`LPDR Board member: ${user?.name}`}
                    />
                    <h6>Donate</h6>
                    <Right className='d-flex flex-column w-100 mr-5'>
                      <Name className='d-flex justify-content-center user-name'>
                        {user?.name}
                      </Name>
                      <Email className='d-flex'>{user?.email}</Email>
                      <Location className='d-flex align-items-end'>
                        {user?.location}
                      </Location>
                    </Right>
                    <Inner className='affiliation'>
                      <Affiliation>
                        {user?.volunteerTitle || user?.affiliation}
                      </Affiliation>
                    </Inner>
                  </>
                )}
              </OuterWrapper>
            </label>
          </div>
          <div className='card-back'>
            <label className='w-100 mx-auto p-3 ' htmlFor={user._id}>
              <div className='pricing-wrap d-flex justify-content-center flex-column align-items-center'>
                <p className='text-center'>{user?.bio ?? 'Bio coming soon!'}</p>
                <Image
                  src={Logo}
                  alt='bio-car-logo'
                  className='mx-auto'
                  style={{ maxWidth: '200px', width: '100%' }}
                />
                <h6 className='text-center mt-5'>Go Back</h6>
                <h6>or</h6>
                <Link to='/donate'>{retroHeart}</Link>
              </div>
            </label>
          </div>
        </div>
      </Card3DWrap>
    </div>
  );
};

export default CardFlip;
