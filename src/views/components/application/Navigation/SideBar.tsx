import { type Component, onMount, Show } from "solid-js";
import SideBarFooter from "./SideBarFooter";
import UserNavigation from "../Menu/UserNavigation";
import PublicNavigation from "../Menu/PublicNavigation";
import { isAuthenticated } from "../../../../lib/auth";
import { getStorageItem } from "../../../../lib/storage";
import { UserWithRole } from "../../../../models/auth/User";

const SideBar: Component = () => {
  // fetch users roles and permissions

  const roles = getStorageItem("roles");
  const user_roles = roles ? (JSON.parse(roles) as UserWithRole[]) : [];
  

  onMount(async () => {

  });

  return (
    <div id="hs-offcanvas-right" class="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-xs w-full z-[80] bg-white border-s dark:bg-neutral-800 dark:border-neutral-700"
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="dialog"
      tabindex="-1"
      aria-label="Sidebar"
    >
      <div class="relative flex flex-col h-full max-h-full">
        
        <header class=" p-4 flex justify-between items-center gap-x-2">
          <a class="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white " href="#" aria-label="Brand">UMKM</a>
          <div class="lg:hidden -me-2">
            <button type="button" class="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:text-neutral-200" data-hs-overlay="#hs-offcanvas-right">
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </header>
        <Show when={isAuthenticated()} fallback={<PublicNavigation/>}>
          <UserNavigation />
          <SideBarFooter />
        </Show>
        
      </div>
    </div>
  );
};

export default SideBar;
