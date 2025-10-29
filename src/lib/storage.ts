import { createSignal } from "solid-js";

export function getStorageItem(key: string): string | null {
  return localStorage.getItem(key);
}

export function setStorageItem(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(key);
}

export function isKeyExists(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

export const [theme, setTheme] = createSignal<"light" | "dark">("light");

export function setThemeWithApply(newTheme: "light" | "dark") {
  setTheme(newTheme);
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }
}
