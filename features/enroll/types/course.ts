export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  maxCapacity: number;
  currentEnrollment: number;
  startDate: string;
  endDate: string;
  instructor: string;
}

export interface CourseListResponse {
  courses: Course[];
  categories: string[];
}

export interface PersonalEnrollmentRequest {
  courseId: string;
  type: "personal";

  applicant:{
    name:string;
    email:string;
    phone:string;
    motivation?:string;
  };

  agreedToTerms:boolean;
}

// 단체 신청
interface GroupEnrollmentRequest {
  courseId: string;
  type: "group";
  applicant: {
    name: string;
    email: string;
    phone: string;
    motivation?: string;
  };
  group: {
    organizationName: string;
    headCount: number;
    participants: Array<{ name: string; email: string }>;
    contactPerson: string;
  };
  agreedToTerms: boolean;
}

interface EnrollmentResponse {
  enrollmentId: string;
  status: "confirmed" | "pending";
  enrolledAt: string;
}
