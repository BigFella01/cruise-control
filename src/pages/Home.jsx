import styled from "styled-components";
import Button from "../ui/Button";
import Image from "../ui/Image";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import useIsVisible from "../hooks/useIsVisible";

const ContentSection = styled.section`
  margin: 0;
  padding: 8rem 2.5rem 2rem;
  border-bottom: 1px solid var(--color-grey-100);

  div:nth-child(2) {
    flex-direction: column-reverse;
    @media (min-width: 600px) {
      flex-direction: row;
    }
  }
`;

const ContentSectionIntro = styled(ContentSection)`
  background-image: linear-gradient(
      rgba(36, 42, 46, 0.6),
      rgba(36, 42, 46, 0.6)
    ),
    url("https://www.visitpensacola.com/imager/cmsimages/954351/28176025447_e317250864_o_a127ff5a-8c50-468b-9105-d50e74cc0b29_91852798b59be8b28fc00edfe4aec23a.jpg");
  background-size: cover;
  background-position: center;
  padding: 18rem 4.5rem 18rem;
`;

const HomeTitle = styled.h2`
  color: var(--color-grey-200);
  margin-bottom: 4rem;
`;

const FlexContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  border-top: 1px solid var(--color-grey-200);
  padding: 7rem 2rem 2rem;
  opacity: 0;
  transition: opacity 600ms ease-in;
  margin-bottom: 6rem;

  @media (min-width: 600px) {
    flex-direction: row;

    > * {
      width: 50%;
    }
  }
`;

const InfoText = styled.p`
  color: var(--color-cyan-700);
  font-weight: 500;
`;

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const refOne = useRef();
  const refTwo = useRef();
  const refThree = useRef();
  const refs = [refOne, refTwo, refThree];

  useIsVisible(refs, (entry) => {
    entry.target.style.opacity = "1";
  });

  return (
    <>
      <ContentSectionIntro>
        <HomeTitle>
          Pensacola is home to some of the best scenery in the world. We feel
          obligated to make it accessible to you.
        </HomeTitle>
        <Button
          onClick={() => navigate("/book")}
          variation="primary"
          size="medium"
        >
          Rent bicycles now
        </Button>
      </ContentSectionIntro>
      <ContentSection>
        <FlexContentSection ref={refOne}>
          <Image
            alt="people riding bicycles"
            src="/biking1.jpeg"
          ></Image>
          <InfoText>
            Bikes can be rented daily for up to five days. Prices start at $20 a
            day.
          </InfoText>
        </FlexContentSection>
        <FlexContentSection ref={refTwo}>
          <InfoText>
            We have a selection of bikes to choose from, including beach bikes,
            road bikes, and electric bikes.
          </InfoText>
          <Image
            alt="someone riding bicycle at sunset"
            src="/biking2.jpeg"
          ></Image>
        </FlexContentSection>
        <FlexContentSection ref={refThree}>
          <Image
            alt="people riding bicycles downtown"
            src="/biking3.jpeg"
          ></Image>
          <InfoText>
            Pensacola provides a great selection of places to ride, including the beach and downtown. 
          </InfoText>
        </FlexContentSection>
      </ContentSection>
    </>
  );
}

export default Home;

// homepage: description of products provided.
// Bikes included will be road bikes, beach cruisers,
// and recumbent bikes. All rentals will include a helmet
// booking page: book bikes
// about page. Will talk about the business and all the
// different places in Pensacola to ride your bike
