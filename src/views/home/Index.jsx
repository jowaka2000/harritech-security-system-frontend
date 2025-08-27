import React from "react";
import LeadingItemComponent from "../../components/home/LeadingItemComponent";
import SecondComponent from "../../components/home/SecondComponent";
import ThirdComponent from "../../components/home/ThirdComponent";
import RequestServiceComponent from "../../components/home/RequestServiceComponent";
import ComprehensiveSolutionComponent from "../../components/home/ComprehensiveSolutionComponent";
import SecuritySolutions from "../../components/home/SecuritySolutions";

const Index = () => {
  return (
    <div className="space-y-8 ">
      <div className="flex w-full justify-center">
        <LeadingItemComponent />
      </div>

      <div className="flex w-full justify-center">
        <SecondComponent />
      </div>

      <div className="flex w-full justify-center">
        <RequestServiceComponent />
      </div>

      <div className="flex w-full ">
        <ComprehensiveSolutionComponent />
      </div>

      <div className="flex w-full ">
        <ThirdComponent />
      </div>

      <div className="flex w-full">
        <SecuritySolutions />
      </div>
    </div>
  );
};

export default Index;
