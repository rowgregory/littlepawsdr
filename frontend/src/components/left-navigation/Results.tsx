import {
  ResultCategory,
  ResultsContainer,
} from '../styles/left-navigation/styles';
import { Text } from '../styles/Styles';
import { Link } from 'react-router-dom';

const Results = ({ searchResults, closeMenu }: any) => {
  const resultData = [
    {
      searchKey: 'dachshunds',
      textKey: 'Dachshunds',
    },
    {
      searchKey: 'products',
      textKey: 'Products',
    },
    {
      searchKey: 'ecards',
      textKey: 'Ecards',
    },
    {
      searchKey: 'welcomeWieners',
      textKey: 'Welcome Wieners',
    },
  ];

  const url = (data: any, item: any) => {
    const key = data.searchKey;
    return key === 'dachshunds'
      ? `/about/type/${item.id}`
      : key === 'products'
        ? `/merch/${item._id}`
        : key === 'ecards'
          ? `/ecard/personalize/${item._id}`
          : `/welcome-wiener/${item._id}`;
  };

  return (
    <ResultsContainer
      showresults={
        !Object.values(searchResults)?.every((array: any) => array.length === 0)
      }
    >
      {resultData.map((data: any, i: number) => (
        <ResultCategory
          key={i}
          show={searchResults[data.searchKey]?.length > 0}
        >
          <Text color='#afbec3' marginBottom='4px'>
            {data.textKey}
          </Text>
          {searchResults?.[data.searchKey]
            ?.map((item: any, k: number) => (
              <Link to={url(data, item)} key={k} onClick={() => closeMenu()}>
                <div className='my-1' style={{ color: '#cbd7db' }}>
                  {item?.name}
                </div>
              </Link>
            ))
            .filter((_: any, i: number) => i < 11)}
        </ResultCategory>
      ))}
      <div className='w-100'>
        <hr className='my-5' style={{ background: '#556a7f' }} />
      </div>
    </ResultsContainer>
  );
};

export default Results;
