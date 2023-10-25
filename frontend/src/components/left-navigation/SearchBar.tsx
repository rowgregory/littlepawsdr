import { FC, useMemo } from 'react';
import {
  ClearFilterData,
  Search,
  SearchBarWrapper,
} from '../styles/left-navigation/styles';

interface SearchBarProps {
  data: any;
  setSearchResults: any;
  loading: boolean;
  searchQuery: string;
  setSearchQuery: any;
}

const SearchBar: FC<SearchBarProps> = ({
  data,
  setSearchResults,
  loading,
  searchQuery,
  setSearchQuery,
}) => {
  const filterData = useMemo(
    () => (dataArray: any, query: any) =>
      dataArray.filter((item: any) =>
        item.name.toLowerCase().startsWith(query.toLowerCase())
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
      const filteredDachshunds = filterData(data?.dachshund || [], query);
      const filteredProducts = filterData(
        data?.searchBar?.products || [],
        query
      );
      const filteredEcards = filterData(data?.searchBar?.ecards || [], query);
      const filteredWelcomeWieners = filterData(
        data?.searchBar?.welcomeWieners || [],
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
