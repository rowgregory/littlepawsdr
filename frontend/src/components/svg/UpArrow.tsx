import React from "react";
import styled from "styled-components";

const DropDownArrow = styled.svg`
  fill: ${({ theme }) => theme.colors.primary};
  position: absolute;
  transform: scale(1.5);
`;

const UpArrow = ({
  top,
  right,
  left,
}: {
  top?: string;
  right?: string;
  left?: string;
}) => {
  return (
    <DropDownArrow
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 490 490"
      width="12px"
      style={{
        top,
        right,
        left,
      }}
    >
      <path d="M490,474.459H0L245.009,15.541L490,474.459z" />
    </DropDownArrow>
  );
};

export default UpArrow;
