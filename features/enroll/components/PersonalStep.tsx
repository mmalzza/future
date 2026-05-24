"use client";

import { useState } from "react";

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

  const [errors, setErrors] = useState<any>({});

  const submit=async()=>{
    const newErrors: any = {};

    if(form.name.length<2||form.name.length>20)
      newErrors.name = "이름은 2~20자여야 합니다";

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "이메일 형식이 올바르지 않습니다";

    if(!/^01[016789]\d{7,8}$/.test(form.phone))
      newErrors.phone = "전화번호 형식이 올바르지 않습니다";

    if(form.motivation.length>300)
      newErrors.motivation = "수강동기는 300자 이하여야 합니다";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

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

        <div>
          <input
            placeholder="이름"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg p-3"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            placeholder="이메일"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-lg p-3"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            placeholder="전화번호"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full border rounded-lg p-3"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="수강 동기 (선택)"
            value={form.motivation}
            onChange={e =>
              setForm({ ...form, motivation: e.target.value })
            }
            className="w-full border rounded-lg p-3 h-32"
          />
          {errors.motivation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.motivation}
            </p>
          )}
        </div>

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