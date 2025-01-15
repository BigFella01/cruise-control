import { NavLink as BaseNavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import CloseIcon from "./CloseIcon";
import useClickOutside from "../hooks/useClickOutside";
import LogoTitleContainer from "./LogoTitleContainer";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: var(--color-cyan-600);
  padding: 2rem;
`;

const NavRight = styled.ul`
  display: flex;
  gap: 2rem;
`;

const NavRightMobile = styled(NavRight)`
  flex-direction: column;
  align-items: start;

  z-index: 9000;
  position: fixed;
  inset: 0 0 0 30%;
  color: var(--color-grey-0);
  font-weight: 700;
  text-transform: uppercase;
  background: hsl(150deg 30% 60% / 0.9);
  backdrop-filter: blur(1rem);
  padding: min(30vh, 10rem);
  transform: translateX(100%);
  transition: transform 200ms ease-out;
`;

const NavLinkRight = styled(BaseNavLink)`
  text-decoration: none;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 1px;
    background: currentColor;

    transform: scaleX(0);
    transform-origin: right;
    transition: transform 200ms ease-in;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  &.active::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

function AppNav() {
  const [navIconVisible, setNavIconVisible] = useState();
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const mobileNavRef = useRef();
  const location = useLocation();

  function closeMobileNav() {
    setMobileNavVisible(false);
    mobileNavRef.current.style.transform = "translateX(100%)";
  }

  function openMobileNav() {
    setMobileNavVisible(true);
    mobileNavRef.current.style.transform = "translateX(0%)";
  }

  function handleClick() {
    // This function opens and closes the mobile nav
    if (mobileNavVisible) closeMobileNav();
    else openMobileNav();
  }

  useEffect(() => {
    // This useEffect will determine what version of the
    // nav will be displayed on mount
    if (window.innerWidth <= 600) {
      setNavIconVisible(true);
    } else if (window.innerWidth > 600) {
      setNavIconVisible(false);
    }
  }, []);

  useEffect(() => {
    // This useEffect will listen for resize events, and
    // configure the nav bar as such
    function handleResize() {
      if (window.innerWidth <= 600) {
        setNavIconVisible(true);
      } else if (window.innerWidth > 600) {
        setNavIconVisible(false);
        closeMobileNav();
      }
    }
    window.addEventListener("resize", handleResize);

    return function () {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    // This useEffect closes the mobileNav when the user
    // goes to a different page
    closeMobileNav();
  }, [location]);


  // This is a custom hook imported from our the hooks folder.
  // This custom hook receives an element and a handler function
  // that will be executed when said element is clicked outside of.
  useClickOutside(mobileNavRef, function () {
    setMobileNavVisible(false);
    mobileNavRef.current.style.transform = "translateX(100%)";
  });

  return (
    <StyledNav>
      <LogoTitleContainer />
      {!navIconVisible && !mobileNavVisible ? (
        <NavRight>
          <li>
            <NavLinkRight to="/">Home</NavLinkRight>
          </li>
          <li>
            <NavLinkRight to="/book">Book</NavLinkRight>
          </li>
          <li>
            <NavLinkRight to="/findbooking">Find Booking</NavLinkRight>
          </li>
          <li>
            <NavLinkRight to="/about">About</NavLinkRight>
          </li>
        </NavRight>
      ) : navIconVisible && !mobileNavVisible ? (
        <HamburgerIcon
          size="40px"
          color="var(--color-cyan-600)"
          onClick={handleClick}
        />
      ) : (
        <CloseIcon
          size="40px"
          color="var(--color-grey-100)"
          onClick={handleClick}
        />
      )}

      <NavRightMobile ref={mobileNavRef}>
        <li>
          <NavLinkRight to="/">Home</NavLinkRight>
        </li>
        <li>
          <NavLinkRight to="/book">Book</NavLinkRight>
        </li>
        <li>
          <NavLinkRight to="/findbooking">Find Booking</NavLinkRight>
        </li>
        <li>
          <NavLinkRight to="/about">About</NavLinkRight>
        </li>
      </NavRightMobile>
    </StyledNav>
  );
}

export default AppNav;

// If navIconVisible && mobileNavVisible, we want to render
// the CloseIcon. If navIconVisible && !mobileNavVisible, we
// want to render HamburgerIcon.
