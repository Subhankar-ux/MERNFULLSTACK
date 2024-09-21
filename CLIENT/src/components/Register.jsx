import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Register = ({ isAuthenticated, setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);

    await axios
      .post("http://localhost:8080/api/v1/user/register", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAvatar("");
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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "800px" }}
    >
      <Form onSubmit={handleRegister} style={{width:"700px"}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            placeholder="Enter Your Phone No"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" onChange={avatarHandler} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Already Registered?
            <Link to={"/login"} className="text-decoration-none">
              LOGIN
            </Link>
          </Form.Label>
        </Form.Group>
        <Button variant="warning" type="submit" className="w-100 fw-bold text-light fs-5">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
