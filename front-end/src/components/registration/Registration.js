import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import bcrypt from "bcryptjs";
import "./Registration.css";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validateForm() {
    const regexNameVerification = /^[A-Za-z\s]+$/;
    const regexEmailVerification = /^(.+)@(.+)$/;

    if (!regexNameVerification.test(name)) {
      return false;
    } else if (!regexEmailVerification.test(email)) {
      return false;
    } else if (password !== confirmPassword) {
      return false;
    }
    return true;
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      const response = await axios.post("/registration", {
        name: name,
        email: email,
      });
      const userId = response.data;

      await axios.post("/login", {
        email: email,
        password: hashedPassword,
        userId: userId,
      });
      alert("Registration Success!");
      navigate("/login");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <Form id="registration-container" onSubmit={handleSubmit}>
        <div id="left-col">
          <Form.Group controlId="formName" className="formGroup mt-5 mb-3">
            <Form.Label>Name: </Form.Label>
            <Form.Control
              className="form-input form-control-sm"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formEmail" className="formGroup mb-3">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              className="form-input form-control-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formPassword" className="formGroup mb-3">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              className="form-input form-control-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group
            controlId="formConfirmPassword"
            className="formGroup mb-3"
          >
            <Form.Label>Verify Password: </Form.Label>
            <Form.Control
              className="form-input form-control-sm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="*********"
              required
            ></Form.Control>
          </Form.Group>
        </div>
        <Button
          id="submit-button"
          className="mx-auto submit-button"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
