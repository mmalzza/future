import { CourseListResponse } from "../types/course";

export const mockCourses:CourseListResponse={

  categories:[ "IT", "디자인", "마케팅",],

  courses:[

    {
      id:"1",
      title:"java 기본",
      description:"java 입문 과정",
      category:"IT",
      price:30000,
      maxCapacity:600,
      currentEnrollment:120,
      startDate:"2026-06-01",
      endDate:"2026-12-31",
      instructor:"김영수",
    },

    {
      id:"2",
      title:"React 심화",
      description:"React 실전 과정",
      category:"IT",
      price:55000,
      maxCapacity:300,
      currentEnrollment:80,
      startDate:"2026-07-01",
      endDate:"2026-08-30",
      instructor:"김영철",
    },

    {
      id:"3",
      title:"포토샵 기본",
      description:"포토샵 입문 과정",
      category:"디자인",
      price:40000,
      maxCapacity:400,
      currentEnrollment:400,
      startDate:"2026-07-01",
      endDate:"무제한",
      instructor:"김영숙",
    },

    {
      id:"4",
      title:"마케팅 기본",
      description:"마케팅 입문 과정",
      category:"마케팅",
      price:50000,
      maxCapacity:300,
      currentEnrollment:80,
      startDate:"2026-06-01",
      endDate:"무제한",
      instructor:"김순자",
    },

  ],

};