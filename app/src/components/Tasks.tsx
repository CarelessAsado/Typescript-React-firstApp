import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useTareasGlobalContext } from "Hooks/useTareasGlobalContext";
import { API } from "API/tasksAPI";
interface StyledProps {
  done: boolean;
  isEditing: boolean;
}
const Tarea = styled.div<StyledProps>`
  background-color: #2775a8;
  margin: 5px;
  border-radius: 10px;
  color: white;
  font-size: 1.75rem;
  padding: 0 0 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  text-decoration: ${(props) =>
    !props.isEditing && props.done && "line-through"};
  @media (max-width: 430px) {
    flex-direction: column;
    padding: 0;
  }
`;
const Functionality = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  @media (max-width: 430px) {
    justify-content: space-between;
    width: 100%;
  }
`;
const Delete = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  cursor: pointer;
  background-color: #201c1c;
  display: flex;
  padding: 20px;
  &:hover {
    background-color: #272c44;
  }
`;
/* extender caracteristicas a los otros iconos*/
const Update = styled(Delete)``;
const CheckDone = styled(Delete)``;
/*---------------------*/
const EditInput = styled.input`
  color: #6b1010;
  &:read-only {
    color: inherit;
  }
  width: 100%;
  font-size: inherit;
  background-color: inherit;
  overflow-y: scroll;
  @media (max-width: 430px) {
    padding: 20px 10px;
  }
`;
interface Props {
  tarea: ITarea;
}
const Tasks: React.FC<Props> = ({ tarea }) => {
  const { dispatch, user } = useTareasGlobalContext();
  const { name, _id, done } = tarea;
  const editInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [editInputBis, setEditInputBis] = useState<string>(name);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  function changeEditStatus() {
    if (isEditing && clicked) {
      return;
    }
    if (!isEditing && clicked) {
      setClicked(false);
      return;
    }
    setClicked(true);
    return setIsEditing(true);
  }
  function editName() {
    setIsEditing(false);
    if (editInput.current.value === name) return;
    API.updateNAME(_id, user._id, editInputBis, dispatch);
  }
  useEffect(() => {
    isEditing && editInput.current.focus();
  }, [isEditing]);

  return (
    <Tarea done={done} isEditing={isEditing}>
      <EditInput
        onBlur={editName}
        onClick={() => setIsEditing(true)}
        ref={editInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEditInputBis(e.target.value);
        }}
        value={editInputBis}
        readOnly={!isEditing}
      />
      <Functionality>
        <Update onClick={changeEditStatus}>
          <AiFillEdit />
        </Update>
        <CheckDone
          onClick={() => API.updateDONE(_id, user._id, !done, dispatch)}
        >
          {done ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
        </CheckDone>
        <Delete onClick={() => API.deleteTask(_id, user._id, dispatch)}>
          <AiFillDelete></AiFillDelete>
        </Delete>
      </Functionality>
    </Tarea>
  );
};

export default Tasks;
