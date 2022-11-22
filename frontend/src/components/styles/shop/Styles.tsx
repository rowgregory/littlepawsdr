import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 32px;
  margin-bottom: 20rem;
  max-width: 1575px;
  margin-inline: auto;
`;

export const ShopTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

export const CategoryContainer = styled.div`
  /* margin: 64px 0 0 0; */
`;

export const Category = styled.div<{ active: boolean }>`
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  background: ${({ active, theme }) => (active ? theme.table.even : '')};
  :hover {
    background: ${({ theme }) => theme.table.even};
  }
`;

export const PageContent = styled.div`
  /* max-width: ${({ theme }) => theme.breakpoints[5]}; */
  width: 100%;
  margin-inline: auto;
`;

export const ProductContainer = styled.div<{ islargegrid: boolean }>`
  display: grid;
  grid-gap: 10px;
  /* width: 100%; */
  transition: 300ms;
  grid-template-columns: ${({ islargegrid }) =>
    islargegrid ? '1fr 1fr' : '1fr'};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: ${({ islargegrid }) =>
      islargegrid ? '1fr 1fr 1fr' : '1fr 1fr'};
  }
`;

export const ClearFilter = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  border: 1px solid transparent;
  :hover {
    border: 1px dashed ${({ theme }) => theme.text};
  }
`;

export const GridIconContainer = styled.div`
  width: 112px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    transition: 300ms;
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.colors.quaternary};
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    width: 5rem;
  }
`;

export const FilterColumn = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    min-width: 250px;
    max-width: 250px;
    width: 100%;
    display: block;
  }
`;

export const FilterIcon = styled.i`
  display: block;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: none;
  }
`;

export const LargeGridSquareContainer = styled.div<{ active: any }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1px;
  div {
    width: 5px;
    height: 5px;
    background: ${({ active }) => (active ? '#9761aa' : '#ccc')};
  }
`;
export const SmallGridSquareContainer = styled.div<{ active: any }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1px;
  div {
    width: 5px;
    height: 5px;
    background: ${({ active }) => (!active ? '#9761aa' : '#ccc')};
  }
`;
