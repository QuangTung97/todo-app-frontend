import styled from "styled-components";

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 22px;
  padding: 8px 12px;
  outline: none;
  &:hover {
    background-color: #3e8e41;
  }
  &:active {
    box-shadow: 0 0 8px #888;
  }
`;

export default Button;
