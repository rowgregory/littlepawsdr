import { Button, Col, Form, Image } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0.25rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 0;
  }
`;

export const CardTheme = styled(Form.Check)<{ selected?: boolean }>`
  border: ${({ selected, theme }) =>
    selected ? `3px solid ${theme.colors.secondary}` : '3px solid transparent'};
  padding: 0.2rem;
  margin-right: 0;
  :hover {
    border: 3px solid ${({ theme }) => theme.colors.secondary};
  }
`;

export const ProfilePicCol = styled(Col)`
  justify-content: flex-start;
  padding-left: 0 !important;
`;

export const UpdateBtn = styled(Button)`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.quinary};
  border: ${({ theme }) => theme.colors.quinary} 1px solid;
  margin-top: 16px;
`;

export const ProfileCardImg = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
`;

export const Input = styled(Form.Control)`
  border: 1px solid ${({ theme }) => theme.input.border};
  background: #f6f8fa !important;
  :focus {
    background: #fff !important;
  }
`;

export const FirstCol = styled(Col)`
  padding-right: 0.25rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding-right: 1.5rem;
  }
`;

export const SettingsTitleContainer = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.separator}`};
`;

export const Label = styled(Form.Label)`
  margin-bottom: 0;
`;
export const AccordionWrapper = styled.div`
  position: fixed;
  bottom: 20;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-inline: auto;
`;
