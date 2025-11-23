import { useRouter } from "next/navigation";
import { useState } from "react";

export const useQueryParam = () => {
  const [currentQueryParam, setCurrentQueryParam] = useState<URLSearchParams | null>(null)
  const router = useRouter()

  const addQueryParam = (key: string, value: string) => {
    // Get current URL's search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Add or update the query parameter
    searchParams.set(key, value);
    setCurrentQueryParam(searchParams)
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newUrl)
    return newUrl
  };

  const deleteQueryParam = (key: string) => {
    // Get current URL's search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Delete the query parameter
    searchParams.delete(key)
    setCurrentQueryParam(null)
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newUrl)
    return newUrl
  };

  return {
    currentQueryParam,
    addQueryParam,
    deleteQueryParam,
  }
}