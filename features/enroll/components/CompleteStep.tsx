"use client";

import {useState} from "react";

type Props={
  type:"personal"|"group";
  course:{
    id:string;
    title:string;
    instructor:string;
    price:number;
  };
  form:{
    name:string;
    email:string;
    phone:string;
    motivation?:string;
    groupName?:string;
    count?:string;
    participants?:string;
    managerPhone?:string;
  };
  onEditCourse:()=>void;
  onEditInfo:(type:"personal"|"group")=>void;
  onSuccess:(data:any)=>void;
};

export default function CompleteStep({
  type,
  course,
  form,
  onEditCourse,
  onEditInfo,
  onSuccess
}:Props){

  const [agreed,setAgreed]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit=async()=>{

    if(!agreed){
      alert("약관에 동의해주세요");
      return;
    }

    setLoading(true);
    setError("");

    try{

      const payload={
        courseId:course.id,
        type,
        applicant:{
          name:form.name,
          email:form.email,
          phone:form.phone,
          motivation:form.motivation
        },
        ...(type==="group"&&{
          group:{
            organizationName:form.groupName,
            headCount:Number(form.count),
            participants:form.participants,
            contactPerson:form.managerPhone
          }
        }),
        agreedToTerms:true
      };

      const res=await fetch("/api/enroll",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        switch (data.code) {
          case "INVALID_INPUT":
            setErrors?.(data.details); // 필드 에러 전달
            break;

          case "COURSE_FULL":
          case "DUPLICATE_ENROLLMENT":
            setError(data.message); // 전체 에러 메시지
            break;

          default:
            setError("알 수 없는 오류가 발생했습니다");
        }

        return;
      }

      onSuccess(data);

    }catch(e){
      setError("제출 실패했습니다. 다시 시도해주세요");
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="bg-white rounded-2xl shadow border p-8">

      <h1 className="text-2xl font-bold mb-6">
        신청 확인
      </h1>

      {/* 강의 정보 */}
      <div className="border rounded-xl p-4 mb-6">

        <div className="flex justify-between">

          <h2 className="font-bold">{course.title}</h2>

          <button
            onClick={onEditCourse}
            className="text-blue-600 text-sm"
          >
            수정
          </button>

        </div>

        <p className="text-gray-500 mt-2">
          {course.instructor}
        </p>

      </div>

      {/* 신청자 정보 */}
      <div className="border rounded-xl p-4 mb-6">

        <div className="flex justify-between">

          <h2 className="font-bold">수강생 정보</h2>

          <button
            onClick={()=>onEditInfo(type)}
            className="text-blue-600 text-sm"
          >
            수정
          </button>

        </div>

        <div className="mt-2 text-sm space-y-1">

          <p>이름: {form.name}</p>
          <p>이메일: {form.email}</p>
          <p>전화번호: {form.phone}</p>

          {form.motivation&&(
            <p>동기: {form.motivation}</p>
          )}

          {type==="group"&&(
            <>
              <p>단체명: {form.groupName}</p>
              <p>인원: {form.count}</p>
              <p>담당자: {form.managerPhone}</p>
            </>
          )}

        </div>

      </div>

      {/* 약관 */}
      <div className="text-sm mb-6">

        <p className="mb-3 text-gray-600">
          클래스에 필요한 최소 인원 미달 시 폐강되며 결제는 자동 취소됩니다.
          환불 규정을 따릅니다.
        </p>

        <label className="flex items-start gap-2">

          <input
            type="checkbox"
            checked={agreed}
            onChange={e=>setAgreed(e.target.checked)}
          />

          <span>
            위 내용을 모두 읽었으며 동의합니다.
          </span>

        </label>

      </div>

      {error&&(
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      {/* 버튼 */}
      <div className="flex gap-3">

        <button
          onClick={()=>history.back()}
          className="flex-1 border p-3 rounded-xl"
        >
          취소
        </button>

        <button
          onClick={submit}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white p-3 rounded-xl"
        >
          {loading?"처리중...":"제출"}
        </button>

      </div>

    </div>
  );
}