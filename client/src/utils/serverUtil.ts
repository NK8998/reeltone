import { URLSearchParams } from "url";

export function parseURLParams(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  return new URLSearchParams(
    Object.entries(searchParams).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => acc.append(key, v));
      } else if (value !== undefined) {
        acc.append(key, value);
      }
      return acc;
    }, new URLSearchParams())
  ).toString();
}
