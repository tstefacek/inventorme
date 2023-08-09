import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("/submit", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const authToken = response.data.token;
        const userId = response.data.userId;
        localStorage.setItem("token", authToken);
        localStorage.setItem("userId", userId);

        navigate("/items");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Login failed. Please check your email and password.");
      } else {
        alert("User credentials don't exist. Please register.");
      }
    }
  }

  return (
    <div id="login-container">
      <Form id="login-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="m-5">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@gmail.com"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formPassword" className="m-5">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*********"
            required
          ></Form.Control>
        </Form.Group>
        <div className="text-center">
          <Button
            className="mx-auto submit-button"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
