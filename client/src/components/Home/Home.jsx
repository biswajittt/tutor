import React from "react";
import HomeHeader from "../Utilities/PageHeader/PageHeader.jsx";
import HomeCardScroller from "./HomeCardScroller/HomeCardScroller.jsx";
import MentorSection from "./NewArrival/MentorSection.jsx";
import NavBar from "../Navbar/Navbar.jsx";

export default function Home() {
  return (
    <>
      <NavBar />

      <div className="learnerby-home">
        <HomeHeader
          title="The world’s destination for learners"
          caption="Dummy text dummy text dummy text dummy text dummy text dummy text dummy text"
          buttonText="Get Started"
        />
        <HomeCardScroller />
        <MentorSection />
      </div>
    </>
  );
}
