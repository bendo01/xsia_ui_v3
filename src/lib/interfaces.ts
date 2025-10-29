export interface InterfaceReferencePaginationResponse {
  pagination: {
    search: string;
    sort_by: string;
    column: string;
    sort_dir: "asc" | "desc";
    page: number;
    per_page: number;
    total_page: number;
    last_page: number;
    total_data: number;
  };
  data: any[]; // Change `any` to a specific type if you know your data structure
}
