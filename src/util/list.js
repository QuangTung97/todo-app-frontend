import styled from "styled-components";

export const List = styled.ul`
  margin: 0;
  padding: 0;
  flex-direction: column;
`;

export const ListItem = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  background-color: ${props => (props.active ? "#e7ffe7" : "#fff")};
  margin: 2px 0;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${props => (props.active ? "#d1e6d1" : "#eee")};
  }
`;
