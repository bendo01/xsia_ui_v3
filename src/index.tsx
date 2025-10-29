/* @refresh reload */
import "solid-devtools";
import { render } from "solid-js/web";
import "./index.css";
import App from "./App";

// Optional third-party libraries
import $ from "jquery";
import _ from "lodash";
import noUiSlider from "nouislider";
import "datatables.net";
import "dropzone/dist/dropzone-min.js";
import * as VanillaCalendarPro from "vanilla-calendar-pro";

window._ = _;
window.$ = $;
window.jQuery = $;
window.DataTable = $.fn.dataTable;
window.noUiSlider = noUiSlider;
window.VanillaCalendarPro = VanillaCalendarPro;

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

// Preline UI
import("preline/dist").then(() => {
  render(() => <App />, root!);
});
