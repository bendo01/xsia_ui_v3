import type { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { LogoutUser } from "../../../../controllers/auth/User";
import { isAuthenticated } from "../../../../controllers/auth/User";

const SideBarFooter: Component = () => {
  const navigate = useNavigate();
  const signOut = () => {
    if (LogoutUser()) {
      navigate("/");
    }
  };
  return (
    <footer class="mt-auto p-2 border-t border-gray-200 dark:border-neutral-700">
      <div class="hs-dropdown [--strategy:absolute] [--auto-close:inside] relative w-full inline-flex">
        <button type="button" id="hs-sidebar-footer-example-with-dropdown" class="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
          <img class="shrink-0 size-5 rounded-full" src="/img/common/avatar_default.png" alt="Avatar" />
          Name
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg class="shrink-0 size-3.5 ms-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
        </button>
        <div class="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-sidebar-footer-example-with-dropdown">
          <div class="p-1">
            <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="/">
              Settings
            </a>
            <button
              type="button"
              class="w-full flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              onclick={signOut}
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SideBarFooter;
