import type { Component } from "solid-js";
import { createSignal } from "solid-js";

const ThemeSwitcher: Component = () => {
  const [current_year] = createSignal(new Date().getFullYear());
  return (
    <div class="fixed flex items-center justify-center bg-white rounded dark:bg-black z-[99999] shadow-1 dark:shadow-box-dark bottom-10 right-10 h-11 w-11">
        <button type="button" class="hs-dark-mode-active:hidden block hs-dark-mode font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" data-hs-theme-click-value="dark">
        <span class="group inline-flex shrink-0 justify-center items-center size-9">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
        </span>
        </button>
        <button type="button" class="hs-dark-mode-active:block hidden hs-dark-mode font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" data-hs-theme-click-value="light">
        <span class="group inline-flex shrink-0 justify-center items-center size-9">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
            </svg>
        </span>
        </button>
    </div>
  );
};

export default ThemeSwitcher;

