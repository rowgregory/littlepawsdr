import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { verifyToken, resetPassword } from "../actions/forgotPasswordActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ResetPassword = ({ match }: any) => {
  const tokenId = match.params.id;
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken(tokenId));
  }, [dispatch, tokenId]);

  const verifyTokenDetails = useSelector((state: any) => state.verifyToken);
  const { loading, user, error } = verifyTokenDetails;

  const resetPasswordDetails = useSelector((state: any) => state.resetPassword);
  const {
    loading: loadingResetPassword,
    success: successResetPassword,
    message,
    error: errorResetPassword,
  } = resetPasswordDetails;

  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(resetPassword(user !== undefined && user.email, password));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <FormContainer>
        <h1>Reset Password</h1>

        <Form onSubmit={submitHandler} className="my-3">
          <Form.Group controlId="email">
            <Form.Label>Email Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Password
          </Button>
        </Form>
        {loadingResetPassword ? (
          <Loader />
        ) : errorResetPassword ? (
          <Message variant="danger">{errorResetPassword}</Message>
        ) : (
          successResetPassword && (
            <Message variant="success">
              {message}
              <Link to="/login" className="mx-3">
                Sign In
              </Link>
            </Message>
          )
        )}
      </FormContainer>
    </>
  );
};

export default ResetPassword;
