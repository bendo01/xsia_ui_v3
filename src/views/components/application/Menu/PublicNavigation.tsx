import type { Component } from "solid-js";
import { A, useLocation } from "@solidjs/router";

const PublicNavigation: Component = () => {
  const location = useLocation();
  const active = (path: string) => (path === location.pathname ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200" : "dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300");
  return (
    <nav class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <div class="hs-accordion-group pb-0 px-2  w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
        <ul class="space-y-1">
          <li>
            <A class={`flex items-center gap-x-3 py-2 px-2.5 text-sm text-neutral-700 rounded-none hover:bg-neutral-100 ${active("/dashboard")}`} href="/dashboard">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              Halaman Depan
            </A>
          </li>
          <li>
            <a href="/auth/login" class="flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in-icon lucide-log-in"><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></svg>
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PublicNavigation;
