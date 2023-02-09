import React from 'react';
import './index.css';

const FloatingWords = ({ color }: any) => {
  return (
    <div id={color ? 'load2' : 'load'}>
      <div>G</div>
      <div>N</div>
      <div>I</div>
      <div>D</div>
      <div>A</div>
      <div>O</div>
      <div>L</div>
    </div>
  );
};

export default FloatingWords;
