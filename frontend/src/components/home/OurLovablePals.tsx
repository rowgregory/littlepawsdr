import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  DogContainer,
  ImageContainer,
  SectionContainer,
  SectionTitle,
} from './styles';
import RightArrow from '../svg/RightArrow';
import { LoadingImg } from '../LoadingImg';
import GradientText from '../GradientText';
import { Text } from '../styles/Styles';

const OurLovablePals = () => {
  const state = useSelector((state: any) => state);
  const dachshunds = state.dachshunds.dachshunds;
  const loading = state.dachshunds.loading;

  return (
    <SectionContainer>
      {[undefined, null].includes(dachshunds) ? (
        <div className='d-flex flex-column w-100 align-items-center my-5'>
          <GradientText
            text='DACHSHUNDS COMING SOON'
            gradient='#2e3192,#2d459d,#268fc4,#1ed4e8,#1bffff,#1ed4e8,#268fc4,#2d459d,#2e3192'
          />
        </div>
      ) : (
        <>
          <SectionTitle to='/available'>Meet our dachshunds</SectionTitle>
          <DogContainer className='mx-0 mb-5'>
            {loading
              ? [1, 2, 3, 4].map((_: any, i: number) => (
                  <LoadingImg w='100%' h='100%' key={i} />
                ))
              : dachshunds
                  ?.map((dachshund: any, i: number) => (
                    <Link key={i} to={`/about/type/${dachshund?.id}`}>
                      <ImageContainer>
                        <Image
                          src={dachshund?.attributes?.photos[1]}
                          alt={`${dachshund?.attributes?.name}`}
                          loading='lazy'
                        />
                      </ImageContainer>
                      <Text
                        fontSize='16px'
                        className='text-center mt-2'
                        textTransform='uppercase'
                        fontWeight={500}
                        color='#22c2b7'
                      >
                        {dachshund?.attributes?.name}
                      </Text>
                    </Link>
                  ))
                  .filter((_: any, i: number) => i < 4)}
          </DogContainer>
          <RightArrow text='See All Available Dachshunds' url='/available' />
        </>
      )}
    </SectionContainer>
  );
};

export default OurLovablePals;
