import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate,Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:8080/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "800px" }}
      >
        <Form onSubmit={handleLogin} style={{ width: "700px" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Not Registered?
              <Link to={"/register"} className="text-decoration-none">
                REGISTER
              </Link>
            </Form.Label>
          </Form.Group>
          <Button
            variant="warning"
            type="submit"
            className="w-100 fw-bold text-light fs-5"
          >
            LOGIN
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
