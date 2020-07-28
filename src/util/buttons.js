import styled from "styled-components";

export const Button = styled.button`
  ${props =>
    props.disabled ? "background-color: #999;" : "background-color: #4caf50;"}
  color: white;
  border: none;
  font-size: 22px;
  padding: 8px 12px;
  outline: none;
  &:hover {
    ${props => (props.disabled ? "" : "background-color: #3e8e41;")}
  }
  &:active {
    ${props => (props.disabled ? "" : "box-shadow: 0 0 8px #888;")}
  }
`;

export const SecondaryButton = styled.button`
  background-color: ${props => (props.disabled ? "#999" : "#ca1616")};
  color: white;
  border: none;
  font-size: 22px;
  padding: 8px 12px;
  outline: none;
  &:hover {
    ${props => (props.disabled ? "" : "background-color: #ec3030;")}
  }
  &:active {
    ${props => (props.disabled ? "" : "box-shadow: 0 0 8px #888;")}
  }
`;
