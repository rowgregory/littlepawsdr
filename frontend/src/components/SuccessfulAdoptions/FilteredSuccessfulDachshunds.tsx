import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const FilteredSuccessfulDachshunds = ({ filteredPaginatedDachshunds }: any) => {
  return (
    <>
      {filteredPaginatedDachshunds !== false &&
        filteredPaginatedDachshunds !== undefined &&
        filteredPaginatedDachshunds.map((dachshund: any) => {
          return (
            <Link to={`successful-adoption/${dachshund.id}`} key={dachshund.id}>
              <Card
                key={dachshund.id}
                className="my-3 p-3 rounded d-flex"
                style={{ cursor: "pointer" }}
              >
                {dachshund.attributes.photos[0] ? (
                  <Row>
                    <Col md={6}>
                      <Card.Img
                        onClick={() => {
                          localStorage.setItem(
                            "pageYOffset",
                            JSON.stringify(window.pageYOffset)
                          );
                        }}
                        src={dachshund.attributes.photos[0]}
                        alt="successes"
                      />
                    </Col>
                    <Col className="align-self-center" md={6}>
                      <Card.Title className="d-flex align-self-center justify-content-center">
                        <strong>{dachshund.attributes.name}</strong>
                      </Card.Title>
                      <Card.Body className="d-block text-center">
                        <p>
                          Adopted:{" "}
                          {formatDate(
                            dachshund.attributes.adoptedDate.split("T")[0]
                          )}
                        </p>
                        <p>{dachshund.attributes.breedString}</p>
                      </Card.Body>
                    </Col>
                  </Row>
                ) : (
                  <p style={{ marginBottom: "0" }}>
                    We're sorry, we don't have any pictures in our records of{" "}
                    <u style={{ cursor: "pointer", fontWeight: "bold" }}>
                      {dachshund.attributes.name}
                    </u>{" "}
                    but, don't worry, they were adopted on{" "}
                    {formatDate(dachshund.attributes.adoptedDate.split("T")[0])}{" "}
                    by a loving family 😍
                  </p>
                )}
              </Card>
            </Link>
          );
        })}
    </>
  );
};

export default FilteredSuccessfulDachshunds;
