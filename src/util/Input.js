import styled from "styled-components";

const Input = styled.input`
  padding: 8px 16px;
  color: #666;
  font-size: 20px;
  border: 1px solid #aaa;
  border-radius: 12px;
  &:focus {
    outline: none;
    box-shadow: 1px 0px 8px green;
  }
`;

export default Input;
