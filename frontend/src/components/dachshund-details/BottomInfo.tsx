import styled from 'styled-components';
import { Text } from '../styles/Styles';


export const BottomSection = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin: 5rem 0rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  div {
    color: #fff;
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const BottomInfo = () => {
  return (
    <BottomSection>
      <div className='d-flex flex-column p-3'>
        <Text fontWeight='bold' fontSize='24px' marginBottom='12px'>
          Dogs Adopted in New England
        </Text>
        <Text>
          Dogs adopted in New England are subject to additional rules and
          regulations by the state departments of agriculture. Complying with
          these regulations is expensive for our rescue, and some dogs adopted
          in New England states are charged an additional $175.00 to cover
          regulatory requirements.
        </Text>
      </div>
      <div className='d-flex flex-column p-3'>
        <Text fontWeight='bold' fontSize='24px' marginBottom='12px'>
          Transportation Help and Distance Restrictions
        </Text>
        <Text>
          Volunteer transport can be arranged if you see a dog that is a good
          match for your family. The cost for volunteer transport includes a
          health certificate (required by law and issued by a veterinarian), a
          crate (which all dogs must travel in for safety), and a collar, leash,
          and harness. The total for this service will be provided to you in the
          adoption approval email. The cost of health certificates varies and,
          in some cases, has been higher than the dog’s adoption fee. <br />{' '}
          <br />
          Adopters are also welcome to travel to their newly adopted dog to
          bring the dog home with them. A crate to safely transport the dog
          would be the responsibility of the adopter.
        </Text>
      </div>
      <div className='d-flex flex-column p-3'>
        <Text fontWeight='bold' fontSize='24px' marginBottom='12px'>
          Adopting across state costs extra
        </Text>
        <Text>
          If the dog is adopted over a state line, there will be an additional
          charge for a health certificate (required by law). The cost of the
          health certificate is the responsibility of the adopter. The amount
          depends upon what the veterinarian charges LPDR. The cost of a health
          certificate varies and, in some cases, has been higher than the dog’s
          adoption fee.
        </Text>
      </div>
    </BottomSection>
  );
};

export default BottomInfo;
