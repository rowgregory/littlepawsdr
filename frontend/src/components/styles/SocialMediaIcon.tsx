import styled from 'styled-components';

export const SocialMediaButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .button {
    display: inline-block;
    border-radius: 50px;
    height: 60px;
    width: 60px;
    background: #fff;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
    cursor: pointer;
    overflow: hidden;
    margin: 0 0.25rem;
    :hover {
      width: 200px;
      .fb {
        background: #1a76d2;
        i {
          color: #fff;
        }
      }
      .twitter {
        background: #1da1f2;
        i {
          color: #fff;
        }
      }
      .youtube {
        background: #f00;
        i {
          color: #fff;
        }
      }
      .pinterest {
        background: #f44336;
        i {
          color: #fff;
        }
      }
      .insta {
        background: linear-gradient(
          45deg,
          #ffdd55 0%,
          #ff543e 52%,
          #c837ab 100%
        );
        i {
          color: #fff;
        }
      }
    }
    span {
      font-size: 20px;
      font-weight: 500;
      line-height: 60px;
      margin-left: 1.15rem;
      color: #000;
      text-align: center;
    }
    .icon {
      display: inline-block;
      height: 60px;
      width: 60px;
      text-align: center;
      border-radius: 50px;
      box-sizing: border-box;
      line-height: 60px;
      i {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 25px;
        line-height: 60px;
        transition: all 0.3s ease-out;
      }
    }
  }
`;
