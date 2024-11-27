import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

// 환경 변수 검증
if (
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_BUCKET_NAME ||
  !process.env.AWS_BUCKET_URL
) {
  throw new Error("Missing required AWS environment variables");
}

// S3Client 인스턴스 생성
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// POST 핸들러: 파일 업로드 처리`
export async function POST(req: NextRequest) {
  try {
    // 요청에서 업로드할 파일 정보 파싱
    const { fileName, fileType, fileContent } = await req.json();

    // 파일 확장자 추출
    const extension = fileName.split(".").pop();

    // 파일 유형에 따라 디렉토리 경로 설정
    const directory = fileType.startsWith("image/")
      ? "image"
      : "video/processed";

    // 객체 키 생성 (디렉토리 포함, UUID + 확장자)
    const key = `${directory}/${randomUUID()}.${extension}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!, // 업로드 대상 S3 버킷
      Key: key, // 고유 키
      Body: Buffer.from(fileContent, "base64"), // Base64 형식의 파일 데이터를 버퍼로 변환
      ContentType: fileType, // 파일 MIME 타입 설정
    };

    // S3에 파일 업로드
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // 업로드된 파일의 S3 URL 생성
    const imageUrl = `${process.env.AWS_BUCKET_URL}/${key}`;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}

// DELETE 핸들러: 파일 삭제 처리
export async function DELETE(req: NextRequest) {
  try {
    // 요청에서 삭제 대상 파일 URL 파싱
    const { fileUrl } = await req.json();
    const url = new URL(fileUrl); // URL 객체 생성
    const key = url.pathname.substring(1); // URL에서 S3 객체 키 추출

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    };

    // S3 객체 삭제 명령 실행
    await s3Client.send(new DeleteObjectCommand(params));

    // 삭제 성공 메시지 반환
    return NextResponse.json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting from S3:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 },
    );
  }
}
