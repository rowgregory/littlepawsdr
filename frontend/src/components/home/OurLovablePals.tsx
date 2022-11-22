import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableDachshunds } from '../../actions/dachshundsActions';
import { Text } from '../styles/Styles';
import {
  ComingSoonText,
  DogContainer,
  SectionContainer,
  SectionTitle,
} from './styles';
import HexagonLoader from '../Loaders/HexagonLoader/HexagonLoader';
import RightArrow from '../svg/RightArrow';

const OurLovablePals = () => {
  const dispatch = useDispatch();

  const { dachshunds: dachshundsList } = useSelector((state: any) => state);
  const { loading, dachshunds } = dachshundsList;

  localStorage.setItem(
    'dachshunds',
    dachshunds === undefined ? JSON.stringify([]) : JSON.stringify(dachshunds)
  );

  useEffect(() => {
    dispatch(getAvailableDachshunds());
  }, [dispatch]);

  return (
    <>
      {loading && <HexagonLoader />}
      <SectionContainer>
        {[undefined, null].includes(dachshunds) ? (
          <div className='d-flex flex-column w-100 align-items-center my-5'>
            <ComingSoonText>DACHSHUNDS COMING SOON</ComingSoonText>
          </div>
        ) : (
          <>
            <SectionTitle to='/available'>Meet our dachshunds</SectionTitle>
            <DogContainer className='mx-0 mb-5'>
              {dachshunds?.data
                ?.map((dachshund: any, i: number) => (
                  <Link
                    key={i}
                    to={{
                      pathname: `/available/dogs/${dachshund?.id}`,
                      state: {
                        directBackTo: '',
                        pathName: 'home',
                      },
                    }}
                  >
                    <Col
                      lg={12}
                      className='mx-0 px-0'
                      style={{ position: 'relative', overflow: 'hidden' }}
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <Image
                          src={dachshund?.attributes?.photos[1]}
                          alt={`${dachshund?.attributes?.name}-${i}`}
                        />
                      </div>
                      <Text
                        className='d-flex align-items-center justify-content-center'
                        height='64px'
                        textAlign='center'
                        fontSize='24px'
                        p='9.6px'
                        fontWeight={400}
                      >
                        {dachshund?.attributes?.name}
                      </Text>
                    </Col>
                  </Link>
                ))
                .filter((_: any, i: number) => i < 4)}
            </DogContainer>
            <RightArrow text='See all dachshunds' url='/available' />
          </>
        )}
      </SectionContainer>
    </>
  );
};

export default OurLovablePals;
