export async function withSafeService<T>(
  callback: () => Promise<T>
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const result = await callback()
    return { data: result, error: null }
  } catch (err: any) {
    const error = err instanceof Error ? err : new Error(String(err))
    return { data: null, error }
  }
}