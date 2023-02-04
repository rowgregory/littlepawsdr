import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableDachshunds } from '../../actions/dachshundsActions';
import {
  ComingSoonText,
  DogContainer,
  SectionContainer,
  SectionTitle,
} from './styles';
import RightArrow from '../svg/RightArrow';
import { LoadingImg } from '../LoadingImg';

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
      <SectionContainer>
        {[undefined, null].includes(dachshunds) ? (
          <div className='d-flex flex-column w-100 align-items-center my-5'>
            <ComingSoonText>DACHSHUNDS COMING SOON</ComingSoonText>
          </div>
        ) : (
          <>
            <SectionTitle to='/available'>Meet our dachshunds</SectionTitle>
            <DogContainer className='mx-0 mb-5'>
              {loading
                ? [1, 2, 3, 4].map((_: any, i: number) => (
                    <LoadingImg w='100%' h='100%' key={i} />
                  ))
                : dachshunds?.data
                    ?.map((dachshund: any, i: number) => (
                      <Link
                        key={i}
                        to={{
                          pathname: `/available/dogs/${dachshund?.id}`,
                          state: {
                            dog: dachshund,
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
                          <h5 className='text-center mt-2'>
                            {dachshund?.attributes?.name}
                          </h5>
                        </Col>
                      </Link>
                    ))
                    .filter((_: any, i: number) => i < 4)}
            </DogContainer>
            <RightArrow text='See All Available Dachshunds' url='/available' />
          </>
        )}
      </SectionContainer>
    </>
  );
};

export default OurLovablePals;
