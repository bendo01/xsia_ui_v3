import type { Component } from "solid-js";
import { createSignal } from "solid-js";

const Loader: Component = () => {
  const [img_path] = createSignal(`/img/logo/${import.meta.env.VITE_INSTITUTION_CODE}/android-chrome-512x512.png`);
  return (
    <div class="absolute inset-0 flex justify-center items-center bg-white-100/70 dark:bg-black/70 z-20 h-full w-full ">
      <div class="animate-spin inline-block size-28 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading" />
      <img class="absolute size-12" src={img_path()} alt="logo" />
    </div>
  );
};

export default Loader;
