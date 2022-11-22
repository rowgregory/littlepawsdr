import { Col, Image } from 'react-bootstrap';
import styled from 'styled-components';
export const timeLineData = () => [
  {
    month: 'January',
    abbrv: 'JAN',
    bg: '#fdc90b',
    digits: '01',
  },
  {
    month: 'February',
    abbrv: 'FEB',
    bg: '#f79121',
    flip: true,
    digits: '02',
  },
  {
    month: 'March',
    abbrv: 'MAR',
    bg: '#f1633d',
    digits: '03',
  },
  {
    month: 'April',
    abbrv: 'APR',
    bg: '#ef3c40',
    flip: true,
    digits: '04',
  },
  {
    month: 'May',
    abbrv: 'MAY',
    bg: '#c3549e',
    digits: '05',
  },
  {
    month: 'June',
    abbrv: 'JUN',
    bg: '#7756a3',
    flip: true,
    digits: '06',
  },
  {
    month: 'July',
    abbrv: 'JUL',
    bg: '#4d69b2',
    digits: '07',
  },
  {
    month: 'August',
    abbrv: 'AUG',
    bg: '#137abe',
    flip: true,
    digits: '08',
  },
  {
    month: 'September',
    abbrv: 'SEP',
    bg: '#12a6e0',
    digits: '09',
  },
  {
    month: 'October',
    abbrv: 'OCT',
    bg: '#0db7b2',
    flip: true,
    digits: '10',
  },
  {
    month: 'November',
    abbrv: 'NOV',
    bg: '#a9cf3d',
    digits: '11',
  },
  {
    month: 'December',
    abbrv: 'DEC',
    bg: '#d7de5a',
    flip: true,
    digits: '12',
  },
];

export const Month = styled.div<{ bg?: string; donothover?: boolean }>`
  background-color: ${({ bg }) => bg ?? bg};
  height: 3rem;
  width: 5rem;
  border-radius: 0.5rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.45rem;
  font-weight: bold;
  cursor: ${({ donothover }) => (donothover ? '' : 'pointer')};
  :hover {
    filter: ${({ donothover }) => (donothover ? '' : 'brightness(0.8)')};
  }
`;

const WinnerImg = styled(Image)<{ bg: string }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: ${({ bg }) => (bg ? `2px solid ${bg}` : '')};
`;

const DashWinner = styled.div`
  display: none;
  @media screen and (min-width: 480px) {
    display: block;
    color: #ccc;
    width: 125px;
    height: 2px;
    border-top: 2px dashed #ccc;
    transform: translate(0, 9px);
  }
`;

const DashImage = styled.div`
  color: #ccc;
  width: 50px;
  height: 2px;
  border-top: 2px dashed #ccc;
  transform: translate(0, 23px);
`;

const Container = styled.div`
  width: 40%;
  max-width: 300px;
`;

const Dot = styled.div`
  display: none;
  @media screen and (min-width: 480px) {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ccc;
    transform: translate(0, 5px);
  }
`;

const Timeline = ({
  winners,
  currentRaffleWinner,
  setCurrentRaffleWinner,
  handleShow,
}: any) => {
  return (
    <Col className='d-flex flex-column '>
      {timeLineData().map((obj, i) =>
        obj.flip ? (
          <div
            key={i}
            className='my-1 d-flex align-items-center justify-content-center'
          >
            {winners?.map(
              (winner: any, i: number) =>
                winner?.month === obj.month && (
                  <Container key={i} className='d-flex justify-content-end'>
                    <div
                      className=' d-flex flex-column pr-2'
                      style={{
                        borderRight: '2px solid #ccc',
                      }}
                    >
                      <WinnerImg
                        bg={obj.bg}
                        src={winner.image}
                        alt='raffle-winner'
                      />
                    </div>
                    <DashImage></DashImage>
                  </Container>
                )
            )}
            <div style={{ width: '100%', maxWidth: '5rem' }}>
              <Month
                onClick={() => {
                  setCurrentRaffleWinner(
                    winners.filter((winner: any) => winner?.month === obj.month)
                  );

                  winners.filter(
                    (winner: any) =>
                      winner.month === obj.month &&
                      winner?.image &&
                      handleShow()
                  );
                }}
                bg={obj.bg}
              >
                {obj.abbrv}
              </Month>
            </div>
            {winners?.map(
              (winner: any, i: number) =>
                winner?.month === obj.month && (
                  <Container className=' d-flex justify-content-start' key={i}>
                    <DashWinner></DashWinner>
                    <Dot className='mr-2'></Dot>
                    <div>{winner?.name}</div>
                  </Container>
                )
            )}
          </div>
        ) : (
          <div
            key={i}
            className='my-1 d-flex align-items-center justify-content-center non-fli-container'
          >
            {winners?.map(
              (winner: any, i: number) =>
                winner.month === obj.month && (
                  <Container className=' d-flex justify-content-end' key={i}>
                    <div>{winner.name}</div>
                    <Dot className='ml-2'></Dot>
                    <DashWinner></DashWinner>
                  </Container>
                )
            )}
            <div style={{ width: '100%', maxWidth: '5rem' }}>
              <Month
                onClick={() => {
                  setCurrentRaffleWinner(
                    winners.filter((winner: any) => winner.month === obj.month)
                  );
                  winners.filter(
                    (winner: any) =>
                      winner.month === obj.month && winner.image && handleShow()
                  );
                }}
                bg={obj.bg}
              >
                {obj.abbrv}
              </Month>
            </div>
            {winners?.map(
              (winner: any, i: number) =>
                winner.month === obj.month && (
                  <Container key={i} className='d-flex'>
                    <DashImage></DashImage>
                    <div
                      className=' d-flex flex-column pl-2'
                      style={{
                        borderLeft: '2px solid #ccc',
                      }}
                    >
                      <WinnerImg
                        bg={obj.bg}
                        src={winner.image}
                        alt='raffle-winner'
                      />
                    </div>
                  </Container>
                )
            )}
          </div>
        )
      )}
    </Col>
  );
};

export default Timeline;
