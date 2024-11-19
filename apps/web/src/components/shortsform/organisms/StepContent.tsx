import { VideoUploader } from "../molecules";

interface StepContentProps {
  step: number;
}

function StepContent({ step }: StepContentProps): JSX.Element | null {
  return (
    <fieldset className="step-content-wrapper px-[28px] py-[30px]">
      {step === 0 && (
        <div className="">
          <VideoUploader />
        </div>
      )}
      {step === 1 && (
        <fieldset className="">
          <div className="flex flex-col gap-[22px]">
            {/* 제목 */}
            <div className="flex flex-col gap-[12px]">
              <label htmlFor="headline" className="block text-sm font-bold">
                제목
              </label>
              <input
                id="headline"
                type="text"
                placeholder="제목을 입력해주세요."
                className="w-full h-[55px] rounded-lg outline-none bg-[#F1F4F9] px-2 border-2 focus:bg-[#D4D4D4]"
              />
            </div>

            {/* 내용 */}
            <div className="flex flex-col gap-[12px]">
              <label htmlFor="post" className="block text-sm font-bold">
                내용
              </label>
              <textarea
                id="post"
                className="w-full h-[116px] border-2 outline-none rounded-lg bg-[#F1F4F9] p-2 focus:bg-[#D4D4D4]"
                rows={4}
                placeholder="내용을 입력해주세요"
              />
            </div>

            {/* 태그  */}
            <div className="flex flex-col gap-[12px]">
              <label htmlFor="value" className="block text-sm font-bold">
                Tags
              </label>
              <input
                type="text"
                id="value"
                className="w-full h-[55px] rounded-lg bg-[#F1F4F9] border-2 px-2 focus:bg-[#D4D4D4] outline-none "
                placeholder="태그를 선택해주세요."
              />
            </div>
          </div>
        </fieldset>
      )}
      {step === 2 && (
        <div className="">
          <div>
            {/* Step 3 콘텐츠 */}
            Step 3: 피드 상세 페이지 미리보기 업로드
          </div>
        </div>
      )}
    </fieldset>
  );
}

export default StepContent;
