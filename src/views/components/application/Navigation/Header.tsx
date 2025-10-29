import type { Component } from "solid-js";
// import logo from '../../assets/android-chrome-512x512.png';
import SideBar from "./SideBar";
import SideBarButton from "./SideBarButton";
import ThemeButton from "./ThemeButton";
import Notification from "./Notification";
import { createSignal } from "solid-js";

const Header: Component = () => {
    const [img_path] = createSignal(`/img/logo/${import.meta.env.VITE_INSTITUTION_CODE}/android-chrome-512x512.png`);
    const [app_name] = createSignal(import.meta.env.VITE_APP_NAME);
    return (
        <>
            <header class="sticky backdrop-blur-sm bg-neutral-50 dark:bg-neutral-900 bg-opacity-90 shadow top-0 z-20">
                <div class="flex items-center justify-between p-2 mx-auto text-gray-600 dark:text-gray-400">
                    <div class="inline-flex items-center">
                        <img
                            class="h-8 w-8"
                            src={img_path()}
                            alt="logo"
                        />
                        <span class="ml-3 text-gray-700 dark:text-gray-300">{app_name()}</span>
                    </div>
                    <div class="inline-flex items-center">
                        <ThemeButton />
                        <SideBarButton />
                    </div>
                </div>
            </header>
            <SideBar />
        </>
    );
}

export default Header;