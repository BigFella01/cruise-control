import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";

const CloseIcon = styled(IoCloseOutline)`
  cursor: pointer;
  size: ${(props) => props.size};
  color: ${(props) => props.color};
  z-index: 9999;
  &:focus,
  &:hover {
    color: ${(props) => props.colorhover};
  }
`;

export default CloseIcon;
