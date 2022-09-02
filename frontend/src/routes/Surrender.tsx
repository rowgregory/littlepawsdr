import React from 'react';
import styled, { useTheme } from 'styled-components';
import {
  IntroText,
  TitleAndIntroTextContainer,
  Title,
} from '../components/styles/Styles';

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[3]};
  width: 100%;
  margin-inline: auto;
  margin-bottom: 5rem;
  padding: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-top: 5rem;
    padding: 0;
  }
`;

const SurrenderApplicationIFrame = styled.iframe`
  border: none;
  height: 4600px;
`;

const Surrender = () => {
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';
  return (
    <Container>
      <TitleAndIntroTextContainer>
        <Title>Surrender</Title>
        <IntroText>
          Ideally, all dogs live in one loving home from puppyhood until death.
          However, LPDR understands this is not always possible. People become
          ill, die, divorce, move overseas, develop allergies, lose their jobs,
          lose their homes, etc. Any of these situations, among others, can be a
          reason for a dog coming into rescue. We currently help rescue in the
          following states: Alabama, Connecticut, Delaware, DC, Florida,
          Georgia, Maine, Maryland, Massachusetts, New Hampshire, New Jersey,
          North Carolina, Pennsylvania, Rhode Island, South Carolina, Tennessee,
          Vermont, Virginia, West Virginia
        </IntroText>
        <IntroText>
          <li>
            If you are considering re-homing your dachshund because of behavior
            problems, there may be other options you can consider first. Talk to
            your vet about the issue to ensure the behavior is not a result of a
            medical problem or perhaps because the dog has not been spayed or
            neutered. You may also want to consider consulting a behaviorist who
            may be able to help resolve the problem with training (for you and
            your dog).
          </li>
        </IntroText>
        <IntroText>
          <li>
            If you are considering re-homing your dachshund because of financial
            issues or high vet costs/bills, know that there are foundations and
            other organizations that may be able to offer financial assistance.
            A search of resources serving your geographic area may yield good
            results. Additionally, local governments offer lower costs
            veterinary services.
          </li>
        </IntroText>
        <IntroText>
          <li>
            Consider exploring your own personal networks of trusted friends,
            family, and co-workers who may be able to provide a good home for
            your dog.
          </li>
        </IntroText>
        <IntroText>
          When all options have been considered and you believe that
          surrendering your dog is the best option for you and your dachshund,
          Little Paws Dachshund Rescue may be able to help. All of the
          dachshunds that come into our rescue live in the home of an approved
          foster. Generally, the dog stays with the foster two weeks before the
          dog is posted on our website for adoption so we can better understand
          the needs and personality of the dog. All potential adopters go
          through a rigorous application process and are carefully screened.
        </IntroText>
        <IntroText>
          To be considered for surrender, please complete and submit the
          following Surrender Questionnaire:
        </IntroText>
      </TitleAndIntroTextContainer>
      {isDay ? (
        <SurrenderApplicationIFrame
          title='Surrender Application'
          width='100%'
          scrolling='no'
          src='https://toolkit.rescuegroups.org/of/f?c=QCVXZJTH'
        ></SurrenderApplicationIFrame>
      ) : (
        <SurrenderApplicationIFrame
          title='Surrender Application'
          width='100%'
          scrolling='no'
          src='https://toolkit.rescuegroups.org/of/f?c=RXYMKGSJ'
        ></SurrenderApplicationIFrame>
      )}
    </Container>
  );
};

export default Surrender;
