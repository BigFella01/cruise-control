import styled from "styled-components";
import logo from "/logo.svg";
import { NavLink as BaseNavLink } from "react-router-dom";
const StyledLogoTitleContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Logo = styled.img`
  width: 50px;
  height: 100%;
`;

const Title = styled(BaseNavLink)`
  margin-top: 10px;
  font-weight: 700;
`;

function LogoTitleContainer() {
  return (
    <StyledLogoTitleContainer>
      <Logo src={logo}></Logo>
      <Title to="/">Cruise Control</Title>
    </StyledLogoTitleContainer>
  );
}

export default LogoTitleContainer;
