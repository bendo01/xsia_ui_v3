import Header from "../../../../components/application/Navigation/Header";
import Footer from "../../../../components/application/Navigation/Footer";
import { onMount, Show, For, Index, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import Pagination from "../../../../components/application/Navigation/Pagination";
import { isAuthenticated } from "../../../../../lib/auth";
import toast from "solid-toast";
import ToastError from "../../../../components/application/Toast/ToastError";
import ToastSuccess from "../../../../components/application/Toast/ToastSuccess";
import type { ModelCommonReferencePaginationResponse } from "../../../../../models/pagination/ModelPagination";
import type {
    TypeAppInputEvent,
    TypeAppSelectEvent,
    TypePaginationForm,
    TypeInputEntityReferenceForm,
} from "../../../../../lib/types";

export default function InstitutionMasterEmployeeIndex() {
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
                            <h2 class="text-xl">Tabel Pegawai</h2>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </>
    );
}