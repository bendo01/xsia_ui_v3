import { onMount, Show, For, Index, createSignal, onCleanup } from "solid-js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Header from "../../../../components/application/Navigation/Header";
import Footer from "../../../../components/application/Navigation/Footer";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import Pagination from "../../../../components/application/Navigation/Pagination";
import { isAuthenticated } from "../../../../../lib/auth";
import toast from "solid-toast";
import ToastError from "../../../../components/application/Toast/ToastError";
import ToastSuccess from "../../../../components/application/Toast/ToastSuccess";
import type {
    TypeAppInputEvent,
    TypeAppSelectEvent,
    TypePaginationForm,
    TypeInputEntityReferenceForm,
} from "../../../../../lib/types";

export default function InstitutionMasterInstutionShow() {
    let mapContainer: HTMLDivElement | undefined;
    const [mapInstance, setMapInstance] = createSignal<L.Map | null>(null);
    const [windowHeight, setWindowHeight] = createSignal(0);
    const [mapHeight, setMapHeight] = createSignal("500px");

    // Function to calculate map height based on window size
    const calculateMapHeight = () => {
        const height = window.innerHeight;
        setWindowHeight(height);

        // Calculate available height: window height - header height - footer height - padding
        // Assuming header ~60px, footer ~60px, padding ~32px (py-8 = 2rem = 32px)
        const availableHeight = height - 60 - 60 - 32;

        // Use at least 400px, but prefer calculated available height
        const mapHeightValue = Math.max(500, availableHeight);
        setMapHeight(`${mapHeightValue}px`);
    };

    // Handle window resize
    const handleResize = () => {
        calculateMapHeight();
        // Also invalidate map size when window resizes
        if (mapInstance()) {
            setTimeout(() => {
                mapInstance()!.invalidateSize();
            }, 100);
        }
    };

    onMount(() => {
        // Calculate initial map height
        calculateMapHeight();

        // Add resize event listener
        window.addEventListener("resize", handleResize);

        if (mapContainer) {
            console.log("Map container found:", mapContainer);

            // Membuat peta dengan Leaflet
            const map = L.map(mapContainer).setView([-6.1751, 106.865], 13); // Koordinat Jakarta

            // Menambahkan tile layer (peta dasar)
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // Menambahkan marker contoh
            L.marker([-6.1751, 106.865])
                .addTo(map)
                .bindPopup("<b>UMKM A</b><br>Deskripsi: UMKM A<br>Jenis: UMKM A<br>Kategori: Kategori A");

            // Pastikan map resize dengan benar
            setTimeout(() => {
                map.invalidateSize();
            }, 100);

            // Simpan instance map untuk cleanup
            setMapInstance(map);
        } else {
            console.log("Map container not found");
        }
    });

    // Bersihkan map saat komponen dibersihkan
    onCleanup(() => {
        // Remove resize event listener
        window.removeEventListener("resize", handleResize);

        if (mapInstance()) {
            mapInstance()!.remove();
            setMapInstance(null);
        }
    });
    {/* start action institution modal */ }
    {/* end action institution modal */ }
    return (
        <>
            <div class="flex flex-col min-h-screen">
                <Header />
                <div id="institution-content" class="flex-1 p-4">
                    {/* start data institution */}
                    <div class="flex items-center justify-between mx-auto">
                        <div class="inline-flex items-center">
                            <h2 class="text-xl">Institution</h2>
                        </div>
                        <div class="inline-flex items-center">
                            <button
                                type="button"
                                class="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-yellow-500 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            >
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                            </button>
                        </div>
                    </div>
                    <br />
                    <div class="hidden md:flex md:flex-col">
                        <table class="min-w-full divide-y divide-neutral-300 dark:divide-neutral-700">
                            <tbody class="divide-y divide-neutral-300 dark:divide-neutral-700">
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Name</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    {/* end data institution */}


                    {/* start data Address */}
                    <div class="flex items-center justify-between mx-auto">
                        <div class="inline-flex items-center">
                            <h2 class="text-xl">Alamat</h2>
                        </div>
                        <div class="inline-flex items-center">
                            <button
                                type="button"
                                class="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-yellow-500 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            >
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                            </button>
                        </div>
                    </div>
                    <br />
                    <div class="hidden md:flex md:flex-col">
                        <table class="min-w-full divide-y divide-neutral-300 dark:divide-neutral-700">
                            <tbody class="divide-y divide-neutral-300 dark:divide-neutral-700">
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Name</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div class="bg-neutral-100 dark:bg-neutral-900 h-[64rem] z-10">
                        <div id="map" ref={mapContainer} class="w-full h-full" />
                    </div>
                    {/* end data Address */}
                    <br />
                    {/* start data contact */}
                    <div class="flex items-center justify-between mx-auto">
                        <div class="inline-flex items-center">
                            <h2 class="text-xl">Kontak</h2>
                        </div>
                        <div class="inline-flex items-center">
                            <button
                                type="button"
                                class="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-yellow-500 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            >
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                            </button>
                        </div>
                    </div>
                    <br />
                    <div class="hidden md:flex md:flex-col">
                        <table class="min-w-full divide-y divide-neutral-300 dark:divide-neutral-700">
                            <tbody class="divide-y divide-neutral-300 dark:divide-neutral-700">
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Name</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    {/* end data contact */}

                    {/* start data employee */}
                    <div class="flex items-center justify-between mx-auto">
                        <div class="inline-flex items-center">
                            <h2 class="text-xl">Pegawai</h2>
                        </div>
                        <div class="inline-flex items-center">
                            <button
                                type="button"
                                class="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-teal-500 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            >
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            </button>
                        </div>
                    </div>
                    <br />
                    <div class="hidden md:flex md:flex-col">
                        <table class="min-w-full divide-y divide-neutral-300 dark:divide-neutral-700">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-start text-xs font-medium uppercase text-neutral-700 dark:text-neutral-300"
                                    >
                                        Kode Angka
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-start text-xs font-medium uppercase text-neutral-700 dark:text-neutral-300"
                                    >
                                        Kode Huruf
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-start text-xs font-medium uppercase text-neutral-700 dark:text-neutral-300"
                                    >
                                        Nama
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-end text-xs font-medium uppercase text-neutral-700 dark:text-neutral-300"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-neutral-300 dark:divide-neutral-700">
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                                        <div class="relative flex justify-end">
                                            <button
                                                type="button"
                                                class="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            >

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="lucide lucide-ellipsis-vertical"
                                                >
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                                        <div class="relative flex justify-end">
                                            <button
                                                type="button"
                                                class="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            >

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="lucide lucide-ellipsis-vertical"
                                                >
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                                        <div class="relative flex justify-end">
                                            <button
                                                type="button"
                                                class="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            >

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="lucide lucide-ellipsis-vertical"
                                                >
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                                        <div class="relative flex justify-end">
                                            <button
                                                type="button"
                                                class="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            >

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="lucide lucide-ellipsis-vertical"
                                                >
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">Institution Code</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                                        <div class="relative flex justify-end">
                                            <button
                                                type="button"
                                                class="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            >

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="lucide lucide-ellipsis-vertical"
                                                >
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    {/* end data employee */}

                </div>
            </div>
        </>
    );
}