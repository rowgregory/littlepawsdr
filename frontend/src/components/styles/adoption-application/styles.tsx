import styled from 'styled-components';

export const AdoptionApplicationContainer = styled.div`
  width: 100%;
  max-width: 980px;
  margin-inline: auto;
  margin-bottom: 56px;
  margin-top: 128px;
`;

export const InnerContainer = styled.div`
  width: 100%;
  max-width: 680px;
  margin-inline: auto;
`;

export const AdoptionApplicationIFrame = styled.iframe<{ pageKey?: string }>`
  border: none;
  height: 11800px;
  margin-top: -100px;
  max-width: ${({ theme }) => theme.breakpoints[2]};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    height: 11700px;
  }

  @media screen and (orientation: landscape) and (max-width: 900px) {
    height: 15500px;
  }
`;

export const StepTwoContainer = styled.div`
  width: 100%;
  padding: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0;
  }
`;
export const StepTwoInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: fit-content;
  padding-inline: 16px;
  padding-block: 6px;
  width: 100%;
  background: #fafafa;
  hr {
    border-bottom: #ddd;
    width: 100%;
    height: 0.5px;
    margin: -3px;
  }
`;

export const AdoptionApplicationTermsAndPaymentContainer = styled.div`
  width: 100%;
  max-width: 980px;
  margin-inline: auto;
  margin-bottom: 56px;
  margin-top: 128px;
`;
export const AdoptionApplicationTermsAndPaymentInnerContainer = styled.div`
  width: 100%;
  max-width: 680px;
  margin-inline: auto;
`;