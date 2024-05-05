import { FC, useMemo, useState } from 'react';
import {
  ClearFilterData,
  Search,
  SearchBarWrapper,
} from '../styles/left-navigation/styles';

interface SearchBarProps {
  data: any;
  setSearchResults: any;
  loading: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
  data,
  setSearchResults,
  loading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filterData = useMemo(
    () => (dataArray: any, query: any) =>
      dataArray.filter((item: any) =>
        item?.name?.toLowerCase().startsWith(query.toLowerCase())
      ),
    []
  );

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults({});
  };

  const handleSearch = (query: string) => {
    if (query === '') {
      clearSearch();

    } else {
      const filteredDachshunds = filterData(data?.searchBar?.list || [], query);
      const filteredProducts = filterData(
        data?.initialData?.products || [],
        query
      );
      const filteredEcards = filterData(data?.initialData?.ecards || [], query);
      const filteredWelcomeWieners = filterData(
        data?.initialData?.welcomeWieners || [],
        query
      );

      setSearchResults({
        dachshunds: [...filteredDachshunds],
        products: [...filteredProducts],
        ecards: [...filteredEcards],
        welcomeWieners: [...filteredWelcomeWieners],
      });
    }
  };

  return (
    <SearchBarWrapper>
      <i className='fas fa-search'></i>
      <Search
        disabled={loading}
        type='text'
        value={searchQuery}
        placeholder={loading ? 'Loading...' : 'Search'}
        onChange={(e: any) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <ClearFilterData
        show={searchQuery !== ''}
        onClick={() => clearSearch()}
        className='fas fa-times fa-xs'
      ></ClearFilterData>
    </SearchBarWrapper>
  );
};

export default SearchBar;
