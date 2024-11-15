'use client';
import React, { useState } from 'react';
import type { CreateFeedType } from '@/types/request/requestType';
import { feedFormSchema } from '@/schema/FeedFormSchema';
import ImageUploader from '../molecule/ImageUploader';

function FeedCreateFormFields() {
  const [payload, setPayload] = useState<CreateFeedType>({
    memberUuid: '',
    title: '',
    content: '',
    categoryId: 0,
    hashtags: [],
    mediaList: [],
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === 'file') {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        setPayload({
          ...payload,
          mediaList: Array.from(files),
        });
      }
    } else if (name === 'tags') {
      setPayload({
        ...payload,
        hashtags: value.split(',').map((tag) => tag.trim()),
      });
    } else {
      setPayload({
        ...payload,
        [name]: value,
      });
    }

    // `feedFormSchema`로 검증
    const res = feedFormSchema.safeParse({
      ...payload,
      [name]:
        type === 'file'
          ? Array.from((event.target as HTMLInputElement).files || [])
          : value,
    });
    console.log('Validation result:', res);
  };

  return (
    <fieldset className="flex flex-col gap-5">
      <input
        type="text"
        name="title"
        placeholder="제목"
        onChange={handleChange}
      />
      <textarea name="content" placeholder="내용" onChange={handleChange} />
      <input
        type="text"
        name="tags"
        placeholder="태그 (쉼표로 구분)"
        onChange={handleChange}
      />
      <ImageUploader />
    </fieldset>
  );
}

export default FeedCreateFormFields;
