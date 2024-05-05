import styled from 'styled-components';
import EventCard from '../../components/EventCard';
import EventHigh from '../../components/assets/events-high.jpg';
import EventHLow from '../../components/assets/events-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import { useGetEventsQuery } from '../../redux/services/eventApi';
import { Fragment } from 'react';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';

const timeLineData = () => [
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

const Month = styled.div<{ bg?: string; donothover?: boolean }>`
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

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 680px;
  width: 100%;
  margin-inline: auto;
  margin-top: 75px;
  padding-bottom: 128px;
  padding-inline: 8px;
`;

const EventIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    viewBox='0 0 456.213 456.213'
    width='48px'
  >
    <g id='XMLID_243_'>
      <g>
        <path
          fill='#9761aa'
          d='M422.432,206.213l29.436-29.437L275.093,0l-91.924,91.924l10.606,10.606c5.849,5.849,5.849,15.364-0.001,21.213
			c-2.833,2.833-6.6,4.394-10.605,4.394c-4.007,0-7.773-1.561-10.607-4.394l-10.606-10.606L68.88,206.213H3.107v250h290v-15
			c0-8.271,6.729-15,15-15c8.272,0,15,6.729,15,15v15h130v-250H422.432z M158.107,356.213h-80v-30h80V356.213z M178.107,296.213
			h-100v-30h100V296.213z M378.107,346.213H344.32l-35.606,35.606l-21.213-21.212l14.393-14.394h-58.787v-55h30v25h28.787
			l-14.393-14.394l21.213-21.213l35.606,35.606h33.787V346.213z M380.006,206.214h-56.898v15c0,8.271-6.728,15-15,15
			c-8.271,0-15-6.729-15-15v-15H111.305l52.452-52.453c5.984,2.864,12.581,4.376,19.411,4.376h0.001
			c12.02,0,23.321-4.682,31.819-13.181c8.499-8.499,13.18-19.799,13.18-31.819c0-6.829-1.512-13.428-4.375-19.41l51.3-51.301
			l134.35,134.351L380.006,206.214z'
        />
      </g>
    </g>
  </svg>
);

const Events = () => {
  const { data, isLoading } = useGetEventsQuery();
  const events = data?.events;

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <Fragment>
      <Hero
        low={EventHLow}
        high={EventHigh}
        title='Events'
        link={`https://pixabay.com/users/ilonaburschl-3558510/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2059668`}
        photographer='Ilona Ilyés'
      />
      <div className='max-w-screen-[980px] w-full mx-auto mb-16 px-3'>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow text='Home' url='/' text2='Welcome Wieners' url2='/welcome-wieners' />
          <RightArrow text='Blog' url='/blog' />
        </div>
        <p className='mb-12 mt-14 text-3xl text-center font-Matter-Medium'>
          Little Paws Dachshund Rescue host a number of fund raising events throughout the year. We
          hope to see you at some in {new Date().getFullYear()}!
        </p>
      </div>
      <div className='max-w-screen-xl w-full pb-16 mx-auto'>
        {events?.length === 0 || events === undefined ? (
          <div className='flex flex-col items-center'>
            <EventIcon />
            <p className='font-Matter-Regular mt-3'>
              Sorry, no events at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <EventsContainer>
            {timeLineData()?.map((obj, i) => (
              <div key={i} className='my-1 w-full'>
                <Month bg={obj?.bg} className='ml-0' donothover={true}>
                  {obj?.abbrv}
                </Month>
                {events?.map(
                  (event: any) =>
                    event?.startDate?.split('-')[1] === obj?.digits && (
                      <EventCard key={event?._id} event={event} />
                    )
                )}
              </div>
            ))}
          </EventsContainer>
        )}
      </div>
    </Fragment>
  );
};

export default Events;
