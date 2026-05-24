import { mockCourses } from "@/features/enroll/mocks/courses";

const enrollments:any[]=[];

export async function POST(req:Request){

  const body=await req.json();

  if(!body.applicant?.name){
    return Response.json(
      {
        code:"INVALID_INPUT",
        message:"입력값이 올바르지 않습니다",
        details:{
          name:"이름은 필수입니다"
        }
      },
      {status:400}
    );
  }

  if(!body.applicant?.email){
    return Response.json(
      {
        code:"INVALID_INPUT",
        message:"입력값이 올바르지 않습니다",
        details:{
          email:"이메일은 필수입니다"
        }
      },
      {status:400}
    );
  }

  const course=mockCourses.courses.find(
    c=>c.id===body.courseId
  );

  if(!course){
    return Response.json(
      {
        code:"INVALID_INPUT",
        message:"존재하지 않는 강의입니다."
      },
      {status:404}
    );
  }

  if(course.currentEnrollment>=course.maxCapacity){
    return Response.json(
      {
        code:"COURSE_FULL",
        message:"정원이 초과되었습니다."
      },
      {status:400}
    );
  }

  const duplicated=enrollments.find(
    e=>
      e.courseId===body.courseId &&
      e.email===body.applicant.email
  );

  if(duplicated){
    return Response.json(
      {
        code:"DUPLICATE_ENROLLMENT",
        message:"이미 신청된 강의입니다."
      },
      {status:400}
    );
  }

  enrollments.push({
    courseId:body.courseId,
    email:body.applicant.email
  });

  return Response.json({
    enrollmentId:Math.random().toString(36).slice(2),
    status:"confirmed",
    enrolledAt:new Date().toISOString()
  });

}