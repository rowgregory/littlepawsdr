import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const OrderCard = styled(Card)`
  background-color: #161b23;
  cursor: pointer;
  :hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

const RecentOrders = ({ orders, history, usersInitials }: any) => {
  return (
    <Card className="w-100 bg-transparent d-flex flex-column p-2 my-2">
      <Row>
        <Col>
          <h5>Recent Orders</h5>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-wrap">
          {orders !== undefined &&
            orders.length !== 0 &&
            orders
              .map((order: any) => (
                <OrderCard
                  onClick={() => history.push(`/order/${order._id}`)}
                  key={order._id}
                  className="m-3 rounded-large"
                >
                  <Card.Header className="d-flex justify-content-between">
                    {usersInitials(order.user.name)}
                    <Card.Text>
                      Is Paid{" "}
                      {order.isPaid ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "limegreen" }}
                        />
                      ) : (
                        <i className="fas fa-times" style={{ color: "red" }} />
                      )}
                    </Card.Text>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>Order number: {order._id}</Card.Text>
                    <Card.Text>Total Price: ${order.totalPrice}</Card.Text>
                  </Card.Body>
                </OrderCard>
              ))
              .reverse()
              .filter((_: any, o: number) => o < 5)}
        </Col>
      </Row>
      <Row>
        <Col className="mx-2 my-4 d-flex justify-content-end">
          <Link to="/admin/orderList">See all Orders</Link>
        </Col>
      </Row>
    </Card>
  );
};

export default RecentOrders;
