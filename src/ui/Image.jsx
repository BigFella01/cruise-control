import styled from "styled-components";

const Image = styled.img`
  /* max-width: 100%; */
  object-fit: cover;
  border-radius: ${(props) => props.borderradius};
  width: ${props => props.width}
`;

export default Image;
