import { useEffect } from "react";
import { Title } from "../ui/Title";
import styled from "styled-components";

const MainAboutContainer = styled.div`
  padding: 2rem;
`;

const AboutList = styled.ol`
  list-style: none;
`;

const Text = styled.p`
  margin-bottom: 3rem;
  padding: 2rem;
  color: var(--color-cyan-800);
`;

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainAboutContainer>
      <Title padding="2rem">Welcome to Cruise Control</Title>
      <Text>
        At Cruise Control, we are passionate about two things – bicycles and the
        breathtaking beauty of Pensacola, Florida. As locals, we understand the
        allure of exploring our scenic coastal city on two wheels, and we are
        excited to share that experience with you through our top-notch bicycle
        rental services.
      </Text>
      <Title padding="2rem">Our Story</Title>
      <Text>
        Founded in the heart of Pensacola, Cruise Control was born out of a
        desire to provide residents and visitors with a fun, eco-friendly, and
        convenient way to discover our city's rich culture and natural wonders.
        Our team consists of avid cyclists and proud Pensacola enthusiasts who
        believe that cycling is not just a mode of transportation but a
        lifestyle that fosters health, community, and a deep connection with our
        surroundings.
      </Text>
      <Title padding="2rem">Why Choose Cruise Control?</Title>
      <AboutList>
        <li>
          <Text>
            <Title>1. Quality Bicycles:</Title> We offer a fleet of meticulously
            maintained bicycles, ranging from comfortable cruisers to
            high-performance road bikes. Our bikes are regularly inspected to
            ensure a smooth and safe ride for every adventure.
          </Text>
        </li>
        <li>
          <Text>
            <Title>2. Local Expertise:</Title> As locals, we know the best
            routes, the hidden gems, and the most scenic spots in Pensacola.
            Whether you're a seasoned cyclist or a casual rider, we'll guide you
            to the perfect paths to suit your preferences.
          </Text>
        </li>
        <li>
          <Text>
            <Title>3. Flexible Rental Options:</Title> From hourly rentals for a
            quick spin to full-day or weekly rentals for a more leisurely
            exploration, we provide flexible rental options to accommodate your
            schedule and preferences.
          </Text>
        </li>
        <li>
          <Text>
            <Title>4. Safety First:</Title> Your safety is our priority. Each
            rental includes a helmet, and we provide guidance on local traffic
            rules and recommended biking practices to ensure a secure and
            enjoyable ride.
          </Text>
        </li>
      </AboutList>
      <Title padding="2rem">Community Engagement</Title>
      <Text>
        Cruise Control is more than just a bike rental service; we are deeply
        committed to fostering a sense of community and environmental
        responsibility. We actively support local biking events, eco-friendly
        initiatives, and work towards creating a more bike-friendly Pensacola.
      </Text>
      <Text>
        So, whether you're a visitor eager to explore Pensacola's charm or a
        local looking for a new way to experience our city, Pensacola Pedals is
        here to provide you with quality bikes, friendly service, and an
        unforgettable journey on two wheels. Join us in discovering the joy of
        cycling in the heart of the Gulf Coast!
      </Text>
    </MainAboutContainer>
  );
}

export default About;
