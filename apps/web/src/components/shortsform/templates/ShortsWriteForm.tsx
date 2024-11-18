"use client";
import React, { useState } from "react";
import StepContent from "../organisms/StepContent";

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
    <form className="max-w-md mx-auto text-center p-4">
      {/* 스텝 콘텐츠 렌더링 */}
      <StepContent step={activeStep} />

      <div className="flex justify-center mt-4">
        {steps.map((step, index) => (
          <div
            key={step.id} // 고유 id 사용
            className={`w-3 h-3 rounded-full mx-1 ${
              activeStep === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* 이전/다음 버튼 */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handleBack}
          disabled={activeStep === 0}
          className={`px-4 py-2 border rounded-lg ${
            activeStep === 0
              ? "border-gray-300 text-gray-300"
              : "border-gray-500 text-gray-500 hover:bg-gray-100"
          }`}
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
            activeStep === maxSteps - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          다음
        </button>
      </div>
      {/* <Button type="submit">Upload Now</Button> */}
    </form>
  );
}

export default ShortsWriteForm;
