"use client";
import React, { useState } from "react";
import StepContent from "../organisms/StepContent";
import Conversion from "../atoms/Conversion";

function ShortsWriteForm(): JSX.Element {
  const [activeStep, setActiveStep] = useState<number>(0); // 현재 스텝 상태 관리

  // 스텝 데이터 배열 (고유 id 포함)
  const steps = [
    { id: "step1", label: "Step 1" },
    { id: "step2", label: "Step 2" },
    { id: "step3", label: "Step 3" },
  ];

  const maxSteps = steps.length; // 총 스텝 수

  // handleNext 함수
  const handleNext = (): void => {
    if (activeStep < maxSteps - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  // handleBack 함수
  const handleBack = (): void => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="h-full">
      <form className="bg-[#fff] w-full rounded-b-xl min-h-[400px] max-h-[700px] overflow-y-auto scrollbar-hide">
        {/* 스텝 콘텐츠 렌더링 */}
        <StepContent step={activeStep} />
      </form>

      {/* 단계 표시 */}
      <div className="flex justify-center mt-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`w-3 h-3 rounded-full mx-1 ${
              activeStep === index ? "bg-[#47D0BF]" : "bg-[#fff]"
            }`}
          />
        ))}
      </div>

      <div className="fixed bottom-16 my-6 left-0 right-0">
        {/* 앞뒤버튼 */}
        <Conversion
          activeStep={activeStep}
          maxSteps={maxSteps}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
}

export default ShortsWriteForm;
