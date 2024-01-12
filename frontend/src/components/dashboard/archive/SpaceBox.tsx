import { FC } from 'react';
import { Flex, Text } from '../../styles/Styles';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { BlueBtn, BlueChevron, GreenBtn, WindowWholeAlpha } from '../../assets';

const FullWindow = styled(Image)`
  max-width: 800px;
  width: 100%;
  top: 100px;
  height: 695px;
`;

const WindowContainer = styled.table`
  max-width: 330px;
  position: absolute;
  width: 100%;
  margin-top: 50px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    max-width: 500px;
    margin-top: 75px;
    &.breakdown {
      margin-top: 22px;
    }
  }
`;

const ArchiveDataText = styled.div`
  color: #fff;
  font-family: 'Hyperspace', sans-serif;
  font-size: 12px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 18px;
  }
`;
const ButtonsWrapper = styled.div`
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  bottom: 27px;
  padding-inline: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    bottom: 85px;
    max-width: 495px;
    flex-direction: row;
    padding-inline: 0;
  }
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  position: relative;

  img.button {
    height: 40px;
    width: 100%;
  }
  div {
    margin-bottom: 24px;
  }
  img.chevron {
    height: 30px;
    width: 30px;
    position: absolute;
    top: 5px;
    left: 6px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    img.button {
      height: 40px;
      width: 150px;
    }
  }
`;

const HeaderText = styled.div`
  color: #fff;
  font-size: 22px;
  text-align: center;
  font-weight: 500;
  font-family: 'Hyperspace', sans-serif;
  top: 90px;
  position: absolute;

  @media screen and (min-width: 500px) {
    font-size: 28px;
    top: 85px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 44px;
    top: 71px;
  }
`;

const TotalAndRevenueText = styled.div`
  color: #2fcfce;
  font-size: 25px;
  text-align: right;
  font-family: 'Hyperspace-Bold', sans-serif;
  @media screen and (min-width: 500px) {
    font-size: 36px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 40px;
  }
`;

interface ArchiveProps {
  text?: string;
  total?: string;
  icon?: string;
}

interface ProductProps {
  productName?: string;
  quantity?: number;
  revenue?: number;
}

interface SpaceBoxProps {
  data: ArchiveProps[] | ProductProps[];
  boxTitle: string;
  className?: string;
  archiveData?: boolean;
}

const SpaceBox: FC<SpaceBoxProps> = ({
  data,
  boxTitle,
  className,
  archiveData,
}) => {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      position='relative'
      marginBottom='384px'
    >
      <FullWindow src={WindowWholeAlpha} alt='space' />
      <HeaderText>{boxTitle}</HeaderText>
      <WindowContainer className={className}>
        <tbody className='w-100'>
          {data?.map((obj: any, i: number) => (
            <tr key={i}>
              <td>
                {obj?.productName ? (
                  <Text color='#fff' fontFamily={`'Hyperspace-Bold', sans-serif`}>
                    {obj?.productName}
                  </Text>
                ) : (
                  <Image src={obj?.icon} width='45px' />
                )}
              </td>
              <td>
                <ArchiveDataText>{obj.text ?? obj?.quantity}</ArchiveDataText>
              </td>
              <td>
                <TotalAndRevenueText>{obj?.total ?? `$${obj?.revenue}`}</TotalAndRevenueText>
              </td>
            </tr>
          ))}
        </tbody>
      </WindowContainer>
      {archiveData && (
        <ButtonsWrapper>
          <ButtonContainer>
            <Image src={BlueChevron} alt='blue-chevron' className='chevron' />
            <Image src={BlueBtn} alt='blue-btn' className='button' />

            <Text
              color='#fff'
              fontFamily={`'Hyperspace-Bold', sans-serif`}
              fontSize='16px'
              textAlign='center'
              marginTop='-32px'
            >
              Restart
            </Text>
          </ButtonContainer>
          <ButtonContainer>
            <Image src={BlueChevron} alt='blue-chevron' className='chevron' />
            <Image src={GreenBtn} alt='green-btn' className='button green' />
            <Text
              color='#fff'
              fontFamily={`'Hyperspace-Bold', sans-serif`}
              fontSize='16px'
              textAlign='center'
              marginTop='-32px'
            >
              Armory
            </Text>
          </ButtonContainer>
        </ButtonsWrapper>
      )}
    </Flex>
  );
};

export default SpaceBox;
