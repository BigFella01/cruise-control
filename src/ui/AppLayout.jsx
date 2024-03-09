import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import styled from "styled-components";
import { SectionContainer } from "./SectionContainer";
import { SectionContainerNav } from "./SectionContainer";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
`;

const Main = styled.main`
  border-top: 1px solid var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-100);
  /* padding: 4rem 2.5rem 6.4rem; */
  // This is the padding we will use on every element
  // inside main
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SectionContainerNav bgcolor={"var(--color-grey-50)"}>
        <AppNav />
      </SectionContainerNav>
      <SectionContainer bgcolor={"var(--color-grey-50)"}>
        <Main>
          <Outlet />
        </Main>
      </SectionContainer>
      <SectionContainer bgcolor={"var(--color-grey-50)"}>
        <Footer />
      </SectionContainer>
    </StyledAppLayout>
  );
}

export default AppLayout;
