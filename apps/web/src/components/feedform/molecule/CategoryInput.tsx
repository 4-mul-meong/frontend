// import React from "react";
// import type { UseFormRegister } from "react-hook-form";
// import type { FormData } from "../organisms/feedForm";

// interface CategoryInputProps {
//   register: UseFormRegister<FormData>;
//   error?: { message?: string };
// }

// function CategoryInput({ register, error }: CategoryInputProps) {
//   return (
//     <div className="flex flex-col gap-[12px]">
//       <label htmlFor="Category" className="block mb-2 text-sm font-bold">
//         Category
//       </label>
//       <select
//         id="Category"
//         {...register("category")}
//         className="block w-full px-3 py-3 bg-[#F1F4F9] border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4D4D4] focus:border-transparent"
//       >
//         <option value="">카테고리를 선택하세요</option>
//         <option value="red">관상어</option>
//         <option value="green">장터</option>
//         <option value="blue">양육일기</option>
//       </select>
//       {error ? <p className="text-red-500 text-sm">{error.message}</p> : null}
//     </div>
//   );
// }

// export default CategoryInput;
