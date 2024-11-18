"use client";
import React, { useState } from "react";
import type { CreateFeedType } from "@/types/request/requestType";
import { feedFormSchema } from "@/schema/FeedFormSchema";
import ImageUploader from "../molecule/ImageUploader";

function FeedCreateFormFields() {
  const [payload, setPayload] = useState<CreateFeedType>({
    memberUuid: "",
    title: "",
    content: "",
    categoryId: 0,
    hashtags: [],
    mediaList: [],
  });

  // Validation 및 값 변환 함수
  const handleValidation = (
    name: string,
    type: string,
    value: string,
    files: FileList | null,
  ) => {
    if (type === "file") {
      return Array.from(files || []).map((file) => ({
        mediaId: crypto.randomUUID(),
        mediaType: file.type,
        mediaUrl: URL.createObjectURL(file),
      }));
    }

    if (name === "tags") {
      return value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
        .map((tag) => ({ name: tag }));
    }

    if (name === "categoryId") {
      return parseInt(value, 10);
    }

    return value;
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = event.target;
    const files = (event.target as HTMLInputElement).files;

    const validatedValue = handleValidation(name, type, value, files);

    // `feedFormSchema`로 검증
    const res = feedFormSchema.safeParse({
      ...payload,
      [name]: validatedValue,
    });
    // console.log("Validation result:", res);

    if (!res.success) {
      // console.error("Validation failed:", res.error);
      return;
    }

    // 상태 업데이트
    setPayload((prev) => ({
      ...prev,
      [name]: validatedValue,
    }));
  };

  return (
    <fieldset className="flex flex-col gap-5 h-full">
      <div className="flex flex-col gap-3">
        <label htmlFor="title" className="block text-sm font-bold">
          제목
        </label>
        <input
          type="text"
          name="title"
          placeholder="제목"
          onChange={handleChange}
          className="w-full h-[55px] rounded-lg outline-none bg-[#F1F4F9] px-2 border-2 focus:bg-[#D4D4D4]"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="post" className="block text-sm font-bold">
          내용
        </label>
        <textarea
          id="post"
          name="content"
          className="w-full h-[116px] border-2 outline-none rounded-lg bg-[#F1F4F9] p-2 focus:bg-[#D4D4D4]"
          rows={4}
          placeholder="내용을 입력해주세요"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="categoryId" className="block text-sm font-bold">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          className="block w-full px-3 py-3 bg-[#F1F4F9] border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4D4D4] focus:border-transparent"
          onChange={handleChange}
        >
          <option value="0" disabled>
            카테고리를 선택하세요
          </option>
          <option value="1">관상어</option>
          <option value="2">장터</option>
          <option value="3">양육일기</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="tags" className="block text-sm font-bold">
          태그
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          className="w-full h-[55px] rounded-lg bg-[#F1F4F9] border-2 px-2 focus:bg-[#D4D4D4] outline-none"
          placeholder="태그 (쉼표로 구분)"
          onChange={handleChange}
        />
      </div>

      <ImageUploader />
    </fieldset>
  );
}

export default FeedCreateFormFields;
