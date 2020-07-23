import styled from "styled-components";

const FormLabel = styled.h3`
  font-size: 18px;
  margin: 4px 0px;
  font-family: sans-serif;
  ${props =>
    props.required
      ? `&::after {
          content: "*";
          color: red;
        }`
      : ""}
`;

export default FormLabel;
