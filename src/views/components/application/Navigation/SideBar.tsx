import { type Component, onMount, Show,For } from "solid-js";
import { createStore } from "solid-js/store";
import SideBarFooter from "./SideBarFooter";
import UserNavigation from "../Menu/UserNavigation";
import PublicNavigation from "../Menu/PublicNavigation";
import { isAuthenticated } from "../../../../lib/auth";
import { getStorageItem } from "../../../../lib/storage";
import { UserWithRole } from "../../../../models/auth/User";
import { A, useLocation } from "@solidjs/router";
import { Role } from "../../../../models/auth/Role";
import { ChangeUserRole } from "../../../../controllers/auth/User";
import { CurrentUser, initialUserWithRole } from "../../../../models/auth/User";



const SideBar: Component = () => {
  // fetch users roles and permissions
  let current_user_data = getStorageItem("current_user");
  let current_user = current_user_data ? (JSON.parse(current_user_data) as CurrentUser) : initialUserWithRole;
  let roles = getStorageItem("roles");
  let current_role = getStorageItem("current_user");
  let current = current_role ? (JSON.parse(current_role) as UserWithRole) : null;
  let user_roles = roles ? (JSON.parse(roles) as Role[]) : [];
  const [currentUser, setCurrentUser] = createStore<UserWithRole>(current || initialUserWithRole);

  const changeUserRole = async (role_id: string) => {
    await ChangeUserRole(role_id);
    current_user_data = getStorageItem("current_user");
    current = current_user_data ? (JSON.parse(current_user_data) as UserWithRole) : initialUserWithRole;
    setCurrentUser(current);
  };

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
          <a class="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white " href="#" aria-label="Brand">{currentUser?.role?.name}</a>
          <div class="lg:hidden -me-2">
            <button type="button" class="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:text-neutral-200" data-hs-overlay="#hs-offcanvas-right">
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </header>
        <Show when={isAuthenticated()} fallback={<PublicNavigation />}>
          <nav class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div class="hs-accordion-group pb-0 px-2  w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
              <ul class="space-y-1">
                <li>
                  <A
                    class="flex items-center gap-x-3 py-2 px-2.5 text-sm text-neutral-700 rounded-none hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                    href="/dashboard"
                  >
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                    Halaman Depan
                  </A>
                </li>
                <li class="hs-accordion" id="current-role-accordion">
                    <button type="button" class="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-neutral-700 rounded-none hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="current-role-accordion-sub-1-collapse-1">
                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-id-card"><path d="M16 10h2" /><path d="M16 14h2" /><path d="M6.17 15a3 3 0 0 1 5.66 0" /><circle cx="9" cy="11" r="2" /><rect x="2" y="5" width="20" height="14" rx="2" /></svg>
                      Peran
                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                      <svg class="hs-accordion-active:block ms-auto hidden size-4 text-neutral-600 group-hover:text-neutral-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                      <svg class="hs-accordion-active:hidden ms-auto block size-4 text-neutral-600 group-hover:text-neutral-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
                    <div id="current-role-accordion-sub-1-collapse-1" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden" role="region" aria-labelledby="literate-accordion">
                      <ul class="pt-1 ps-7 space-y-1">
                        <For each={user_roles}>
                          {(item, index) =>
                            // rendering logic for each element
                            <li>
                              {/* biome-ignore lint/style/noUnusedTemplateLiteral: <explanation> */}
                              <button
                                type="button" class="w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-neutral-700 rounded-none hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                                onClick={() => changeUserRole(item.id)}>
                                {item.name}
                              </button>
                            </li>
                          }
                        </For>
                      </ul>
                    </div>
                  </li>
                {/* Render user navigation based on roles and permissions */}
                
                {/* end */}
              </ul>
            </div>
          </nav>
          <SideBarFooter />
        </Show>
      </div>
    </div>
  );
};

export default SideBar;
