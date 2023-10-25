import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listFilteredEcards } from '../actions/eCardActions';
import { Image } from 'react-bootstrap';
import { Text } from '../components/styles/Styles';
import { LoadingImg } from '../components/LoadingImg';
import Message from '../components/Message';

interface FilteredEcardProps {
  _id: string;
  category: string;
  createdAt: string;
  image: string;
  isEcard: boolean;
  name: string;
  price: number;
  updatedAt: string;
}

const FilteredEcardContainer = styled.div`
  margin-top: 100px;
  max-width: 1110px;
  width: 100%;
  margin-inline: auto;
  padding-inline: 16px;
`;

const EcardGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 24px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const EcardImage = styled(Image)`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 16/11;
  background: #f5f5f7;
`;

const FilteredEcards = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramValue = searchParams.get('category') as string;
  const state = useSelector((state: any) => state);

  const loading = state.ecardFilteredList.loading;
  const error = state.ecardFilteredList.error;
  const filteredEcards = state.ecardFilteredList.filteredEcards;

  useEffect(() => {
    dispatch(listFilteredEcards(paramValue));
  }, [dispatch, paramValue]);

  return (
    <FilteredEcardContainer>
      {error ? (
        <Message variant='danger'>Oops! Something went wrong.</Message>
      ) : (
        <>
          <Link to='/ecards' style={{ color: '#075c9c', fontSize: '12px' }}>
            See all Ecards
          </Link>
          <h4 className='mt-3 mb-4'>{paramValue}</h4>
          <EcardGrid>
            {loading ? (
              <LoadingImg w='100%' ar='16/11' />
            ) : (
              filteredEcards?.map((ecard: FilteredEcardProps) => (
                <Link
                  to={`/ecard/personalize/${ecard._id}`}
                  key={ecard?._id}
                  className='d-flex flex-column'
                  style={{ cursor: 'pointer' }}
                >
                  <EcardImage src={ecard?.image} alt={ecard?.name} />
                  <div className='d-flex justify-content-between my-2'>
                    <Text fontSize='16px' fontWeight={500} color='#075c9c'>
                      <i className='fas fa-camera mr-1'></i> Personalize
                    </Text>
                    <Text fontSize='16px' fontWeight={500} color='#075c9c'>
                      ${ecard?.price}
                    </Text>
                  </div>
                </Link>
              ))
            )}
          </EcardGrid>
        </>
      )}
    </FilteredEcardContainer>
  );
};

export default FilteredEcards;
