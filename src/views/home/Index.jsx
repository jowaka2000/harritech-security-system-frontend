import React, { useEffect } from "react";
import LeadingItemComponent from "../../components/home/LeadingItemComponent";
import SecondComponent from "../../components/home/SecondComponent";
import ThirdComponent from "../../components/home/ThirdComponent";
import ComprehensiveSolutionComponent from "../../components/home/ComprehensiveSolutionComponent";
import SecuritySolutions from "../../components/home/SecuritySolutions";
import HeroSectionComponent from "../../components/home/HeroSectionComponent";
import CategoryPostBanner from "../../components/home/CategoryPostBanner";

const Index = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }, []);

  return (
    <div className="space-y-5">

      <LeadingItemComponent />
      <HeroSectionComponent />

      <CategoryPostBanner category='Automatic Gate' />
      <SecondComponent />
     
      <ThirdComponent />

      <CategoryPostBanner category='Biometric Systems' />

      <ComprehensiveSolutionComponent />
      <SecuritySolutions />
    </div>
  );
};

export default Index;
