import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexdirection};
  justify-content: ${(props) => props.justifycontent};
  align-items: ${(props) => props.alignitems};
  gap: ${(props) => props.gap};
  margin: ${(props) => props.margin};
`;

export default FlexContainer;
