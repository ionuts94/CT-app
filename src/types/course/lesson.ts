export type T_Lesson = {
  id: string,
  type: "read" | "audio" | "video"
  order: number,
  title: string,
  duration: string,
  moduleId: string,
  heading: string,
  description: string,
  url: string
}