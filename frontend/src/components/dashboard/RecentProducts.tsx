import React from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const RecentProducts = ({ products, history }: any) => {
  return (
    <Card className="w-100 bg-transparent d-flex flex-column p-2 my-2">
      <Row>
        <Col>
          <h5>Recently Added Products</h5>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-wrap">
          {products.length !== 0 &&
            products !== undefined &&
            products
              .map((product: any) => (
                <Image
                  onClick={() =>
                    history.push(`/admin/product/${product._id}/edit`)
                  }
                  key={product._id}
                  src={product.image}
                  alt={`product-${product._id}`}
                  width="150px"
                  height="150px"
                  className="rounded-lg m-3"
                  style={{ objectFit: "cover", cursor: "pointer" }}
                />
              ))
              .filter((_: any, p: number) => p < 5)}
        </Col>
      </Row>
      <Row>
        <Col className="mx-2 my-4 d-flex justify-content-end">
          <Link to="/admin/productList">See all Products</Link>
        </Col>
      </Row>
    </Card>
  );
};

export default RecentProducts;
