import { atom } from "recoil";

export const loanRowsState = atom({
  key: 'loanRowsState',
  default: [],
});

export const searchLoanTermsState = atom({
  key: 'searchLoanTermsState',
  default: {
    id: "",
    equipment_name: "",
    equipment_type: "",
    borrower_name: "",
    borrow_date: "",
  },
});

export const loanFilteredRowsState = atom({
  key: 'loanFilteredRowsState',
  default: [],
});

export const selectedLoDState = atom({
  key: 'selectedLoDState',
  default: [],
});

export const loanSelectedIdsState = atom({
  key: 'loanSelectedIdsState',
  default: [],
});

export const loanPageState = atom({
  key: 'loanPageState',
  default: 0,
});

export const loanRowsPerPageState = atom({
  key: 'loanRowsPerPageState',
  default: 10,
});