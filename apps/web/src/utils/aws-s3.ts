import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// 환경 변수 가져오기
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// 환경 변수가 모두 설정되었는지 확인하고 S3Client를 생성
if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error("S3Client 설정을 위한 환경 변수가 모두 설정되지 않았습니다.");
}

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * S3에 이미지를 업로드하고 URL을 반환하는 함수
 * @param file - 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export async function uploadImageToS3(file: File): Promise<string> {
  const uniqueKey = `${Date.now()}-${file.name}`;
  const uploadParams = {
    Bucket: process.env.AMPLIFY_BUCKET,
    Key: uniqueKey,
    Body: file,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);

  return `https://${process.env.AMPLIFY_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;
}
