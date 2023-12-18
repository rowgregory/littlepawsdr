import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const revealLink = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
`;
const slideArrow = keyframes`
  0% {

    transform: translateX(0px);
  }

  50% {
    transform: translateX(15px);
    color: #22c2b7;
  }
  100% {

    transform: translateX(0);
    visibility: visible;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  a {
    visibility: hidden;
    padding: 10px 28px;
    background: ${({ theme }) => theme.colors.quinary};
    margin-block: 6px;
    color: #fff;
    width: 250px;
    border: 0;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    :hover {
      text-decoration: none;
    }
    &.link-item {
      :nth-child(1) {
        animation: ${revealLink} 0.3s ease-in-out forwards;
      }
      :nth-child(2) {
        animation: ${revealLink} 0.3s 0.4s ease-in-out forwards;
      }
      :nth-child(3) {
        animation: ${revealLink} 0.3s 0.8s ease-in-out forwards;
      }
    }
    i {
      color: #fff;
      animation: ${slideArrow} 3s 0.8s ease-in-out infinite;
    }
  }
`;

interface SplitTextToCharsProps {
  text: string;
  page?: string;
  fontSize?: string;
}

const SplitTextToChars: React.FC<SplitTextToCharsProps> = ({
  text,
  page,
  fontSize,
}) => {
  const [splitText, setSplitText] = useState<string[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(-1);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    const splitChars = text.split('');
    setSplitText(splitChars);
    setCurrentCharIndex(-1);
    setIsComplete(false);
  }, [text, setIsComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentCharIndex((prevIndex) =>
        prevIndex < splitText.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 15);

    return () => clearTimeout(timer);
  }, [currentCharIndex, splitText.length]);

  useEffect(() => {
    if (currentCharIndex + 1 === splitText.length && splitText.length > 0) {
      setIsComplete(true);
    }
  }, [currentCharIndex, splitText.length]);

  return (
    <div className='d-flex flex-column'>
      <div className='d-flex flex-wrap'>
        {splitText.map((char, index) => (
          <div key={index}>
            <span
              style={{
                zIndex: splitText.length - index,
                position: 'relative',
                display: 'inline-block',
                minWidth: char === ' ' ? '6px' : 'auto',
              }}
            ></span>
            <span
              style={{
                display: 'inline-block',
                position: 'relative',
                fontSize,
              }}
            >
              {index <= currentCharIndex ? char : ''}
            </span>
          </div>
        ))}
      </div>
      {isComplete && page === 'cart' && (
        <div className='mt-4'>
          <LinkContainer>
            <Link to='/merch' className='link-item'>
              Merchandise
              <span>
                <i className='fas fa-arrow-right'></i>
              </span>
            </Link>
            <Link to='/ecards' className='link-item'>
              Ecards
              <span>
                <i className='fas fa-arrow-right'></i>
              </span>
            </Link>
            <Link to='/welcome-wieners' className='link-item'>
              Welcome Wieners
              <span>
                <i className='fas fa-arrow-right'></i>
              </span>
            </Link>
          </LinkContainer>
        </div>
      )}
    </div>
  );
};

export default SplitTextToChars;
