import { BackButton, GoButton } from "@/components/common/icons";

interface StepButtonProps {
  activeStep: number;
  maxSteps: number;
  handleBack: () => void;
  handleNext: () => void;
}

function Conversion({
  activeStep,
  maxSteps,
  handleBack,
  handleNext,
}: StepButtonProps): JSX.Element {
  return (
    <div className="flex justify-center">
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        disabled={activeStep === 0}
        className={
          activeStep === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200"
        }
      >
        <BackButton />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
        className={
          activeStep === maxSteps - 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200"
        }
      >
        <GoButton />
      </button>
    </div>
  );
}

export default Conversion;
