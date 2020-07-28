import styled from "styled-components";

const Input = styled.input`
  padding: 8px 16px;
  color: #666;
  font-size: 20px;
  ${props =>
    props.error ? "border: 1px solid red;" : "border: 1px solid #aaa;"}
  border-radius: 12px;
  &:focus {
    outline: none;
    ${props =>
      props.error
        ? "box-shadow: 1px 0px 8px red;"
        : "box-shadow: 1px 0px 8px green;"}
  }
`;

export default Input;
