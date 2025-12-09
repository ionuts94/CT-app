export type ApiResponse<T> = {
  status: "SUCCESS" | "FAILED";
  data?: T;
  error?: string;
};

async function parseApiResponse<T>(res: Response): Promise<ApiResponse<T>> {
  try {
    const json = await res.json();
    return json as ApiResponse<T>;
  } catch (err: any) {
    return {
      status: "FAILED",
      error: `Invalid JSON response (${res.status})`,
    };
  }
}

export async function httpGet<T = any>(
  path: string,
  params?: Record<string, any>
): Promise<ApiResponse<T>> {
  try {
    const query = params ? `?${new URLSearchParams(params)}` : "";

    const res = await fetch(`${path}${query}`, {
      method: "GET",
      credentials: "include",
    });

    return parseApiResponse<T>(res);
  } catch (err: any) {
    return {
      status: "FAILED",
      error: err.message || "Unexpected client error",
    };
  }
}

export async function httpPost<T = any>(
  path: string,
  body?: Record<string, any>
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(path, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body ?? {}),
    });

    return parseApiResponse<T>(res);
  } catch (err: any) {
    return {
      status: "FAILED",
      error: err.message || "Unexpected client error",
    };
  }
}
