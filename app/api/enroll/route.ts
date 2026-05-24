export async function POST(req: Request) {
  const body = await req.json();

  // 가짜 검증
  if (!body.applicant?.name) {
    return Response.json(
      { message: "이름 없음" },
      { status: 400 }
    );
  }

  // 성공 응답
  return Response.json({
    enrollmentId: Math.random().toString(36).slice(2),
    status: "confirmed",
    enrolledAt: new Date().toISOString(),
  });
}