import { Link } from 'react-router-dom';
import RightArrow from '../svg/RightArrow';
import { LoadingImg } from '../LoadingImg';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';

const DogContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  width: 100%;
  @media screen and (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  a {
    overflow: hidden;
    text-decoration: none;
    position: relative;

    :hover {
      div {
        img {
          transform: rotate(20deg) scale(1.5);
        }
      }
    }
    div {
      img {
        transition: transform 300ms ease-out;
        object-fit: cover;
        aspect-ratio: 1/1;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const ImageContainer = styled.div`
  transition: 1300ms;
  position: relative;
  overflow: hidden;
  :hover {
    &::after {
      content: '';
      position: absolute;
      top: 6px;
      left: 6px;
      right: 6px;
      bottom: 6px;
      z-index: 20px;
      border: 5px solid #fff;
      opacity: 0.6;
    }
  }
`;

const OurLovablePals = () => {
  const dachshund = useSelector((state: RootState) => state.dachshund);
  const [getDachshunds, { isLoading }] = useGetDachshundsByStatusMutation({
    selectFromResult: () => ({}),
  });

  useEffect(() => {
    getDachshunds({ status: 'Available' });
  }, [getDachshunds]);

  return (
    <section className='max-w-screen-xl w-full mb-60 mx-auto px-3 flex flex-col items-center'>
      <Link className='text-3xl font-Matter-Medium flex justify-center mb-8 cursor-pointer duration-300 text-teal-500 :hover:no-underline hover:text-teal-500' to='/available'>Meet our dachshunds</Link>
      <DogContainer className='mx-0 mb-5'>
        {isLoading
          ? [1, 2, 3].map((_: any, i: number) => (
            <LoadingImg w='100%' h='100%' maxw='500px' key={i} />
          ))
          : dachshund?.dachshunds
            ?.map((dachshund: any, i: number) => (
              <Link key={i} to={`/about/type/${dachshund?.id}`}>
                <ImageContainer>
                  <img
                    src={dachshund?.attributes?.photos[1]}
                    alt={`${dachshund?.attributes?.name}`}
                    loading='lazy'
                  />
                </ImageContainer>
              </Link>
            ))
            .filter((_: any, i: number) => i < 9)}
      </DogContainer>
      <RightArrow text='See All Available Dachshunds' url='/available' />
    </section>
  );
};

export default OurLovablePals;
