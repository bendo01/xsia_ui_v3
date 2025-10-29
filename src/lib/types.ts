export type TypeAppInputEvent = InputEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
};

export type TypeAppSelectEvent = Event & {
  currentTarget: HTMLSelectElement;
  target: Element;
};

export type TypeAppCheckboxEvent = Event & {
  currentTarget: HTMLInputElement;
  target: Element;
};

export type TypeAppRadioEvent = Event & {
  currentTarget: HTMLInputElement;
  target: Element;
};

export type TypePaginationForm = {
  search: string;
  sort_by: string;
  column: string;
  sort_dir: string;
  page: number;
  per_page: number;
};

export type TypeInputEntityReferenceForm = {
  id?: string| null;
  code: number;
  alphabet_code: string;
  name: string;
};
