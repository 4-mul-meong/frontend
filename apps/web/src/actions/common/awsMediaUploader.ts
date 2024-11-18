async function uploadFileToS3(file: File, folder = "") {
  const formData = new FormData();
  const fileName = folder ? `${folder}/${file.name}` : file.name; // 폴더가 있으면 파일 이름에 포함

  formData.append("fileName", fileName);
  formData.append("fileType", file.type);

  interface UploadResponse {
    imageUrl: string;
  }

  // FileReader를 사용하여 파일을 Base64로 변환
  const base64File = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
  });

  // Base64 데이터에서 파일 데이터만 추출
  const base64Data = base64File.split(",")[1];
  formData.append("fileContent", base64Data);

  // API 호출
  const res = await fetch("/api/s3/client/feed", {
    method: "POST",
    body: JSON.stringify({
      fileName,
      fileType: file.type,
      fileContent: base64Data,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to upload file");
  }

  const data = (await res.json()) as UploadResponse;
  return data.imageUrl;
}

async function deleteFileFromS3(fileUrl: string) {
  const res = await fetch("/api/s3/client/feed", {
    method: "DELETE",
    body: JSON.stringify({
      fileUrl,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete file");
  }
  return true;
}

export { uploadFileToS3, deleteFileFromS3 };
