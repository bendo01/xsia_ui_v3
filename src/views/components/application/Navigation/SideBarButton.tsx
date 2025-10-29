import type { Component } from "solid-js";

const SideBarButton: Component = () => {
    return (
        <button
            type="button"
            class="m-1 ms-0 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-none text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:pointer-events-none"
            aria-controls="hs-offcanvas-right"
            data-hs-overlay="#hs-offcanvas-right"
        >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.25"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-menu"
            >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
        </button>
    );
}

export default SideBarButton;