import styled from "styled-components";

const Label = styled.label`
  font-weight: 500;
  font-size: clamp(14px, 1rem, 1.5rem);
  color: var(--color-cyan-800);
  margin: ${(props) => props.margin};
`;

export default Label;
