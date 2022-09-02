import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
  justify-items: center;
  align-items: center;
  filter: drop-shadow(0px 0px 7px rgba(1, 1, 1, 0.7));
  /* div { */
  .productImage {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
    width: 400px;
    height: 400px;
    background-size: cover;
    clip-path: polygon(
      20% 20%,
      50% 20%,
      50% 20%,
      80% 20%,
      80% 50%,
      80% 50%,
      80% 80%,
      50% 80%,
      50% 80%,
      20% 80%,
      20% 50%,
      20% 50%
    );
    transition: all 0.7s cubic-bezier(0.895, 0.03, 0.685, 0.22);
    :hover {
      clip-path: polygon(
        20% 0%,
        50% 0%,
        50% 20%,
        100% 20%,
        100% 50%,
        80% 50%,
        80% 100%,
        50% 100%,
        50% 80%,
        0% 80%,
        0% 50%,
        20% 50%
      );
      transform: rotate(-15deg);
      transition: all 0.4s cubic-bezier(0.86, 0, 0.07, 1);
    }
    :hover ~ * {
      opacity: 1;
      transform: rotate(-15deg);
      transition: all 0.4s cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  .shoeImg {
    background-image: url(https://source.unsplash.com/l8p1aWZqHvE/1000x1000);
    background-color: #148bff;
  }
  /* } */

  h4,
  ul,
  span {
    padding: 0;
    margin: 0;
  }

  h4 {
    font-size: 1.5rem;
  }

  .size,
  .color {
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
    z-index: 1;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  }

  .size ul li,
  .color ul li {
    list-style: none;
    width: 20px;
    height: 20px;
    margin: 5px;
    padding: 5px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .color {
    grid-column: 2;
    grid-row: 2;
  }

  .color {
    ul {
      li {
        span {
          width: 10px;
          height: 10px;
          border-radius: 50px;
          display: inline-block;
        }
      }
    }
  }

  .price {
    grid-column: 2;
    grid-row: 1;
    justify-self: center;
    z-index: 1;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  }

  h4 .price {
    grid-column: 2;
    grid-row: 1;
    justify-self: center;
    z-index: 1;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  }
  .price {
    span {
      width: 20px;
      height: 20px;
      padding: 5px;
      background-color: rgba(0, 0, 0, 0.5);
    }
    h4 {
      margin-bottom: 8px;
    }
  }
  .productName {
    grid-column: 1;
    grid-row: 2;
    align-self: center;
    justify-self: center;
    z-index: 1;
    transition: all 0.7s cubic-bezier(0.895, 0.03, 0.685, 0.22);
    color: #fff;
  }
  .red {
    background-color: red;
  }
  .yellow {
    background-color: greenyellow;
  }
  .blue {
    background-color: #0070ee;
  }
`;

const NikeAirMax = ({ product }: any) => {
  return (
    <Container className='container shoe'>
      <div className='productImage shoeImg'></div>

      <div className='size shoeSize'>
        <h4>SIZE</h4>
        <ul>
          <li>9</li>
          <li>8</li>
          <li>7</li>
        </ul>
      </div>
      <div className='price shoePrice'>
        <h4>PRICE</h4>
        <span>{product.price}</span>
      </div>
      <div className='color shoeColor'>
        <h4>COLORS</h4>
        <ul>
          <li>
            <span className='blue'></span>
          </li>
          <li>
            <span className='yellow'></span>
          </li>
          <li>
            <span className='red'></span>
          </li>
        </ul>
      </div>
      <div className='productName shoeName'>{product.name}</div>
    </Container>
  );
};

export default NikeAirMax;
