import Header from "../../../components/application/Navigation/Header";
import Footer from "../../../components/application/Navigation/Footer";
import { onMount, Show, For, Index, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import Pagination from "../../../components/application/Navigation/Pagination";
import { isAuthenticated } from "../../../../lib/auth";
import toast from "solid-toast";
import ToastError from "../../../components/application/Toast/ToastError";
import ToastSuccess from "../../../components/application/Toast/ToastSuccess";
import type { ModelCommonReferencePaginationResponse } from "../../../../models/pagination/ModelPagination";
import type {
    TypeAppInputEvent,
    TypeAppSelectEvent,
    TypePaginationForm,
    TypeInputEntityReferenceForm,
} from "../../../../lib/types";

export default function LocationProvinceIndex() {
    const initialModelResponse: ModelCommonReferencePaginationResponse = {
        pagination: {
            search: "",
            sort_by: "",
            column: "",
            sort_dir: "asc",
            page: 1,
            per_page: 10,
            total_page: 0,
            last_page: 0,
            total_data: 0,
        },
        data: [],
    };
    const [model, setModel] = createStore<ModelCommonReferencePaginationResponse>(initialModelResponse);
    const [pagination, setPagination] = createStore<TypePaginationForm>({
        search: "",
        sort_by: "",
        column: "",
        sort_dir: "",
        page: 1,
        per_page: 10,
    });

    const [formInput, setFormInput] = createStore<TypeInputEntityReferenceForm>({
        id: null,
        code: 0,
        alphabet_code: "",
        name: "",
    });

    const [currentPage, setCurrentPage] = createSignal(1);
    const [lastPage, setLastPage] = createSignal(1);
    const [isFecth, setIsFetch] = createSignal(false);

    const pageChangeHandler = (page: number) => {
    if (page < 1 || page > model.pagination.last_page) return; // Prevent out-of-bound pages

        setPagination("page", page); // Update only the `page` inside `pagination`
    // fetchData(); // Re-fetch data with the new page number
    };
    const handleFormSelectPaginationInput = (event: TypeAppSelectEvent) => {
        const { name, value } = event.currentTarget;
        setPagination(name as keyof TypePaginationForm, Number(value));
    };
    const handleFormSearchPaginationInput = (event: TypeAppInputEvent) => {
        const { name, value } = event.currentTarget;
        setPagination(name as keyof TypePaginationForm, value);
    };

    const handleSearch = (event: SubmitEvent) => {
        event.preventDefault();
    };
    return (
        <>
            <div class="flex flex-col min-h-screen">
                <Header />
                <div id="page-content" class="flex-1 p-4">
                    <div class="flex items-center justify-between mx-auto">
                        <div class="inline-flex items-center">
                            <h2 class="text-xl">Tabel Propinsi</h2>
                        </div>
                    </div>
                    <br />
                    <form class="flex flex-wrap" onSubmit={(event) => handleSearch(event)}>
                        <div class="w-full mb-3 sm:mb-3 md:mb-0 lg:mb-0 xl:mb-0 sm:w-full md:w-1/3 lg:w-2/6 xl:w-2/6 md:pr-1">
                            <div class="relative">
                                <select
                                    class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    name="pagination_input"
                                    onInput={handleFormSelectPaginationInput}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                        </div>
                        <div class="w-full sm:w-full md:w-2/3 lg:w-4/6 xl:w-4/6 md:pl-1">
                            <div class="flex flex-wrap items-stretch w-full mb-4 relative">
                                <div class="w-full">
                                    <label
                                        for="hs-trailing-button-add-on-with-icon"
                                        class="sr-only"
                                    >
                                        Label
                                    </label>
                                    <div class="flex rounded-none w-full">
                                        <input
                                            type="text"
                                            id="hs-trailing-button-add-on-with-icon"
                                            name="hs-trailing-button-add-on-with-icon"
                                            class="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-none sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                            onInput={handleFormSearchPaginationInput}
                                        />
                                        <button
                                            type="button"
                                            class="size-11.5 shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-none border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                        >
                                            <svg
                                                class="shrink-0 size-4"
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
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <path d="m21 21-4.3-4.3"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="hidden md:flex md:flex-col">
                        <div class="flex flex-col">
                            <div class="-m-1.5 overflow-x-auto">
                                <div class="p-1.5 min-w-full inline-block align-middle">
                                    <div class="border overflow-hidden border-neutral-300 dark:border-neutral-700">
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
                                                <Show when={model.data.length != 0} fallback={
                                                    <tr>
                                                        <td colSpan={4} class="p-4">
                                                            <div id="alert-additional-content-1" class="p-4 text-blue-800 border border-blue-300 rounded-none bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                                                                <div class="flex items-center">
                                                                    <svg class="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                                                    </svg>
                                                                    <span class="sr-only">Info</span>
                                                                    <h3 class="text-lg font-medium">Data Kosong</h3>
                                                                </div>
                                                                <div class="mt-2 mb-4 text-sm">
                                                                    Isikan Data Referensi
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }>
                                                    {model?.data && (
                                                        <Index each={model?.data}>
                                                            {(data) => (
                                                                <tr>
                                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                                                        {data().code}
                                                                    </td>
                                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-800 dark:text-neutral-200">
                                                                        {data().alphabet_code}
                                                                    </td>
                                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-800 dark:text-neutral-200">
                                                                        {data().name}
                                                                    </td>
                                                                    <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                        <div class="hs-dropdown relative inline-flex">
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
                                                                )}
                                                        </Index>
                                                    )}
                                                </Show>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}