export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  country?: string;
  age?: number | string;
  gender?: string;
  education_level?: string;
  japanese_level?: string;
  avatar_url?: string;
}

export interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  status: string;
  lessonsCount: string;
  badgeColor: string;
}

export interface SkillProgress {
  skill: string;
  progress: number;
}

export interface ScheduleItem {
  id: number;
  title: string;
  date: string;
  time: string;
  instructor: string;
  status: string;
  isLiveSoon: boolean;
}

export interface StudentDashboardData {
  currentLevel: string;
  overallProgress: number;
  completedLessons: number;
  totalLessons: number;
  attendanceRate: string;
  avgQuizScore: string;
  studyHours: string;
  enrolledLevels: EnrolledCourse[];
  skillsBreakdown: SkillProgress[];
  upcomingSchedule: ScheduleItem[];
}