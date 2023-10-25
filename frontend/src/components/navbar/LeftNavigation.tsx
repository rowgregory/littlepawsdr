import { FC, useRef, useState } from 'react';
import { useOutsideDetect } from '../../utils/useOutsideDetect';
import { CloseSideBarBtn, Container } from '../styles/left-navigation/styles';
import { useSelector } from 'react-redux';
import SearchBar from '../left-navigation/SearchBar';
import Results from '../left-navigation/Results';
import LinkContent from '../left-navigation/LinkContent';

interface LeftNavigationProps {
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
}

const LeftNavigation: FC<LeftNavigationProps> = ({ openMenu, setOpenMenu }) => {
  const overlayRef = useRef(null) as any;
  const [searchResults, setSearchResults] = useState({}) as any;
  const [searchQuery, setSearchQuery] = useState('');

  const closeMenu = () => setOpenMenu(false);

  const state = useSelector((state: any) => state);
  const loading = state.searchBar.loading;
  const error = state.searchBar.error;
  const data = state.searchBar.list;

  useOutsideDetect(overlayRef, setOpenMenu);

  return (
    <Container ref={overlayRef} open={openMenu}>
      <CloseSideBarBtn
        className='fas fa-chevron-left fa-sm'
        onClick={() => closeMenu()}
      ></CloseSideBarBtn>
      <SearchBar
        data={data}
        setSearchResults={setSearchResults}
        loading={loading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Results searchResults={searchResults} closeMenu={closeMenu} />
      <LinkContent closeMenu={closeMenu} error={error} />
    </Container>
  );
};

export default LeftNavigation;
