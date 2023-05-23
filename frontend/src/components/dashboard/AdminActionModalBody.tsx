import { useState } from 'react';
import styled from 'styled-components';
import { RevealProps, setWhichSectionToReveal } from './sidebar/SideBar';
import SellingAccordion from './sidebar/SellingAccordion';
import ProceedsAccordion from './sidebar/ProceedsAccordion';
import PeopleAccordion from './sidebar/PeopleAccordion';
import MicellaneousAccordion from './sidebar/MicellaneousAccordion';

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const AdminActionModalBody = () => {
  const [reveal, setReveal] = useState<RevealProps>({
    selling: false,
    proceeds: false,
    miscellaneous: false,
    people: false,
  });
  return (
    <Container>
      <SellingAccordion
        reveal={reveal.selling}
        setWhichSectionToReveal={setWhichSectionToReveal}
        setReveal={setReveal}
      />
      <ProceedsAccordion
        reveal={reveal.proceeds}
        setWhichSectionToReveal={setWhichSectionToReveal}
        setReveal={setReveal}
      />
      <PeopleAccordion
        reveal={reveal.people}
        setWhichSectionToReveal={setWhichSectionToReveal}
        setReveal={setReveal}
      />
      <MicellaneousAccordion
        reveal={reveal.miscellaneous}
        setWhichSectionToReveal={setWhichSectionToReveal}
        setReveal={setReveal}
      />
    </Container>
  );
};

export default AdminActionModalBody;
