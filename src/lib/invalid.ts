import { createStore } from "solid-js/store";

type ValidationErrorResponse = {
errors: {
    alphabet_code?: string[];
    code?: string[];
    name?: string[];
  };
  message: string;
};

const [invalidErrorStore, setInvalidErrorStore] = createStore<ValidationErrorResponse>({
  errors: {},
  message: "",
});

// Function to update the store with new error data
const updateInvalidErrors = (newErrors: Partial<ValidationErrorResponse>) => {
  setInvalidErrorStore((prev) => ({
    ...prev,
    ...newErrors,
    errors: { ...prev.errors, ...newErrors.errors },
  }));
};

// Function to reset the error store
const resetInvalidErrors = () => {
  setInvalidErrorStore({ errors: {}, message: "" });
};

export { invalidErrorStore, setInvalidErrorStore, updateInvalidErrors, resetInvalidErrors };