"use client";

import { useState } from "react";
import { useSearchParams, useRouter,} from "next/navigation";

import {mockCourses} from "@/features/enroll/mocks/courses";

import PersonalStep from "@/features/enroll/components/PersonalStep";
import GroupStep from "@/features/enroll/components/GroupStep";
import CompleteStep from "@/features/enroll/components/CompleteStep";

export default function Page() {

  const router=useRouter();
  const params=useSearchParams();

  const courseId=params.get("courseId"); // URL에서 courseId 추출

  const [formData,setFormData]=useState({
    name:"",
    email:"",
    phone:"",
    motivation:"",
    groupName:"",
    count:"",
    participants:"",
    managerPhone:"",
  });

  const [result,setResult]=useState<any>(null);

  const [step,setStep]=useState<
    "apply"|"personal"|"group"|"complete"|"done"
  >("apply");

  const [type,setType]=useState<
    "personal"|"group"
  >("personal");

  const course=
    mockCourses.courses.find(
      c=>c.id===courseId
    );

  if(!course)
    return <div>강의 없음</div>;

  return(
    <main className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-4xl mx-auto">

        {step==="apply"&&(

          <div className="bg-white rounded-2xl shadow border p-8">

            <h1 className="text-3xl font-bold mb-6"> 프로그램 신청 </h1>

            <span className="text-blue-600 font-medium">
              {course.category}
            </span>

            <h2 className="text-2xl font-bold mt-2">
              {course.title}
            </h2>

            <p className="text-gray-500 mt-3">
              {course.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-8">

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">강사</p>
                <strong>{course.instructor}</strong>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">수강 기간</p>
                <strong>
                  {course.startDate} ~ {course.endDate}
                </strong>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">모집 인원</p>
                <strong>
                  {course.currentEnrollment}/{course.maxCapacity}명
                </strong>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">가격</p>
                <strong className="text-blue-600">
                  ₩{course.price.toLocaleString()}
                </strong>
              </div>

            </div>

            <div className="flex gap-4 mt-8">

              <button
                onClick={()=>{
                  setType("personal");
                  setStep("personal");
                }}
                className="flex-1 bg-blue-500 text-white p-4 rounded-xl"
              >
                개인 신청
              </button>

              <button
                onClick={()=>{
                  setType("group");
                  setStep("group");
                }}
                className="flex-1 border rounded-xl"
              >
                단체 신청
              </button>

            </div>

          </div>

        )}

        {step==="personal"&&(

          <PersonalStep
            courseId={course.id}
            title={course.title}
            price={course.price}
            form={formData}
            setForm={setFormData}
            onNext={()=> setStep("complete")}
          />

        )}
        
        {step==="group"&&(

          <GroupStep
            courseId={course.id}
            title={course.title}
            price={course.price}
            form={formData}
            setForm={setFormData}
            onNext={()=> setStep("complete")}
          />

        )}

        

        {step==="complete"&&(

          <CompleteStep
            type={type}
            course={course}
            form={formData}
            onEditCourse={()=>router.push("/")}
            onEditInfo={(t)=>setStep(t)}
            onSuccess={(data)=>{
              setResult(data);
              setStep("done");
            }}
          />

        )}

        {step==="done"&&(
          <div className="bg-white p-8 rounded-2xl shadow border">

            <h1 className="text-2xl font-bold mb-6">
              신청 완료
            </h1>

            <p>신청 번호: {result?.enrollmentId}</p>
            <p>강의: {course.title}</p>
            <p>이름: {formData.name}</p>

            {type==="group"&&(
              <p>단체명: {formData.groupName}</p>
            )}

            <button
              onClick={()=>router.push("/")}
              className="mt-4 bg-blue-600 text-white p-3 rounded-xl"
            >
              홈으로 가기
            </button>

          </div>
        )}

      </div>

    </main>
  )
}
