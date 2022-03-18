import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';

export const FullStar: FC<{ color: string }> = ({ color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='14'
    viewBox='0 0 24 24'
  >
    <path
      fill={color}
      d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z'
    />
  </svg>
);
export const HalfStar: FC<{ color: string }> = ({ color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='14'
    viewBox='0 0 24 24'
  >
    <path
      fill={color}
      d='M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z'
    />
  </svg>
);
export const EmptyStar: FC<{ color: string }> = ({ color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='14'
    viewBox='0 0 24 24'
  >
    <path
      fill={color}
      d='M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z'
    />
  </svg>
);

interface RatingProps {
  value: number;
  text?: string;
}

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    margin: 0 0.1rem 0 0;
  }
`;

const Rating: FC<RatingProps> = ({ value, text }) => {
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';
  const color = isDay ? '#000' : '#fff';
  return (
    <RatingContainer>
      <span>
        {value >= 1 ? (
          <FullStar color={color} />
        ) : value >= 0.5 ? (
          <HalfStar color={color} />
        ) : (
          <EmptyStar color={color} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FullStar color={color} />
        ) : value >= 1.5 ? (
          <HalfStar color={color} />
        ) : (
          <EmptyStar color={color} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FullStar color={color} />
        ) : value >= 2.5 ? (
          <HalfStar color={color} />
        ) : (
          <EmptyStar color={color} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FullStar color={color} />
        ) : value >= 3.5 ? (
          <HalfStar color={color} />
        ) : (
          <EmptyStar color={color} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FullStar color={color} />
        ) : value >= 4.5 ? (
          <HalfStar color={color} />
        ) : (
          <EmptyStar color={color} />
        )}
      </span>
      <Text marginBottom='0' color={isDay ? '#000' : '#fff'}>
        {text && text}
      </Text>
    </RatingContainer>
  );
};

export default Rating;
