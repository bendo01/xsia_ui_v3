export interface InstitutionMasterEmployee {
    id: string;
    code: String | null,
    name: String | null,
    institution_id: String | null,
    individual_id: String | null,
    decree_date: Date | null,
    decree_number: String | null,
    is_active: boolean | null,
    created_at: Date|null,
    updated_at: Date|null,
    deleted_at: Date|null,
    created_by: string|null,
    updated_by: string|null
}
