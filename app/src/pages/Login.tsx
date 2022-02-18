import React, { useRef, useState } from "react";
import { useTareasGlobalContext } from "../Hooks/useTareasGlobalContext";
import styled from "styled-components";
import { API_Auth } from "../API/API_Auth";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Input,
  Error,
  Bottom,
  Header,
} from "../components/styled-components/styled";
import { useResetErrors } from "../Hooks/useResetErrors";
const SuccessRegister = styled(Error)`
  color: green;
`;
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
export interface ILoginInput {
  email: string;
  password: string;
}
export const Login = () => {
  const navigate = useNavigate();
  const errorAssert = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { dispatch, error, successRegister } = useTareasGlobalContext();
  const [loginInput, setLoginInput] = useState<ILoginInput>({
    email: "",
    password: "",
  });
  const changeLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setLoginInput({ ...loginInput, [name]: e.target.value });
  };
  useResetErrors();

  return (
    <Container>
      <Form
        onSubmit={(e) =>
          API_Auth.login(e, loginInput, dispatch, navigate, errorAssert)
        }
      >
        <Header>Login to your account.</Header>
        <Error error={error} ref={errorAssert} aria-live="assertive">
          {error}
        </Error>
        <SuccessRegister error={successRegister}>
          {successRegister}
        </SuccessRegister>
        <Label htmlFor="email"></Label>
        <Input
          autoFocus
          type="text"
          name="email"
          onChange={changeLoginInput}
          placeholder="Email *"
          id="email"
        ></Input>
        <Label htmlFor="password"></Label>
        <Input
          type="password"
          name="password"
          onChange={changeLoginInput}
          placeholder="Password *"
          id="password"
        ></Input>
        <Input type="submit" value="Submit"></Input>
        <Bottom>
          No account yet?
          <RegisterLink to="/register">Register here.</RegisterLink>{" "}
        </Bottom>
      </Form>
    </Container>
  );
};
