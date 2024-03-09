import styled from "styled-components";

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 10px;
  border: none;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};

  &::placeholder {
    opacity: 0.4
  }

  &:focus {
    outline: 2px solid var(--color-teal-600);
  }
`;

export default Input;
