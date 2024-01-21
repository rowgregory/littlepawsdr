import { Link } from 'react-router-dom';
import { DachshundImage, TextContainer } from './styles/GridDogStyles';
import { Text } from './styles/Styles';
import { formatDate } from '../utils/formatDate';
import { SorryNoImg } from './assets';

const DachshundCard = ({ dachshund, type }: any) => (
  <Link
    to={`/about/type/${dachshund.id}`}
    key={dachshund.id}
    className='rounded d-flex justify-content-center h-100'
    style={{ position: 'relative' }}
  >
    <DachshundImage
      src={dachshund?.attributes?.photos[0] ?? SorryNoImg}
      alt='successful-adoption'
      loading='lazy'
    />
    <TextContainer>
      <div className='d-flex align-self-center'>
        <Text fontSize='18px' fontWeight={400} color='#fff'>
          {dachshund?.attributes?.name?.split('(')[0]}
        </Text>
      </div>
      {type === 'successful-adoptions' && dachshund?.attributes?.adoptedDate && (
        <Text color='#dcdcdc'>Adopted on {formatDate(dachshund?.attributes?.adoptedDate)}</Text>
      )}
    </TextContainer>
  </Link>
);

export default DachshundCard;
