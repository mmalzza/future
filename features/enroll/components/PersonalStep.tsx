"use client";

import {PersonalEnrollmentRequest} from "@/features/enroll/types/course";

type Props={
  courseId:string;
  title:string;
  price:number;
  form:any;
  setForm:(v:any)=>void;
  onNext:()=>void;
};

export default function PersonalStep({
  courseId,
  title,
  price,
  form,
  setForm,
  onNext
}:Props){

  const submit=async()=>{

    if(form.name.length<2||form.name.length>20)
      return alert("이름 2~20자");

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return alert("이메일 형식 오류");

    if(!/^01[016789]\d{7,8}$/.test(form.phone))
      return alert("전화번호 형식 오류");

    if(form.motivation.length>300)
      return alert("수강동기 300자 이하");

    const payload:PersonalEnrollmentRequest={

      courseId,

      type:"personal",

      applicant:{
        name:form.name,
        email:form.email,
        phone:form.phone,
        motivation:form.motivation
      },

      agreedToTerms:false
    };

    onNext();
  };

  return(
    <div className="bg-white rounded-2xl shadow border p-8">

      <h1 className="text-2xl font-bold mb-6">
        개인 신청
      </h1>

      <div className="bg-slate-50 rounded-xl p-5 mb-8">

        <h2 className="font-bold text-lg">
          {title}
        </h2>

        <p className="text-blue-600 font-bold mt-2">
          ₩{price.toLocaleString()}
        </p>

      </div>

      <div className="space-y-4">

        <input
          placeholder="이름"
          value={form.name}
          onChange={e=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          placeholder="이메일"
          value={form.email}
          onChange={e=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          placeholder="전화번호 (- 없이 숫자만)"
          value={form.phone}
          onChange={e=>
            setForm({
              ...form,
              phone:e.target.value
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <textarea
          placeholder="수강 동기 (선택/300자 이내)"
          value={form.motivation}
          onChange={e=>
            setForm({
              ...form,
              motivation:e.target.value
            })
          }
          className="w-full border rounded-lg p-3 h-32"
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white p-4 rounded-xl"
        >
          신청
        </button>

      </div>

    </div>
  );
}