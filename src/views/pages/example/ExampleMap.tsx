import { onMount, createSignal, onCleanup } from "solid-js";
import { A } from "@solidjs/router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function ExampleMap() {
  const [img_path] = createSignal(
    `/img/logo/${import.meta.env.VITE_INSTITUTION_CODE}/android-chrome-512x512.png`,
  );
  const [app_name] = createSignal(import.meta.env.VITE_APP_NAME);
  const [classRegisterProperties, setClassRegisterProperties] = createSignal(
    "bg-green-600 text-white hover:bg-green-700 focus:bg-green-700",
  );
  const [classLoginProperties, setClassLoginProperties] = createSignal(
    "dark:text-green-400 dark:hover:bg-green-900 dark:focus:bg-green-900 bg-green-100 text-green-800 hover:bg-green-200 focus:bg-green-200",
  );

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
        .bindPopup("<b>UMKM A</b><br>Deskripsi UMKM A");

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

  return (
    <div class="flex flex-col min-h-screen">
      <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800 sticky top-0 z-20">
        <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <div class="flex items-center justify-between">
            <a
              class="flex-none text-xl font-semibold dark:text-white focus:outline-hidden focus:opacity-80"
              href="/"
              aria-label="Brand"
            >
              <span class="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white">
                <img src={img_path()} alt="logo" class="w-7 h-7" />
                {app_name()}
              </span>
            </a>
            <div class="sm:hidden">
              <button
                type="button"
                class="hs-collapse-toggle relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                id="hs-navbar-example-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-example"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-example"
              >
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  class="hs-collapse-open:hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  class="hs-collapse-open:block hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span class="sr-only">Toggle navigation</span>
              </button>
            </div>
          </div>
          <div
            id="hs-navbar-example"
            class="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
            aria-labelledby="hs-navbar-example-collapse"
          >
            <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <A
                class={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-transparent focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none ${classLoginProperties()}`}
                href="/login"
              >
                Masuk
              </A>
            </div>
          </div>
        </nav>
      </header>
      <div class="flex-grow flex flex-col">
        <div class="flex-1 w-full">
          <div
            id="map"
            ref={mapContainer}
            class="w-full h-full"
            style={{
              height: mapHeight(),
              "min-height": mapHeight(),
              width: "100%",
            }}
          />
        </div>
      </div>
      <footer class="bg-[#011750] text-white text-center py-4">
        <p>&copy; 2025 BLEP All rights reserved.</p>
      </footer>
    </div>
  );
}
