import styled from "styled-components";

export const FormRow = styled.div`
  display: grid;

  gap: 1.5rem;

  width: 100%;
  margin: 0 auto 2rem;
`;

export const FormRowSplit = styled(FormRow)`
  grid-template-columns: 1fr;

  @media (min-width: 555px) {
    grid-template-columns: 1fr 1fr
  }
`

export const FormRowBike = styled(FormRow)`
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto auto;
  padding: 1rem;
  background-color: var(--color-grey-0);
  border-radius: 15px;
  margin-top: 1rem;

  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr auto;
    grid-template-rows: 1fr;
    align-items: center;
  }
`;
