import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Cookies, {CookieAttributes} from "js-cookie";

type SetValue<T> = Dispatch<SetStateAction<T>>;
interface Options {

}

export default function useCookie<T>(
  key: string,
  initialValue: T,
  options?: CookieAttributes,
): [T, SetValue<T>] {
  // Get from local cookie
  const readValue = (): T => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === "undefined") {
      return initialValue;
    }

    const value = Cookies.get(key);
    return (value as unknown as T) || initialValue;
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = (value: any) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window == "undefined") {
      console.warn(
        `Tried setting cookie key “${key}” even though environment is not a client`
      );
    }

    // Allow value to be a function so we have the same API as useState
    const newValue = value instanceof Function ? value(storedValue) : value;

    // Save to local storage
    Cookies.set(key, newValue, options);
    setStoredValue(newValue);
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  return [storedValue, setValue];
}
