import styled from "styled-components";

const StyledFormError = styled.span`
  border-radius: 10px;
  border: none;
  color: var(--color-red-200);
  background-color: var(--color-red-400);
  padding: 0.5rem 1rem;
  font-size: 12px;
`;

function FormError({ children }) {
  return <StyledFormError>{children}</StyledFormError>;
}

export default FormError;
