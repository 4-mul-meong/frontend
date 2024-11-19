import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto"; //  추가된 부분: 고유한 파일 이름 생성을 위해 UUID 사용

//  추가된 환경 변수 검증: 필수 환경 변수가 설정되지 않았을 경우 서버 시작 시 에러 발생
if (
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_BUCKET_NAME ||
  !process.env.AWS_BUCKET_URL
) {
  throw new Error("Missing required AWS environment variables"); // 환경 변수 미설정 시 명확한 에러 메시지 제공
}

//  S3Client 인스턴스 생성: AWS SDK 초기화
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

//  POST 핸들러: 파일 업로드 처리
export async function POST(req: NextRequest) {
  try {
    // 요청에서 업로드할 파일 정보 파싱
    const { fileName, fileType, fileContent } = await req.json();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!, // 업로드 대상 S3 버킷
      Key: `review/${randomUUID()}-${fileName}`, //  추가된 부분: UUID를 활용한 고유 파일 키 생성
      Body: Buffer.from(fileContent, "base64"), // Base64 형식의 파일 데이터를 버퍼로 변환
      ContentType: fileType, // 파일 MIME 타입 설정
    };

    const command = new PutObjectCommand(params); // S3 업로드 명령 생성
    await s3Client.send(command); // S3로 업로드 실행

    // 업로드된 파일의 S3 URL 반환
    const imageUrl = `${process.env.AWS_BUCKET_URL}/${params.Key}`;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error uploading to S3:", error); // 에러 디버깅 메시지
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}

//  DELETE 핸들러: 파일 삭제 처리
export async function DELETE(req: NextRequest) {
  try {
    //  요청에서 삭제 대상 파일 URL 파싱
    const { fileUrl } = await req.json();
    const url = new URL(fileUrl); // URL 객체 생성
    const key = url.pathname.substring(1); //  추가된 부분: URL에서 S3 객체 키 추출

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!, // 삭제 대상 S3 버킷
      Key: key, // 삭제할 파일의 S3 객체 키
    };

    // S3 객체 삭제 명령 실행
    await s3Client.send(new DeleteObjectCommand(params));

    // 삭제 성공 메시지 반환
    return NextResponse.json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting from S3:", error); // 에러 디버깅 메시지
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 },
    );
  }
}
