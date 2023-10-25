import { FC } from 'react';
import { dachshundDetailsGridData } from '../../utils/dachchsundDetailsGridData';
import {
  Description,
  DetailsGrid,
  FlexContainer,
  InfoSectionProps,
} from '../styles/AvailableDog/Styles';
import { Text } from '../styles/Styles';

const InfoSection: FC<InfoSectionProps> = ({ info }) => {
  return (
    <FlexContainer>
      <div className='d-flex flex-column mr-4' style={{ flex: '1 1 0px' }}>
        <Text fontSize='24px' fontWeight='600' marginBottom='30px'>
          About {info?.attributes?.name}
        </Text>
        <Description
          dangerouslySetInnerHTML={{
            __html: info?.attributes?.descriptionHtml,
          }}
        ></Description>
      </div>
      <div style={{ flex: '1 1 0px' }}>
        <Text fontSize='24px' fontWeight='600' marginBottom='30px'>
          Details
        </Text>
        <DetailsGrid>
          {dachshundDetailsGridData(info).map((obj: any, i: number) => (
            <div className='d-flex flex-column' key={i}>
              <Text fontWeight={400} fontSize='14px'>
                {obj.title}
              </Text>
              <Text>{obj.textKey}</Text>
            </div>
          ))}
        </DetailsGrid>
      </div>
    </FlexContainer>
  );
};

export default InfoSection;
