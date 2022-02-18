import React, { useRef, useState } from "react";
import { useTareasGlobalContext } from "../Hooks/useTareasGlobalContext";
import styled from "styled-components";
import { API_Auth } from "../API/API_Auth";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Input,
  Form,
  Error,
  Bottom,
  Header,
} from "../components/styled-components/styled";
import { useResetErrors } from "../Hooks/useResetErrors";

const Label = styled.label``;

const RegisterLink = styled(Link)`
  color: inherit;
  padding: 0 0 0 5px;
  letter-spacing: 1px;
  transition: 0.3s;
  &:hover {
    color: #0a1722;
  }
`;
export interface IRegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const Register = () => {
  const navigate = useNavigate();
  const errorAssert = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { dispatch, error } = useTareasGlobalContext();
  const [registerInput, setregisterInput] = useState<IRegisterInput>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeReginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setregisterInput({ ...registerInput, [name]: e.target.value });
  };
  useResetErrors();
  return (
    <Container>
      <Form
        onSubmit={(e) =>
          API_Auth.register(e, registerInput, dispatch, navigate, errorAssert)
        }
      >
        <Header>Login to your account.</Header>
        <Error error={error} ref={errorAssert} aria-live="assertive">
          {error}
        </Error>
        <Label htmlFor="username"></Label>
        <Input
          autoFocus
          type="text"
          name="username"
          onChange={changeReginInput}
          placeholder="Username *"
          id="username"
        ></Input>
        <Label htmlFor="email"></Label>
        <Input
          type="text"
          name="email"
          onChange={changeReginInput}
          placeholder="Email *"
          id="email"
        ></Input>
        <Label htmlFor="password"></Label>
        <Input
          type="password"
          name="password"
          onChange={changeReginInput}
          placeholder="Password *"
          id="password"
        ></Input>
        <Label htmlFor="Confirmpassword"></Label>
        <Input
          type="password"
          name="confirmPassword"
          onChange={changeReginInput}
          placeholder="Confirm password *"
          id="Confirmpassword"
        ></Input>
        <Input type="submit" value="Submit"></Input>
        <Bottom>
          Already have an account?
          <RegisterLink to="/login">Log in here.</RegisterLink>{" "}
        </Bottom>
      </Form>
    </Container>
  );
};
