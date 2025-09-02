export type CustomApiResponse<T = any> = {
  status: Status.SUCCESS,
  data: T,
  error?: null
} | {
  status: Status.FAILED,
  error: string,
  data?: undefined
}

export enum Status {
  SUCCESS = 'success',
  FAILED = 'failed'
}