import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  margin: auto;
  padding: 0 12px;

`;


const SearchBar = () => {
  return (
    <SearchWrapper>
      <Link to='/my-orders'>
        {/* <BluePurpleGradientBtn content='My Purchases' className="fa-solid fa-bag-shopping fa-2x"></BluePurpleGradientBtn> */}
      </Link>
      <Link to='/'>
        {/* <BluePurpleGradientBtn content='Home' className="fa-solid fa-house-chimney fa-2x"></BluePurpleGradientBtn> */}
      </Link>
    </SearchWrapper>
  );
};

export default SearchBar;
