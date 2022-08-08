import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useTareasGlobalContext } from "Hooks/useTareasGlobalContext";

import Tasks from "./Tasks";

const Container = styled.div`
  background-color: #f1f5ff;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  /*  align-items: center; */
  padding: 0 10px;
`;
const Form = styled.form`
  margin: 100px 0;
  min-height: 60vh;
  align-self: baseline;
  max-width: 1000px;
  width: 100%;
  background-color: white;
`;
const Decoration = styled.div`
  border: 1px solid black;
  display: flex;
  width: 80%;
  margin: 80px auto;
  font-size: 1.5rem;
`;
const Input = styled.input`
  padding: 20px;
  font-size: inherit;
  width: 100%;
`;
const SubmitBtn = styled.button`
  font-size: inherit;
  background-color: #2775a8;
  color: white;
  padding: 20px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #2d4d95;
  }
  &:active {
    transform: scale(0.8);
  }
`;
const LoadingRelative = styled.div`
  padding: 30px 10px;
  position: relative;
`;
const Loading = styled.h2`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  width: 80%;

  color: #6e6a7a;
`;
const Error = styled.div`
  color: crimson;
  padding: 10px;
  margin: 10px;
  font-size: 1.5rem;
`;
const Notasks = styled(Error)`
  color: #385f92;
`;

const NewTaskForm = () => {
  const { tareas, isFetching, error, getTasks, postNewTask } =
    useTareasGlobalContext();
  const [inputTask, setInputTask] = useState<string>("");
  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*-----HACER UN CUSTOM ALERT if task is empty-----*/
    postNewTask(inputTask);
    setInputTask("");
  };

  /*----------------GET ALL TASKS--------*/
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /*-------------------------------------*/
  return (
    <Container>
      <Form onSubmit={addTask}>
        <Decoration>
          <Input
            type="text"
            placeholder="Task..."
            value={inputTask}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputTask(e.target.value)
            }
          ></Input>
          <SubmitBtn>Add task</SubmitBtn>
        </Decoration>
        <LoadingRelative>
          {isFetching && <Loading>Loading...</Loading>}
        </LoadingRelative>

        {error && <Error aria-live="assertive">{error}</Error>}
        {tareas.length > 0 ? (
          tareas.map((i) => {
            return <Tasks key={i._id} tarea={i} />;
          })
        ) : (
          <Notasks>No tasks saved yet.</Notasks>
        )}
      </Form>
    </Container>
  );
};
export default NewTaskForm;
