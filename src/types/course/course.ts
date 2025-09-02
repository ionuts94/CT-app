import { COURSE_COLOR_THEME } from "@/constants/colors"
import { Course, Module, Testimonial, UserCourseProgress, UserCourseSuggestion } from "@prisma/client"
import { T_Module } from "./module"

export type T_CourseWithModules = Course & {
  modules: Module[],
  theme: T_CourseTheme,
}

export type T_CourseDetails = T_CourseWithModules & {
  testimonials: Testimonial[]
}

export type T_CompletionStats = {
  percentage_complete: number;
  status: CourseStatus;
}

export type T_StudentTestimonial = {
  quote: string,
  author: string,
}

export type T_CourseWithProgressAndModules = Course & {
  theme: T_CourseTheme,
  progress: UserCourseProgress | undefined,
  modules: T_Module[],
  testimonials: Testimonial[],
}

export type T_SuggestedCourse = UserCourseSuggestion & {
  course: T_CourseWithProgressAndModules
}

export type T_CourseTheme = keyof typeof COURSE_COLOR_THEME

export type T_UserCourseDetails = T_CourseDetails & {
  id: string,
  course_id?: string,
}

export enum CourseStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}