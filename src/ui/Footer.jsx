import styled from "styled-components";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LogoTitleContainer from "./LogoTitleContainer";

const StyledFooter = styled.footer`
  /* background-color: var(--color-teal-200); */
  color: var(--color-cyan-900);
  padding: 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const IconContainer = styled.div`
  width: 50%;
  margin: 0 auto;

  display: flex;
  gap: 1rem;
  justify-content: space-evenly;

  > * {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
`;

const Copyright = styled.span`
text-align: center`;

function Footer() {
  return (
    <StyledFooter>
      <IconContainer>
        <FaFacebook />
        <RiInstagramFill />
        <FaYoutube />
        <FaXTwitter />
      </IconContainer>
      <LogoTitleContainer />
      <Copyright>Copyright &copy; 2024 CruiseControl, Inc.</Copyright>
    </StyledFooter>
  );
}

export default Footer;
