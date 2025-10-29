import type { ModelCommonReference } from "../common/reference/ModelCommonReference";
import type { InstitutionMasterInstitution } from "../institution/master/Institution";
import type { InstitutionMasterEmployee } from "../institution/master/Employee";
import type { LocationProvince } from "../location/Province";
import type { LocationRegency } from "../location/Regency";
import type { LocationRegencyType } from "../location/RegencyType";
import type { LocationSubDistrict } from "../location/SubDistrict";
import type { LocationVillage } from "../location/Village";
import type { PersonMasterIndividual } from "../person/master/Individual";

export interface ModelPagination {
  search: string;
  sort_by: string;
  column: string;
  sort_dir: string;
  page: number;
  per_page: number;
  total_page: number;
  last_page: number;
  total_data: number;
}

export interface ModelPaginationForm {
  search: string;
  sort_by: string;
  column: string;
  sort_dir: string;
  page: number;
  per_page: number;
}

export interface ModelPaginationResponse {
  pagination: ModelPagination;
  data: [];
}

export const initialPaginationForm: ModelPaginationForm = {
  search: "",
  sort_by: "",
  column: "",
  sort_dir: "",
  page: 1,
  per_page: 10,
};

export const initialPagination: ModelPagination = {
  search: "",
  sort_by: "",
  column: "",
  sort_dir: "",
  page: 1,
  per_page: 10,
  total_page: 0,
  last_page: 1,
  total_data: 0,
};

export interface ModelCommonReferencePaginationResponse {
  pagination: ModelPagination,
  data: ModelCommonReference[],
}

export interface ModelInstitutionMasterInstitutionPaginationResponse {
  pagination: ModelPagination,
  data: InstitutionMasterInstitution[],
}

export interface ModelInstitutionMasterEmployeePaginationResponse {
  pagination: ModelPagination,
  data: InstitutionMasterEmployee[],
}

export interface ModelLocationProvincePaginationResponse {
  pagination: ModelPagination,
  data: LocationProvince[],
}

export interface ModelLocationRegencyPaginationResponse {
  pagination: ModelPagination,
  data: LocationRegency[],
}

export interface ModelLocationRegencyTypePaginationResponse {
  pagination: ModelPagination,
  data: LocationRegencyType[],
}

export interface ModelLocationProvincePaginationResponse {
  pagination: ModelPagination,
  data: LocationProvince[],
}

export interface ModelLocationSubDistrictPaginationResponse {
  pagination: ModelPagination,
  data: LocationSubDistrict[],
}

export interface ModelLocationVillagePaginationResponse {
  pagination: ModelPagination,
  data: LocationVillage[],
}

export interface ModelPersonMasterIndividualPaginationResponse {
  pagination: ModelPagination,
  data: PersonMasterIndividual[],
}
