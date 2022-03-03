import { useState } from 'react';
import styled from 'styled-components';

const NavBar = ({ graph, setGraph, searchNode, insertNode, deleteNode }) => {
  const [insert, setInsert] = useState('');
  const [remove, setRemove] = useState('');
  const [find, setFind] = useState('');
  return (
    <Wrapper>
      <Button onClick={() => insertNode(insert)}>Insert</Button>
      <Input
        value={insert}
        onChange={(e) =>
          setInsert((p) => (e.target.validity.valid ? e.target.value : p))
        }
        type="text"
        pattern="[0-9]*"
      />
      <Button onClick={() => deleteNode(remove)}>Remove</Button>
      <Input
        value={remove}
        onChange={(e) =>
          setRemove((p) => (e.target.validity.valid ? e.target.value : p))
        }
        type="text"
        pattern="[0-9]*"
      />
      <Button onClick={() => searchNode(search)}>Find</Button>
      <Input
        value={find}
        onChange={(e) =>
          setFind((p) => (e.target.validity.valid ? e.target.value : p))
        }
        type="text"
        pattern="[0-9]*"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 100%;
  background-color: #262626;
  display: flex;
  padding: 1rem;
`;

const Button = styled.button`
  font-size: 1.5rem;
  border-radius: 0.4rem;
  padding: 0.3rem 0.6rem;
  background-color: #772ce8;
  color: #f1f1f1;
  user-select: none;
  text-decoration: none;
  border: none;
  margin-right: 1rem;
  &:hover {
    background-color: #6441a5;
  }
  &:active {
    background-color: #772ce8;
  }
`;

const Input = styled.input`
  font-size: 1rem;
  width: 6rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  border-width: 2px;
  border-color: hsla(0, 0%, 100%, 0.2);
  background-color: hsla(0, 0%, 100%, 0.2);
  border-style: solid;
  transition: border 100ms ease-in, background-color 100ms ease-in;
  color: #efeff1;
  margin-right: 1rem;
  &:focus {
    outline: none;
    background-color: #000;
    border-color: #a970ff;
  }
`;

export default NavBar;
