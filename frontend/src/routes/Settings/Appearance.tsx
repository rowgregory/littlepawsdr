import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { updateUserProfile } from '../../actions/userActions';
import Message from '../../components/Message';
import { SettingsTitleContainer } from '../../components/styles/profile/Styles';
import { Text } from '../../components/styles/Styles';
import Checkmark from '../../components/svg/Checkmark';
import DarkPreview from '../../components/svg/DarkPreview';
import LightPreview from '../../components/svg/LightPreview';
import SyncPreview from '../../components/svg/SyncPreview';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const themneData = () => [
  {
    theme: 'light',
    icon: <LightPreview />,
  },
  {
    theme: 'dark',
    icon: <DarkPreview />,
  },
  {
    theme: 'sync',
    icon: <SyncPreview />,
  },
];

const SVGContainer = styled.div<{ active: boolean }>`
  border: ${({ active, theme }) =>
    active
      ? `2px solid ${theme.colors.primary}`
      : `2px solid ${theme.separator}`};
  cursor: pointer;
  border-radius: 0.5rem;
  width: 228px;
`;

const ThemeName = styled(Text)`
  text-transform: capitalize;
  border-top: ${({ theme }) => `1px solid ${theme.separator}`};
  padding: 0.35rem 0 0.35rem 1.75rem;
`;

const ThemeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Appearance = () => {
  const [checkmark, setCheckmark] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const { success: successUpdateProfile, error: errorUpdateProfile } =
    userUpdateProfile;

  useEffect(() => {
    if (successUpdateProfile) {
      setCheckmark(true);
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [dispatch, successUpdateProfile]);
  return (
    <>
      {true ? (
        <Text>Coming Soon!</Text>
      ) : errorUpdateProfile ? (
        <Message variant='danger'>{errorUpdateProfile}</Message>
      ) : (
        <>
          <SettingsTitleContainer className='d-flex justify-content-between align-items-center'>
            <Text fontSize='1.5rem'>Theme preferences</Text>
            {checkmark && pathname === '/settings/appearance' && <Checkmark />}
          </SettingsTitleContainer>

          <Text className='mb-3'>
            Choose how Little Paws looks to you. Select a single theme, or sync
            with your system and automatically switch between day and night
            themes.
          </Text>

          <ThemeWrapper>
            {themneData().map((obj, i) => (
              <SVGContainer
                className='d-flex flex-column'
                active={obj.theme === userInfo?.theme}
                onClick={() => {
                  dispatch(
                    updateUserProfile({
                      _id: userInfo._id,
                      theme: obj?.theme,
                    })
                  );
                  setCheckmark(false);
                }}
                key={i}
              >
                <div
                  className='d-flex align-items-center'
                  style={{ height: '120px' }}
                >
                  {obj?.icon}
                </div>
                <ThemeName>{obj?.theme}</ThemeName>
              </SVGContainer>
            ))}
          </ThemeWrapper>
        </>
      )}
    </>
  );
};

export default Appearance;
