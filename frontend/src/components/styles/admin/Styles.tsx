import { Form, Image, Table } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  background: #f6f9fe;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 24px;
  min-height: 100vh;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 32px 32px 28px;
    width: calc(100vw - 285px);
  }
`;

export const TableHead = styled.thead<{ bg?: string }>`
  font-size: 12px;

  tr {
    &.topSellingProducts {
      height: 2rem;
      text-indent: 0.75rem;
      @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      }
    }

    th {
      border: 0 !important;
      color: #373737;
      background: #fff;
    }
  }
`;

export const TableRow = styled.tr`
  font-size: 12px;
  td {
    border-top: none !important;
    vertical-align: inherit;
    color: #373737;
  }
  :hover {
    background: #f6f9fe !important;
  }
`;

export const TableImg = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  width: 2.875rem;
  height: 2.875rem;
`;

export const SearchBar = styled(Form.Group)`
  margin-bottom: 0;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.white} !important;
  margin-bottom: 1rem;
  padding: 0 1.5rem;
  height: 45px;
  color: #373737;
  border-radius: 0.75rem;
`;

export const CreateBtnV2 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.white} !important;
  border: none;
  padding: 0 1.5rem;
  height: 45px;
  transition: 300ms;
  color: #373737;
  border-radius: 0.75rem;
  :active {
    background: #fff !important;
    color: #373737 !important;
  }
  :hover {
    background: #f9f9f9;
    color: #373737;
  }
  :focus {
    box-shadow: none !important;
  }
`;

export const TopRow = styled.div`
  width: 100%;
  grid-gap: 10px;
  display: grid;
  grid-template-columns: 1fr;
  padding-inline: 16px;
  margin-bottom: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
    width: 75%;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding-inline: 0px;
    width: 50%;
  }
`;

export const StyledEditBtn = styled.button`
  background: transparent;
  border-radius: 50%;
  border: none;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover,
  :active,
  :focus {
    background: ${({ theme }) => theme.separator} !important;
    border: none !important;
    box-shadow: none !important;
  }
  :disabled {
    background-color: #fff !important;
    border: 2px solid #cc0000;
    :hover {
      border: 2px solid #cc0000 !important;
    }
    :before {
      content: '';
      position: absolute;
      width: 2px;
      height: 48px;
      transform: rotate(45deg);
      background: #cc0000;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  ul {
    .active {
      span,
      a {
        :hover {
          color: #fff !important;
        }
        background-color: ${({ theme }) => theme.colors.quinary} !important;
        border-color: ${({ theme }) => theme.colors.quinary} !important;
      }
    }
    li {
      span,
      a {
        :hover {
          color: ${({ theme }) => theme.colors.quinary} !important;
        }
        :focus {
          box-shadow: none !important;
        }
      }
    }
  }
`;

export const SearchInput = styled(Form.Control)`
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #d3d3d3;
  }
  border-radius: 0.5rem !important;
  border: none;
  width: 100%;
  :focus {
    box-shadow: none;
    outline: none;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
`;

export const TableAndPaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 1rem;
  height: calc(100vh - 429px);
  padding-inline: 16px;
  background: #fff;
  min-height: 600px;
  margin-left: 0;
`;

export const EditFormAndPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

export const EditForm = styled(Form)`
  max-width: 400px;
  width: 100%;
  padding-inline: 16px;
  margin-top: 24px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 0;
  }
`;

export const FormFile = styled(Form.File)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  font-weight: 300;
  transition: 300ms;
  margin-right: 8px;
  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #c4c4c4;
    margin-bottom: 0;
  }
`;

const BorderDance = keyframes`
  0% {
    background-position: 0px 0px, 100px 97px, 0px 100px, 97px 24px;
  }
  100% {
    background-position:212px 0px, 0px 97px, 0px 0px, 97px 100px;
  }
`;

export const UploadImageSquare = styled.div<{ uploading?: any }>`
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(90deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(0deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(0deg, #c4c4c4 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 16px 3px, 16px 3px, 3px 16px, 3px 16px;
  background-position: 0px 0px, 100px 97px, 0px 100px, 97px 24px;
  transition: background-position 10s;
  margin-right: 4px;

  &.anim {
    animation: ${BorderDance} 15s infinite linear;
  }
`;

export const RemovePhoto = styled.div`
  padding-inline: 1rem;
  height: 45px;
  display: flex;
  align-items: center;
  max-width: 200px;
  width: 100%;
  background: #fff;
  color: #c4c4c4;
  border: none;
  margin: 0 !important;
  font-weight: 300;
  transition: 300ms;
  :hover {
    cursor: pointer;
    background: #ededed;
  }
`;

export const FormInnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex-direction: row;
  }
`;
export const FormLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  margin-right: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-right: 32px;
  }
`;
export const FormRightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemsSummaryTable = styled(Table)`
  width: 100%;
  margin-bottom: 0;
  thead {
    tr {
      th {
        border-top: 0px !important;
        border-bottom: 0px !important;
        padding-left: 0px !important;
      }
    }
  }
  tbody {
    tr {
      td {
        vertical-align: inherit;
        padding-left: 0 !important;
        border-top: 1px solid #d8d9dc !important;
        padding: 12px;
      }
    }
  }
`;

export const OrderEditDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #f6f9fe;
  padding: 0;
  border-radius: 0px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    padding: 20px;
    border-radius: 16px;
  }
`;

export const OrderNumber = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-top: 22px;
  margin-bottom: 22px;
  margin-left: 16px;
  span {
    font-size: 20px;
    font-weight: 600;
    color: #ad85bd;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 26px;
    span {
      color: #ad85bd;
      font-weight: 600;
      font-size: 26px;
    }
    margin-left: 0px;
  }
`;

export const ItemsSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex-direction: row;
  }
`;

export const OrderEditLeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 0px;
  margin-bottom: 20px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 60%;
    margin-right: 20px;
    margin-bottom: 0px;
  }
`;

export const OrderEditRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 70px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 40%;
  }
`;
