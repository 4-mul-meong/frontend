import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// 환경 변수 설정 체크 함수
function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const s3Client = new S3Client({
  region: getEnvVariable("AWS_REGION"),
  credentials: {
    accessKeyId: getEnvVariable("AWS_ACCESS_KEY_ID"),
    secretAccessKey: getEnvVariable("AWS_SECRET_ACCESS_KEY"),
  },
});

// POST 요청에서 필요한 데이터 구조
interface UploadRequestData {
  fileName: string;
  fileType: string;
  fileContent: string;
}

// DELETE 요청에서 필요한 데이터 구조
interface DeleteRequestData {
  fileUrl: string;
}

// POST 요청 - S3에 파일 업로드
export async function POST(req: NextRequest) {
  const data = (await req.json()) as UploadRequestData;

  const params = {
    Bucket: getEnvVariable("AWS_BUCKET_NAME"),
    Key: `original/feed${Date.now()}-${data.fileName}`,
    Body: Buffer.from(data.fileContent, "base64"),
    ContentType: data.fileType,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const imageUrl = `${getEnvVariable("AWS_BUCKET_URL")}/${params.Key}`;
  return NextResponse.json({ imageUrl });
}

// DELETE 요청 - S3에서 파일 삭제
export async function DELETE(req: NextRequest) {
  const data = (await req.json()) as DeleteRequestData;

  const params = {
    Bucket: getEnvVariable("AWS_BUCKET_NAME"),
    Key: data.fileUrl.replace(`${getEnvVariable("AWS_BUCKET_URL")}/`, ""),
  };

  await s3Client.send(new DeleteObjectCommand(params));
  return NextResponse.json({ message: "Successfully deleted" });
}
