// import * as React from "react";
// import { ShortsFormSchema } from "@/schema/ShortsFormSchema";
// import { VideoUploader } from "../molecules";

// interface StepContentProps {
//   step: number;
// }

// function StepContent({ step }: StepContentProps): JSX.Element | null {
//   // 상태 관리
//   const [value, setValue] = React.useState<{
//     headline: string;
//     post: string;
//     tags: string[];
//   }>({
//     headline: "",
//     post: "",
//     tags: [],
//   });

//   const [tagInput, setTagInput] = React.useState<string>(""); // 현재 입력 중인 태그
//   const [errors, setErrors] = React.useState<Record<string, string>>({});

//   // 검증 로직
//   const validate = (updatedValue: typeof value) => {
//     const res = ShortsFormSchema.safeParse(updatedValue);
//     if (!res.success) {
//       const validationErrors = res.error.issues.reduce(
//         (acc, issue) => ({
//           ...acc,
//           [issue.path[0]]: issue.message,
//         }),
//         {},
//       );
//       setErrors(validationErrors); // 에러 저장
//     } else {
//       setErrors({}); // 에러 초기화
//     }
//   };

//   // 입력값 변경 처리
//   const handleInput = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { id, value: inputValue } = event.target;

//     setValue((prev) => {
//       const updatedValue = {
//         ...prev,
//         [id]:
//           id === "tags"
//             ? inputValue.split(",").map((tag) => tag.trim())
//             : inputValue,
//       };
//       validate(updatedValue); // Zod 유효성 검사
//       return updatedValue;
//     });
//   };

//   // 태그 입력 처리
//   const handleTagInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = event.target.value;

//     if (inputValue.includes(",")) {
//       const newTag = inputValue.replace(",", "").trim();

//       if (newTag && !value.tags.includes(newTag)) {
//         const updatedValue = {
//           ...value,
//           tags: [...value.tags, newTag],
//         };
//         setValue(updatedValue);
//         validate(updatedValue); // Zod 유효성 검사
//       }

//       setTagInput("");
//     } else {
//       setTagInput(inputValue);
//     }
//   };

//   // 태그 삭제 처리
//   const removeTag = (index: number) => {
//     const updatedValue = {
//       ...value,
//       tags: value.tags.filter((_, i) => i !== index),
//     };
//     setValue(updatedValue);
//     validate(updatedValue); // Zod 유효성 검사
//   };

//   return (
//     <fieldset className="step-content-wrapper px-[28px] py-[30px]">
//       {step === 0 && (
//         <div className="step1">
//           <VideoUploader />
//         </div>
//       )}

//       {step === 1 && (
//         <fieldset className="step2">
//           <div className="flex flex-col gap-[22px]">
//             <div className="flex flex-col gap-[12px]">
//               <label htmlFor="headline" className="block text-sm font-bold">
//                 제목
//               </label>
//               <input
//                 id="headline"
//                 type="text"
//                 placeholder="제목을 입력해주세요."
//                 value={value.headline}
//                 onChange={handleInput}
//                 className="w-full h-[55px] rounded-lg outline-none bg-[#F1F4F9] px-2 border-2 focus:bg-[#D4D4D4]"
//               />
//               {errors.headline ? (
//                 <p className="text-red-500">{errors.headline}</p>
//               ) : null}
//             </div>

//             <div className="flex flex-col gap-[12px]">
//               <label htmlFor="post" className="block text-sm font-bold">
//                 내용
//               </label>
//               <textarea
//                 id="post"
//                 value={value.post}
//                 onChange={handleInput}
//                 className="w-full h-[116px] border-2 outline-none rounded-lg bg-[#F1F4F9] p-2 focus:bg-[#D4D4D4]"
//                 rows={4}
//                 placeholder="내용을 입력해주세요"
//               />
//               {errors.post ? (
//                 <p className="text-red-500">{errors.post}</p>
//               ) : null}
//             </div>

//             <div className="flex flex-col gap-[12px]">
//               <label htmlFor="tags" className="block text-sm font-bold">
//                 Tags
//               </label>

//               <div className="flex flex-wrap items-center gap-2 px-2 py-2 border rounded-lg bg-[#F1F4F9]">
//                 {value.tags.map((tag, index) => (
//                   <span
//                     key={tag}
//                     className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg border border-blue-300 flex items-center gap-2"
//                   >
//                     {tag}
//                     <button
//                       type="button"
//                       onClick={() => removeTag(index)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}

//                 <input
//                   type="text"
//                   id="tags"
//                   value={tagInput}
//                   onChange={handleTagInput}
//                   className="flex-grow outline-none bg-transparent border-0 focus:ring-0 focus:outline-none"
//                   placeholder="태그 입력 후 쉼표로 구분하세요"
//                 />
//               </div>
//               {errors.tags ? (
//                 <p className="text-red-500">{errors.tags}</p>
//               ) : null}
//             </div>
//           </div>
//         </fieldset>
//       )}
//     </fieldset>
//   );
// }

// export default StepContent;
