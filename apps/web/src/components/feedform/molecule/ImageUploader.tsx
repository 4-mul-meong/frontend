'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { DownloadImage, PushImage } from '@/components/common/icons';
import { uploadFileToS3 } from '@/actions/common/awsMediaUploader';

function ImageUploader() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFeedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log('e.target:', e.target);
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    const s3Url = await uploadFileToS3(file, 'feed');
    console.log('S3 URL:', s3Url);
    if (!s3Url) return;
    setImagePreviews([...imagePreviews, URL.createObjectURL(file)]);
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="feedImg"
        className="items-center gap-2 w-full flex justify-center border-dotted border-2 border-gray-300 p-4 rounded-xl bg-[#F1F4F9] h-[110px]"
      >
        <DownloadImage />
        <span className="text-gray-600 text-[16px]">Upload attachment</span>
      </label>
      <input
        type="file"
        id="feedImg"
        name="feedImg"
        className="hidden"
        onChange={(e) => {
          void handleFeedImage(e);
        }}
      />

      <div className="flex gap-4 mt-4 flex-wrap w-full justify-center">
        {imagePreviews.length > 0 &&
          imagePreviews.map((preview, index) => (
            <div
              key={preview || index}
              className="w-[120px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border-dashed border-2 overflow-hidden"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              ) : (
                <PushImage />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ImageUploader;
