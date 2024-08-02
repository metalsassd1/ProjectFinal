import { atom } from "recoil";

export const recreRowsState = atom({
    key: 'recreRowsState',
    default: [],
});

export const searchRecreTermsState = atom({
    key: 'searchRecreTermsState',
    default: {
      id: "",
      equipment_name: "",
      equipment_type: "",
      borrower_name: "",
      borrow_date: "",
    },
});

export const filteredRecreRowsState = atom({
    key: 'filteredRecreRowsState',
    default: [],
});

export const selectedRecreState = atom({
    key: 'selectedRecreState',
    default: [],
});

export const selectedRecreIdsState = atom({
    key: 'selectedRecreIdsState',
    default: [],
});

export const recrePageState = atom({
    key: 'recrePageState',
    default: 0,
});

export const recreRowsPerPageState = atom({
    key: 'recreRowsPerPageState',
    default: 10,
});