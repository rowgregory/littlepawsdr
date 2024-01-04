import LeftArrow from '../components/svg/LeftArrow';
import RightArrow from '../components/svg/RightArrow';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pastelColorRandomizer } from '../utils/pastelColorRandomizer';
import { LoadingImg } from '../components/LoadingImg';
import Message from '../components/Message';
import { listECards } from '../actions/eCardActions';
import { useEffect } from 'react';

const Container = styled.div`
  padding: 24px;
`;
const EcardContainer = styled.div`
  max-width: 980px;
  width: 100%;
  margin-inline: auto;
`;

const EcardHero = styled.div`
  width: 100%;
  margin-top: 75px;
  background: #f5f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroInnerContainer = styled.div`
  max-width: 46rem;
  padding: 24px;
`;

const HeroText = styled.p`
  color: #2a3238;
  font-size: 20px;
  text-align: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 32px;
  }
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    gap: 24px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategorySquare = styled.div<{ bg: string }>`
  width: 100%;
  height: 100px;
  padding: 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: ${({ bg }) => bg};
  cursor: pointer;
  font-size: 24px;
  font-weight: 300;
  transition: 300ms;
  :hover {
    filter: brightness(0.95);
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    height: 240px;
    padding: 25px 10px 10px;
  }
`;

const Choose = styled.h3`
  color: #2a3238;
  font-size: 36px;
  margin-bottom: 24px;
`;

const Ecards = () => {
  const dispatch = useDispatch()
  const history = useNavigate();
  const state = useSelector((state: any) => state);

  let loading = state.ecardList.loading;
  const error = state.ecardList.error;
  const ecards = state.ecardList.ecards;

  useEffect(() => {
    dispatch(listECards())
  }, [dispatch])

  const uniqueCategories = [
    ...new Set(ecards?.map((ecard: any) => ecard.category)),
  ];

  const setFilterParam = (category: string) => {
    history(`/ecards/filtered?category=${category}`);
  };

  return (
    <Container>
      <EcardHero>
        <HeroInnerContainer>
          <HeroText>Share ecard happiness, aid dachshunds in need</HeroText>
          <p className='text-center'>
            Browse Little Paws Dachshund Rescue's full collection of online
            ecards. Select and customize the perfect one to easily send to all
            of your friends and family via email.
          </p>
        </HeroInnerContainer>
      </EcardHero>
      <EcardContainer>
        <div className='w-100 d-flex justify-content-between mt-3 mb-5'>
          <LeftArrow text='Home' url='/' text2='Merch' url2='/merch' />
          <RightArrow text='Welcome Wieners' url='/welcome-wieners' />
        </div>
        <Choose>Choose an occasion</Choose>
        {error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <CategoryContainer>
            {loading
              ? [
                ...Array.from({ length: 2 }).map((x: any, i: number) => (
                  <LoadingImg w='100%' key={i} />
                )),
              ]
              : uniqueCategories.map((category: any, i: number) => (
                <CategorySquare
                  key={i}
                  onClick={() => setFilterParam(category)}
                  bg={pastelColorRandomizer()}
                >
                  {category}
                </CategorySquare>
              ))}
          </CategoryContainer>
        )}
      </EcardContainer>
    </Container>
  );
};

export default Ecards;
