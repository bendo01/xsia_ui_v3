import type { Component } from "solid-js";
import { A, useLocation } from "@solidjs/router";

const RectoratNavigation: Component = () => {
    const location = useLocation();
    const active = (path: string) => (path === location.pathname ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200" : "dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300");
    return (
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
                    <li class="hs-accordion" id="location-accordion">
                        <button type="button" class="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-neutral-700 rounded-none hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="location-accordion-sub-1-collapse-1">
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pinned-icon lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" /><circle cx="12" cy="8" r="2" /><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" /></svg>
                            Lokasi
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
                        <div id="location-accordion-sub-1-collapse-1" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden" role="region" aria-labelledby="location-accordion">
                            <ul class="pt-1 ps-7 space-y-1">
                                <li>
                                    <a href="/location/regency" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Kabupaten/Kota
                                    </a>
                                </li>
                                <li>
                                    <a href="/location/sub_district" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Kecamatan
                                    </a>
                                </li>
                                <li>
                                    <a href="/location/village" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Desa/Kelurahan
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="hs-accordion" id="person-accordion">
                        <button type="button" class="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-neutral-700 rounded-none hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="person-accordion-sub-1-collapse-1">
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-person-standing-icon lucide-person-standing"><circle cx="12" cy="5" r="1" /><path d="m9 20 3-6 3 6" /><path d="m6 8 6 2 6-2" /><path d="M12 10v4" /></svg>
                            Individual
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
                        <div id="person-accordion-sub-1-collapse-1" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden" role="region" aria-labelledby="person-accordion">
                            <ul class="pt-1 ps-7 space-y-1">
                                <li>
                                    <a href="/person/master/individual" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Daftar Individual
                                    </a>
                                </li>
                                <li>
                                    <a href="/person/reference/gender" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Referensi Jenis Kelamin
                                    </a>
                                </li>
                                <li>
                                    <a href="/person/reference/identification_type" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Referensi Jenis Identifikasi
                                    </a>
                                </li>
                                <li>
                                    <a href="/person/reference/marital_status" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Referensi Status Pernikahan
                                    </a>
                                </li>
                                <li>
                                    <a href="/person/reference/occupation" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Referensi Pekerjaan
                                    </a>
                                </li>
                                <li>
                                    <a href="/person/reference/religion" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Referensi Agama
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="hs-accordion" id="institution-accordion">
                        <button type="button" class="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-2.5 text-sm text-neutral-700 rounded-none hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="institution-accordion-sub-1-collapse-1">
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store-icon lucide-store"><path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" /><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" /><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" /></svg>
                            UMKM
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
                        <div id="institution-accordion-sub-1-collapse-1" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden" role="region" aria-labelledby="institution-accordion">
                            <ul class="pt-1 ps-7 space-y-1">
                                <li>
                                    <a href="institution/master/institution" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Daftar UMKM
                                    </a>
                                </li>
                                <li>
                                    <a href="/institution/reference/variety" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Referensi Jenis UMKM
                                    </a>
                                </li>
                                <li>
                                    <a href="/institution/reference/category" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-none hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200">
                                        Referensi Kategori UMKM
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default RectoratNavigation;
