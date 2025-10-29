import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import { onMount, Show, For, Index, createSignal } from "solid-js";
import toast from "solid-toast";
import { HSOverlay } from "preline";
import Header from "../../../../components/application/Navigation/Header";
import Footer from "../../../../components/application/Navigation/Footer";
import Pagination from "../../../../components/application/Navigation/Pagination";
import { isAuthenticated } from "../../../../../lib/auth";
import ToastError from "../../../../components/application/Toast/ToastError";
import ToastSuccess from "../../../../components/application/Toast/ToastSuccess";
import type { ModelCommonReferencePaginationResponse } from "../../../../../models/pagination/ModelPagination";
import type {
    TypeAppInputEvent,
    TypeAppSelectEvent,
    TypePaginationForm,
    TypeInputEntityReferenceForm,
} from "../../../../../lib/types";
import { UpsertDeleteMessage } from "../../../../../models/common/reference/ModelCommonReference";
import { invalidErrorStore, setInvalidErrorStore, resetInvalidErrors } from "../../../../../lib/invalid";
import { InstitutionReferenceControllerCategoryIndex, InstitutionReferenceControllerCategoryUpsert, InstitutionReferenceControllerCategoryDelete } from "../../../../../controllers/institution/reference/InstitutionReferenceCategoryController";

