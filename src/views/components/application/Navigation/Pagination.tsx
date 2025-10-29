import { createMemo, type Component } from "solid-js";

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: Component<PaginationProps> = (props) => {
    const pages = createMemo(() => {
        const pageNumbers: (number | string)[] = [];
        const range = 3; // Number of visible pages around the current page
        const currentPage = props.currentPage; // Ensure reactivity
        const lastPage = props.lastPage; // Ensure reactivity

        if (lastPage <= 5) {
            for (let i = 1; i <= lastPage; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);

            if (currentPage > range + 2) {
                pageNumbers.push("...");
            }

            // biome-ignore lint/style/useConst: <explanation>
            let start = Math.max(2, currentPage - range);
            // biome-ignore lint/style/useConst: <explanation>
            let end = Math.min(lastPage - 1, currentPage + range);
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < lastPage - range - 1) {
                pageNumbers.push("...");
            }

            pageNumbers.push(lastPage);
        }

        return pageNumbers;
    });

    return (
        <nav class="flex items-center gap-x-1" aria-label="Pagination">
            {/* Previous Button */}
            <button
                type="button"
                class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-none text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                aria-label="Previous"
                onClick={() => props.onPageChange(props.currentPage - 1)}
                disabled={props.currentPage === 1}
            >
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                <span class="sr-only">Previous</span>
            </button>

            {/* Page Numbers */}
            <div class="flex items-center gap-x-1">
                {pages().map((page) =>
                    typeof page === "number" ? (
                        // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                        <button
                            type="button"
                            class={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-none focus:outline-none ${page === props.currentPage
                                ? "bg-neutral-200 text-neutral-800 dark:bg-neutral-600 dark:text-white"
                                : "text-neutral-800 hover:bg-neutral-100 dark:text-white dark:hover:bg-white/10"
                                }`}
                            onClick={() => props.onPageChange(page)}
                        >
                            {page}
                        </button>
                    ) : (
                        // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                        <span class="text-neutral-400 dark:text-neutral-500 px-2">&hellip;</span>
                    )
                )}
            </div>

            {/* Next Button */}
            <button
                type="button"
                class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-none text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                aria-label="Next"
                onClick={() => props.onPageChange(props.currentPage + 1)}
                disabled={props.currentPage === props.lastPage}
            >
                <span class="sr-only">Next</span>
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>
        </nav>
    );
};

export default Pagination;
