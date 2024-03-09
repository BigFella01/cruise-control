import { RxHamburgerMenu } from "react-icons/rx";
import styled from "styled-components";

const HamburgerIcon = styled(RxHamburgerMenu)`
  cursor: pointer;
  size: ${(props) => props.size};
  color: ${(props) => props.color};
  z-index: 9999;
  &:hover,
  &:focus {
    color: ${(props) => props.colorhover};
  }
`;

export default HamburgerIcon;
