import styled from 'styled-components';

export const Accordion = styled.div<{ toggle: any; maxheight?: string }>`
  max-height: ${({ toggle, maxheight }) => (toggle ? maxheight : '0px')};
  overflow: hidden;
  transition: max-height 200ms ease-out;
`;