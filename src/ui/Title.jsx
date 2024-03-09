import styled from "styled-components";

export const Title = styled.h3`
  color: var(--color-cyan-800);
  display: inline-block;

  font-size: ${(props) => props.fontSize};
  text-transform: ${(props) => props.texttransform};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;
