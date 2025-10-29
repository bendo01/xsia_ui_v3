import type { Component } from "solid-js";
import toast from "solid-toast";

interface ToastProps {
  message: string;
  toast_id: string;
}

const ToastInfo: Component<ToastProps> = (props) => {
  return (
    <div class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 flex items-center w-full max-w-xs p-4 text-neutral-500 bg-white rounded-none shadow-sm dark:text-neutral-400 dark:bg-neutral-900" role="alert">
      <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-800 dark:text-blue-200">
        <svg class="w-5 h-5 shrink-0 size-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">{props.message}</div>
      <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-neutral-400 hover:text-neutral-900 rounded-full focus:ring-2 focus:ring-neutral-300 p-1.5 hover:bg-neutral-100 inline-flex items-center justify-center h-8 w-8 dark:text-neutral-500 dark:hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700" aria-label="Close" onClick={() => toast.dismiss(props.toast_id)}>
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  );
};

export default ToastInfo;
