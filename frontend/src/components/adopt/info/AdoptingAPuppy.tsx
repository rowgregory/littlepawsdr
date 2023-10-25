import { Link } from 'react-router-dom';
import { fiveStepProcess } from '../../../utils/adoptionInfo';
import { Text } from '../../styles/Styles';
import styled from 'styled-components';

const FiveStepSection = styled.div`
  div {
    display: flex;
    flex-direction: column;
    span {
      font-weight: bold;
      font-size: 20px;
    }
    div {
      margin: 0;
    }
  }
`;

const Step = styled(Link)<{ link?: string }>`
  cursor: ${({ link }) => (link ? 'pointer' : 'text')};
  width: fit-content;
  text-decoration: ${({ link }) => (link ? 'underline' : '')};
  font-size: 16px;
  max-width: 680px;
  margin-inline: auto;
`;

const AdoptingAPuppy = () => {
  return (
    <>
      <Text
        fontSize='31px'
        marginTop='56px'
        fontWeight={400}
        textAlign='center'
        marginBottom='24px'
      >
        Adopting a Puppy
      </Text>
      <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
        The general guideline is that puppies may be left alone, for no longer
        in hours than the number of months of their ages. Puppies will require a
        lot of attention – especially at first. Please consider a young adult if
        you do not have a schedule that will permit a puppy frequent potty
        breaks.
      </Text>

      <FiveStepSection>
        {fiveStepProcess().map((obj, i) => (
          <div key={i} className='pb-3 py-0'>
            <Text
              maxWidth='680px'
              fontSize='16px'
              className='mb-2 mx-auto w-100'
              fontWeight={400}
            >
              {obj.titleKey}
            </Text>
            {obj?.linkKey ? (
              <Step
                to={obj?.linkKey}
                link={obj?.linkKey}
                className='mb-4 mx-auto w-100'
              >
                {obj.text}
              </Step>
            ) : (
              <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
                {obj.text}
              </Text>
            )}
            {obj?.text2 && (
              <>
                <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
                  {obj?.text2}
                </Text>
                <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
                  {obj?.text3}
                </Text>
              </>
            )}
          </div>
        ))}
      </FiveStepSection>
    </>
  );
};

export default AdoptingAPuppy;
