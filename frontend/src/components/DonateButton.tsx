import React from "react";
import { Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DONATE_CREATE_RESET } from "../constants/donationConstants";

const BorderLeft = styled.p`
  display: inline-block;
  margin: 0;
  &:after {
    display: block;
    content: "";
    border-bottom: 3px solid #fff;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  :hover {
    &:after {
      transform: scaleX(1);
    }
  }
  &.fromLeft::after {
    transform-origin: 0% 50%;
  }
`;

const DonateButton = () => {
  const dispatch = useDispatch();
  const browserVersion = navigator.appVersion;
  const isChrome = browserVersion.includes("Chrome");

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 4,
        bottom: 0,
        right: 0,
      }}
    >
      <div
        style={{
          width: "132px",
          height: "80px",
          overflow: "hidden",
          zIndex: 2,
          position: isChrome ? "fixed" : "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        <Row>
          <Link
            onClick={() => dispatch({ type: DONATE_CREATE_RESET })}
            to="/donate"
            className="btn bg-transparent"
            style={{
              color: "#fff",
              zIndex: 2,
              boxShadow:
                "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
              border: "4px solid rgba(255, 255, 255)",
              overflow: "hidden",
              position: "fixed",
              bottom: 20,
              right: 20,
            }}
          >
            <BorderLeft className="fromLeft">Donate</BorderLeft>
          </Link>
        </Row>
      </div>
    </div>
  );
};

export default DonateButton;
