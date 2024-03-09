import styled from "styled-components";

export const SectionContainer = styled.section`
  background-color: ${(props) => props.bgcolor};
  > * {
    margin: 0 auto;
    max-width: 1200px;
  }
`;

export const SectionContainerNav = styled(SectionContainer)`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  z-index: 9000;

`;



// The container itself will have the background color,
// and reach the full width of the page. The content
// itself will max at 800px and be stuck in the middle
// of the screen. Therefore, we will specify the direct
// children of this component to max at a width of 800px
