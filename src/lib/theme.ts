import { createSignal } from "solid-js";

const stored = localStorage.getItem("hs_theme") as "light" | "dark" | null;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// normal signal
export const [theme, _setTheme] = createSignal<"light" | "dark">(
    stored ?? (prefersDark ? "dark" : "light")
);

function applyTheme(t: "light" | "dark") {
    document.documentElement.classList.toggle("dark", t === "dark");
    localStorage.setItem("hs_theme", t);
}

// run once at startup
applyTheme(theme());

// exported setter that applies theme + syncs storage
export function setThemeWithApply(t: "light" | "dark") {
    _setTheme(t);
    applyTheme(t);
}
