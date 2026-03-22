import React, { useEffect } from "react";
import LeadingItemComponent from "../../components/home/LeadingItemComponent";
import SecondComponent from "../../components/home/SecondComponent";
import ThirdComponent from "../../components/home/ThirdComponent";
import RequestServiceComponent from "../../components/home/RequestServiceComponent";
import ComprehensiveSolutionComponent from "../../components/home/ComprehensiveSolutionComponent";
import SecuritySolutions from "../../components/home/SecuritySolutions";
import HeroSectionComponent from "../../components/home/HeroSectionComponent";

const Index = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }, []);

  return (
    <div className="space-y-0">

      <LeadingItemComponent />
      <HeroSectionComponent />
      <SecondComponent />
      <ThirdComponent />
      <ComprehensiveSolutionComponent />
      <SecuritySolutions />
    </div>
  );
};

export default Index;
