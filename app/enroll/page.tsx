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

  const steps = ["개인/단체 선택", "신청", "확인", "완료"];
  const currentStep=
    step==="apply"?0:
    step==="personal"||step==="group"?1:
    step==="complete"?2:3;

  const goStep=(idx:number)=>{

    if(idx>currentStep) return;

    if(idx===0) setStep("apply");

    if(idx===1)
      setStep(type);

    if(idx===2)
      setStep("complete");

    if(idx===3)
      setStep("done");
  };

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

        <div className="flex gap-3 mb-6">
          {steps.map((label, idx) => (
            <button
              key={label}
              onClick={()=>goStep(idx)}
              className={`flex items-center gap-2
                ${idx>currentStep
                  ?"cursor-not-allowed opacity-50"
                  :"cursor-pointer"}
              `}
            >

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm
                ${currentStep >= idx ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {idx + 1}
              </div>

              <span
                className={currentStep === idx ? "text-blue-600 font-medium" : "text-gray-400"}
              >
                {label}
              </span>

              </button>
          ))}
        </div>

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
                className="flex-1 border border-blue-600 text-blue-600 rounded-xl"
              >
                단체 신청
              </button>

              <button
                onClick={()=>router.push("/")}
                className="flex-1 border rounded-xl"
              >
                프로그램 목록
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
          <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow border p-8">

              <h1 className="text-2xl font-bold mb-6 text-center">
                🎉 신청이 완료되었습니다
              </h1>

              <div className="space-y-3 text-gray-700">

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">신청 번호</span>
                  <span className="font-medium">{result?.enrollmentId}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">프로그램</span>
                  <span className="font-medium">{course.title}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">수강 가능일</span>
                  <span className="font-medium">
                    {course.startDate} ~ {course.endDate}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">이름</span>
                  <span className="font-medium">{formData.name}</span>
                </div>

                {type==="group"&&(
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">단체명</span>
                    <span className="font-medium">{formData.groupName}</span>
                  </div>
                )}

              </div>

              <button
                onClick={()=>router.push("/")}
                className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                홈으로 가기
              </button>

            </div>

          </div>
        )}

      </div>

    </main>
  )
}
