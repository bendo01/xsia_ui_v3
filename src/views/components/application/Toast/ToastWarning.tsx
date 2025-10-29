import type { Component } from "solid-js";
import toast from "solid-toast";

interface ToastProps {
    message: string;
    toast_id: string;
}

const ToastWarning: Component<ToastProps> = (props) => {
    return (
        <div class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 flex items-center w-full max-w-xs p-4 text-neutral-500 bg-white rounded-none shadow-sm dark:text-neutral-400 dark:bg-neutral-900" role="alert">
            <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-full dark:bg-orange-700 dark:text-orange-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
                <span class="sr-only">Warning icon</span>
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
}

export default ToastWarning;