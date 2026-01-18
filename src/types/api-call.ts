export type CustomApiResponse<T = any> = {
  status: Status.SUCCESS,
  data: T,
  error?: null
} | {
  status: Status.ACTION_REQUIRED,
  data: T,
  error?: null
} | {
  status: Status.FAILED,
  error: string,
  data?: undefined
}

export enum Status {
  SUCCESS = 'success',
  FAILED = 'failed',
  ACTION_REQUIRED = "action_required"
}