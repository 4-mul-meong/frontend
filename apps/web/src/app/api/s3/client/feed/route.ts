import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

if (
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY
) {
  throw new Error('Missing required AWS environment variables');
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// POST 요청을 처리하는 함수
export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType, fileContent } = await req.json();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `review/${Date.now()}-${fileName}`,
      Body: Buffer.from(fileContent, 'base64'),
      ContentType: fileType,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const imageUrl = `${process.env.AWS_BUCKET_URL}/${params.Key}`;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// DELETE 요청을 처리하는 함수
export async function DELETE(req: NextRequest) {
  try {
    const { fileUrl } = await req.json();
    console.log('key', fileUrl);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileUrl.replace(`${process.env.AWS_BUCKET_URL}`, ''),
    };

    // S3 객체 삭제
    await s3Client.send(new DeleteObjectCommand(params));

    return NextResponse.json({ message: 'Successfully deleted' });
  } catch (error) {
    console.error('Error deleting from S3:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
