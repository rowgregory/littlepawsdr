import { Image, Modal } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import SilverPawsImg from '../../components/assets/archive-kitty.png';
import SilverPawsImg2 from '../../components/assets/archive-kitty-2.png';
import SilverPawsBtn from '../../components/assets/silver-paws-btn.png';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text } from '../styles/Styles';
import SplitTextToChars from '../../utils/SplitTextToChars';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Background404 } from '../assets';
import { updateUserProfile } from '../../actions/userActions';

const fadeIn = keyframes`
from {
  opacity:0;
  transform: scale(0);

}
to {
  opacity:1;
  transfrom: scale(1);
}
`;
export const Content = styled.div`
  background: url(${Background404}) no-repeat;
  background-size: cover;
  padding: 16px;
  transform: translate3d(0, 0, 0);
  perspective: 1000px;
  height: 600px;
`;
export const InnterContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  animation: ${fadeIn} 700ms ease-out forwards;
`;
const SilverPaws = styled(Image)`
  margin-top: 18px;
  width: 200px;
  position: absolute;
`;
const Step2SilverPaws = styled(Image)`
  margin-top: 18px;
  width: 250px;
  position: absolute;
  transform: scaleX(-1);
`;
const NextBtn = styled(Image)`
  width: 200px;
  position: absolute;
  left: -100px;
  top: 196px;
`;

const Archive2023Modal = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const userInfo = state.userLogin.userInfo;
  const [isMounted, setIsMounted] = useState(false);
  const [isMounted2, setIsMounted2] = useState(false);
  const [steps, setSteps] = useState({ step1: true, step2: false, step3: false });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const delay = 900;
    const delay2 = 1500;

    const timeoutId = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    const timeoutId2 = setTimeout(() => {
      setIsMounted2(true);
    }, delay2);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, []);

  return (
    <Modal show={open} centered>
      <Content className='p-0'>
        <InnterContent>
          {isMounted && steps.step1 && !steps.step2 && (
            <SplitTextToChars
              text={`Greetings, I'm Silver Paws!`}
              fontSize='22px'
              fontFamily={`'Rowdies', sans-serif`}
              color='#fff'
              mt='-223px'
            />
          )}
          {steps.step1 && steps.step2 && !steps.step3 && (
            <SplitTextToChars
              text={`Bypass code can be found at the top of the dashboard`}
              fontSize='20px'
              fontFamily={`'Rowdies', sans-serif`}
              color='#fff'
              mt='-245px'
              width='280px'
              justifyContent='center'
            />
          )}
          {steps.step1 && steps.step2 && steps.step3 && (
            <SplitTextToChars
              text={`All historical data can be found in the archive`}
              fontSize='20px'
              fontFamily={`'Rowdies', sans-serif`}
              color='#fff'
              mt='-245px'
              width='250px'
              justifyContent='center'
            />
          )}
          {((steps.step1 && !steps.step2) ||
            (steps.step1 && steps.step2 && steps.step3)) && (
              <SilverPaws
                src={steps.step1 && !steps.step2 ? SilverPawsImg : SilverPawsImg2}
                alt='Silver-Paws-Hello'
              />
            )}
          {steps.step1 && steps.step2 && !steps.step3 && (
            <Step2SilverPaws src={SilverPawsImg2} alt='Silver-Paws-Hello' />
          )}
          {isMounted2 && steps.step1 && !steps.step2 && !steps.step3 && (
            <Flex
              position='relative'
              height='65px'
              flex='0'
              cursor='pointer'
              onClick={() => setSteps({ step1: true, step2: true, step3: false })}
            >
              <NextBtn src={SilverPawsBtn} alt='Click Next' />
              <Text
                position='absolute'
                color='#fff'
                fontFamily={`'Rowdies', sans-serif`}
                fontSize='20px'
                top='212px'
                left='-27px'
              >
                NEXT
              </Text>
            </Flex>
          )}
          {isMounted2 && steps.step1 && steps.step2 && !steps.step3 && (
            <Flex
              position='relative'
              height='65px'
              flex='0'
              cursor='pointer'
              onClick={() => setSteps({ step1: true, step2: true, step3: true })}
            >
              <NextBtn src={SilverPawsBtn} alt='Click Next' />
              <Text
                position='absolute'
                color='#fff'
                fontFamily={`'Rowdies', sans-serif`}
                fontSize='20px'
                top='212px'
                left='-27px'
              >
                NEXT
              </Text>
            </Flex>
          )}
          {steps.step1 && steps.step2 && steps.step3 && (
            <Link
              to='/admin/archive'
              onClick={() => {
                dispatch(updateUserProfile({ _id: userInfo?._id, introducedToSilverPaws: true }));
                setOpen(false);
              }}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <NextBtn src={SilverPawsBtn} alt='Click Next' />
              <Text
                position='absolute'
                color='#fff'
                fontFamily={`'Rowdies', sans-serif`}
                fontSize='20px'
                top='212px'
                left='-50px'
                width='168px'
              >
                ARCHIVE
              </Text>
            </Link>
          )}
        </InnterContent>
      </Content>
    </Modal>
  );
};

export default Archive2023Modal;