export default function InstitutionReferenceCategoryIndex() {
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

    const handleFormInput = (event: TypeAppInputEvent) => {
        const { name, value } = event.currentTarget;
        setFormInput(name as keyof TypeInputEntityReferenceForm, value);
        // console.log(formInput);
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

    function openActionModal(data: TypeInputEntityReferenceForm) {
        setFormInput("id", data.id);
        setFormInput("code", data.code);
        setFormInput("alphabet_code", data.alphabet_code);
        setFormInput("name", data.name);
        // console.log(data);
        HSOverlay.open("#action-modal");
    }

    function openUpsertModal(data: TypeInputEntityReferenceForm) {
        setFormInput("id", data.id);
        setFormInput("code", data.code);
        setFormInput("alphabet_code", data.alphabet_code);
        setFormInput("name", data.name);
        //console.log(data);
        HSOverlay.open("#upsert-modal");
    }

    function openDeleteModal(data: TypeInputEntityReferenceForm) {
        setFormInput("id", data.id);
        setFormInput("code", data.code);
        setFormInput("alphabet_code", data.alphabet_code);
        setFormInput("name", data.name);
        HSOverlay.close("#action-modal");
        // HSOverlay.open("#delete-modal");
        console.log(formInput);
    }

    function resetFormInput() {
        setFormInput("id", null);
        setFormInput("code", 0);
        setFormInput("alphabet_code", "");
        setFormInput("name", "");
    }

    function closeAllModal() {
        resetFormInput();
        resetInvalidErrors();
        HSOverlay.close("#delete-modal");
        HSOverlay.close("#action-modal");
        HSOverlay.close("#upsert-modal");
    }

    async function fetchUpsertData(event: Event) {
        event.preventDefault();
        // console.log(formInput);
        let response: UpsertDeleteMessage = await InstitutionReferenceControllerCategoryUpsert(formInput);
        if (!response.is_error) {
            HSOverlay.close("#upsert-modal");
            toast.custom((t) => <ToastSuccess message={response.message} toast_id={t.id} />, {
                duration: 10000,
                unmountDelay: 1,
            });
            let pagination_response = await InstitutionReferenceControllerCategoryIndex(pagination);
            // console.log(pagination_response);
            // return response_data;
            setModel(pagination_response);
            // 🔥 Ensure reactivity by updating `currentPage` and `lastPage`
            setCurrentPage(pagination_response.pagination.page);
            setLastPage(pagination_response.pagination.last_page);
            resetFormInput();
            resetInvalidErrors();
        }
        else {
            // console.log(response);
            // updateInvalidErrors(response.errors);
            setInvalidErrorStore('errors', response.errors);
            setInvalidErrorStore('message', response.message);
            toast.custom((t) => <ToastError message={response.message} toast_id={t.id} />, {
                duration: 10000,
                unmountDelay: 1,
            });
        }
    }

    async function fetchDeleteData(event: Event) {
        event.preventDefault();
        // console.log('terpanggil');
        // console.log(formInput);
        let response: UpsertDeleteMessage = await InstitutionReferenceControllerCategoryDelete(formInput);
        if (!response.is_error) {
            HSOverlay.close("#delete-modal");
            toast.custom((t) => <ToastSuccess message={response.message} toast_id={t.id} />, {
                duration: 10000,
                unmountDelay: 1,
            });
            let pagination_response = await InstitutionReferenceControllerCategoryIndex(pagination);
            // console.log(pagination_response);
            // return response_data;
            setModel(pagination_response);
            // 🔥 Ensure reactivity by updating `currentPage` and `lastPage`
            setCurrentPage(pagination_response.pagination.page);
            setLastPage(pagination_response.pagination.last_page);
            resetFormInput();
        }
        else {
            toast.custom((t) => <ToastError message={response.message} toast_id={t.id} />, {
                duration: 10000,
                unmountDelay: 1,
            });
        }
    }

    onMount(async () => {
        InstitutionReferenceControllerCategoryIndex(pagination).then((response) => {
            setModel(response);
            setCurrentPage(response.pagination.page);
            setLastPage(response.pagination.last_page);
        });
    });

    return (
        <>
            {/* start action modal */}
            <div
                id="action-modal"
                class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                role="dialog"
                tabindex="-1"
                aria-labelledby="action-modal-label"
            >
                <div class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div class="w-full flex flex-col border shadow-sm rounded-none pointer-events-auto bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                            <h3
                                id="action-modal-label"
                                class="font-bold text-neutral-800 dark:text-white"
                            >
                                Tindakan
                            </h3>
                            <button
                                type="button"
                                class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus:outline-none focus:bg-neutral-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                aria-label="Close"
                                data-hs-overlay="#action-modal"
                            >
                                <span class="sr-only">Close</span>
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                        <div class="p-4 overflow-y-auto">
                            <p class="mt-1 text-neutral-800 dark:text-neutral-400">
                                Apakah Anda lakukan dengan data ini ?
                            </p>
                        </div>
                        <div class="p-4 w-full flex flex-col">
                            <button
                                type="button"
                                class="w-full py-3 px-4 flex items-center justify-center gap-x-2 text-sm font-medium rounded-none border border-transparent bg-yellow-600 text-white hover:bg-yellow-700 focus:outline-none focus:bg-yellow-700 disabled:opacity-50 disabled:pointer-events-none"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-modal"
                                data-hs-overlay="#edit-modal"
                                onClick={() => openUpsertModal(formInput)}
                            >
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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
                                    class="lucide lucide-pencil"
                                >
                                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                    <path d="m15 5 4 4" />
                                </svg>
                                Ubah
                            </button>
                            <br />
                            <button
                                type="button"
                                class="w-full py-3 px-4 flex items-center justify-center gap-x-2 text-sm font-medium rounded-none border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="delete-modal"
                                data-hs-overlay="#delete-modal"
                                onClick={()=> openDeleteModal(formInput)}
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
                                    class="lucide lucide-trash"
                                >
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                </svg>
                                Hapus
                            </button>
                        </div>
                        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                            <button
                                type="button"
                                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                onClick={() => closeAllModal()}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* end action modal */}
            {/* start upsert modal */}
            <div
                id="upsert-modal"
                class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                role="dialog"
                tabindex="-1"
                aria-labelledby="upsert-modal-label"
            >
                <div class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div class="w-full flex flex-col bg-white border shadow-sm rounded-none pointer-events-auto dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <div class="flex justify-between items-center py-3 px-4 border-b border-neutral-300 dark:border-neutral-700">
                            <h3
                                id="upsert-modal-label"
                                class="font-bold text-neutral-800 dark:text-white"
                            >
                                Pembaharuan Data
                            </h3>
                            <button
                                type="button"
                                class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus:outline-none focus:bg-neutral-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                aria-label="Close"
                                onClick={() => closeAllModal()}
                            >
                                <span class="sr-only">Close</span>
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={(event) => fetchUpsertData(event)}>
                            <div class="p-4 overflow-y-auto">
                                <div class="w-full mb-3">
                                    <label
                                        for="create-code-label"
                                        class="block text-sm font-medium mb-2 dark:text-white"
                                    >
                                        Kode Angka
                                    </label>
                                    <input
                                        type="number"
                                        id="create-code-label"
                                        name="code"
                                        class="py-3 px-4 block w-full border-neutral-200 rounded-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="Isikan Kode Angka"
                                        required
                                        value={formInput.code}
                                        onInput={handleFormInput}
                                    />
                                    <Show when={invalidErrorStore.errors.code}>
                                        <div class="mt-2 text-sm text-red-700 dark:text-red-400">
                                            <ul class="list-disc space-y-1 ps-5">
                                                <For each={invalidErrorStore.errors.code}>{(message) => <li>{message}</li>}</For>
                                            </ul>
                                        </div>
                                    </Show>
                                </div>
                                <div class="w-full mb-3">
                                    <label
                                        for="create-alphabet_code-label"
                                        class="block text-sm font-medium mb-2 dark:text-white"
                                    >
                                        Kode Huruf
                                    </label>
                                    <input
                                        type="text"
                                        id="create-alphabet_code-label"
                                        name="alphabet_code"
                                        class="py-3 px-4 block w-full border-neutral-200 rounded-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="Isikan Kode Huruf"
                                        required
                                        value={formInput.alphabet_code}
                                        onInput={handleFormInput}
                                    />
                                    <Show when={invalidErrorStore.errors.alphabet_code}>
                                        <div class="mt-2 text-sm text-red-700 dark:text-red-400">
                                            <ul class="list-disc space-y-1 ps-5">
                                                <For each={invalidErrorStore.errors.alphabet_code}>{(message) => <li>{message}</li>}</For>
                                            </ul>
                                        </div>
                                    </Show>
                                </div>
                                <div class="w-full mb-3">
                                    <label
                                        for="create-name-label"
                                        class="block text-sm font-medium mb-2 dark:text-white"
                                    >
                                        Nama
                                    </label>
                                    <input
                                        type="text"
                                        id="create-name-label"
                                        name="name"
                                        class="py-3 px-4 block w-full border-neutral-200 rounded-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="Isikan Nama"
                                        required
                                        value={formInput.name}
                                        onInput={handleFormInput}
                                    />
                                    <Show when={invalidErrorStore.errors.name}>
                                        <div class="mt-2 text-sm text-red-700 dark:text-red-400">
                                            <ul class="list-disc space-y-1 ps-5">
                                                <For each={invalidErrorStore.errors.name}>{(message) => <li>{message}</li>}</For>
                                            </ul>
                                        </div>
                                    </Show>
                                </div>
                            </div>
                            <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-neutral-300 dark:border-neutral-700">
                                <button
                                    type="button"
                                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                    onClick={() => closeAllModal()}
                                >
                                    Tutup
                                </button>
                                <button
                                    type="submit"
                                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* end upsert modal */}
            {/* start delete modal */}
            <div id="delete-modal" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="delete-modal-label">
                <div class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div class="w-full flex flex-col bg-white border shadow-sm rounded-none pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 id="delete-modal-label" class="font-bold text-neutral-800 dark:text-white">
                            Hapus Data
                        </h3>
                        <button
                            type="button"
                            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus:outline-none focus:bg-neutral-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                            aria-label="Close"
                            onClick={() => closeAllModal()}
                        >
                            <span class="sr-only">Close</span>
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                            </svg>
                        </button>
                        </div>
                        <form onSubmit={(event) => fetchDeleteData(event)}>
                        <div class="p-4 overflow-y-auto">
                            <p class="mt-1 text-neutral-800 dark:text-neutral-400">Apakah Anda Yakin untuk menghapus data ini ?</p>
                        </div>
                        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                            <button
                                type="button"
                                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                onClick={() => closeAllModal()}
                            >
                            Tutup
                            </button>
                            <button type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">
                            Hapus
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* end delete modal */}
            <div class="flex flex-col min-h-screen">
                <Header />
                <div id="page-content" class="flex-1 p-4">
                    <div class="flex items-center justify-between mx-auto">
                        <div class="inline-flex items-center">
                            <h2 class="text-xl">Tabel Referensi Kategori UMKM</h2>
                        </div>
                        <div class="inline-flex items-center">
                            <button
                                type="button"
                                class="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-none border border-neutral-200 bg-white text-teal-500 shadow-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="upsert-modal"
                                data-hs-overlay="#upsert-modal"
                            >
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-plus"
                                >
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                            </button>
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
                                                                                onClick={() =>
                                                                                    openActionModal({
                                                                                        id: data().id,
                                                                                        code: Number(data().code),
                                                                                        alphabet_code: data().alphabet_code,
                                                                                        name: data().name,
                                                                                    })
                                                                                }
                                                                                id="hs-dropdown-1"
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
                    <div class="flex flex-col items-center md:hidden">
                        <h2 class="text-xl">Tabel Referensi</h2>
                    </div>
                    <br />
                    <Pagination currentPage={currentPage()} lastPage={lastPage()} onPageChange={(page) => pageChangeHandler(page)} />
                </div>
                <Footer />
            </div>
        </>
    );
}
