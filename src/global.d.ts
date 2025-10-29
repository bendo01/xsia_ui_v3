import type noUiSlider from "nouislider";
import type { IStaticMethods } from "preline/dist";

declare global {
  interface Window {
    // Optional third-party libraries
    _: typeof import("lodash");
    $: typeof import("jquery");
    jQuery: typeof import("jquery");
    DataTable: typeof $.fn.dataTable;
    Dropzone: typeof import("dropzone");
    noUiSlider: typeof noUiSlider;
    VanillaCalendarPro: typeof import("vanilla-calendar-pro");

    // Preline UI
    HSStaticMethods: IStaticMethods;
  }
}

export {};