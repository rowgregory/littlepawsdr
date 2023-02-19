import { Form, Image } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  background: #f6f9fe;
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 32px 32px 48px;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
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
  width: 20rem;
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
  margin-bottom: 1rem;
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
  grid-gap: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  width: 20rem;
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
  height: calc(100vh - 236px);
  padding: 1.5rem;
  background: #fff;
  min-height: 600px;
`;

export const EditFormAndPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

export const EditForm = styled(Form)`
  max-width: ${({ theme }) => theme.breakpoints[0]};
  margin-right: 0px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-right: 48px;
  }
`;

export const FormFile = styled(Form.File)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  font-weight: 300;
  transition: 300ms;
  margin-right: 1rem;
  height: 200px;
  width: 200px;
  :hover {
    background: #ededed;
  }
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
    background-position: 0px 0px, 200px 197px, 0px 200px, 197px 24px;
  }
  100% {
    background-position:212px 0px, 0px 197px, 0px 0px, 197px 200px;
  }
`;

export const UploadImageSquare = styled.div<{ uploading?: any }>`
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(90deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(90deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(0deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(0deg, #c4c4c4 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 16px 3px, 16px 3px, 3px 16px, 3px 16px;
  background-position: 0px 0px, 200px 197px, 0px 200px, 197px 24px;
  transition: background-position 10s;

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

export const CardImg = styled(Image)`
  object-fit: cover;
  border: ${({ theme }) => `4px solid ${theme.card.bg}`};
  margin-top: -170px;
`;
