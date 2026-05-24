"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockCourses } from "@/features/enroll/mocks/courses";

export default function Page() {
  const router = useRouter();
  const [category,setCategory]=useState("전체");
  const [search,setSearch]=useState("");


  // 제목/강사명 검색
  const filtered= mockCourses.courses.filter(course=>
    (category==="전체" || course.category===category) &&
    (course.title.includes(search) || course.instructor.includes(search)));

  return(
    <main className="min-h-screen bg-slate-50">

      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-5">

          <h1 className="text-2xl font-bold text-blue-600"> 온라인 교육 플랫폼 </h1>

          <div className="flex gap-3">
            <button className="font-medium">
              프로그램
            </button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              나의 강의실
            </button>
          </div>

        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-3xl font-bold mb-8">
          프로그램 목록
        </h2>

        <div className="flex flex-wrap gap-3 mb-6">

          {["전체",...mockCourses.categories].map(label=>(
            <button
              key={label}
              onClick={()=>setCategory(label)}
              className={`px-4 py-2 rounded-full border
                ${category===label
                ?"bg-blue-600 text-white"
                :"bg-white"}`}
            >
              {label}
            </button>
          ))}

        </div>

        <input
          placeholder="제목 / 강사명 검색"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          className="w-full border rounded-xl p-4 mb-8 bg-white"
        />

        <div className="grid md:grid-cols-2 gap-6">

          {filtered.map(course=>(

            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition"
            >

              <span className="text-sm text-blue-600 font-medium">
                {course.category}
              </span>

              <h3 className="text-2xl font-bold mt-2 mb-4">
                {course.title}
              </h3>

              <p className="text-gray-500 mb-4">
                {course.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600">

                <p> 👨‍🏫 {course.instructor} </p>

                <p> 📅 {course.startDate} ~ {course.endDate} </p>

                <p> 👥 {course.currentEnrollment}/{course.maxCapacity}명 </p>

              </div>

              <div className="flex justify-between items-center mt-6">

                <strong className="text-xl text-blue-600">
                  ₩{course.price.toLocaleString()}
                </strong>

                <div className="flex gap-2">

                  <button onClick={()=> router.push( `/enroll?courseId=${course.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"> 신청하기
                  </button>

                  <button className="border px-4 py-2 rounded-lg"> 관심 </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}