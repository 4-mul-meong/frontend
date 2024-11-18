interface StepContentProps {
  step: number;
}

function StepContent({ step }: StepContentProps): JSX.Element | null {
  if (step === 0) {
    return (
      <div className="text-center">
        <div className="border-dashed border-2 border-gray-400 rounded-lg p-8 mb-4">
          {/* Step 1 콘텐츠 */}
          Step 1: 여기에 이미지 업로드 UI를 추가하세요.
        </div>
      </div>
    );
  } else if (step === 1) {
    return (
      <div className="text-center">
        <div className="flex flex-col gap-4">
          {/* Step 2 콘텐츠 */}
          Step 2: 여기에 입력 필드 등을 추가하세요.
        </div>
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="text-center">
        <div>
          {/* Step 3 콘텐츠 */}
          Step 3: 여기에 최종 확인 및 제출 UI를 추가하세요.
        </div>
      </div>
    );
  }
  return null; // 잘못된 스텝 값 처리
}

export default StepContent;
