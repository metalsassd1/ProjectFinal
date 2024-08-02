import { atom } from "recoil";

export const sportRowsState = atom({
    key: 'sportRowsState',
    default: [],
});

export const searchSportTermsState = atom({
    key: 'searchSportTermsState',
    default: {
      id: "",
      equipment_name: "",
      equipment_type: "",
      borrower_name: "",
      borrow_date: "",
    },
});

export const filteredSportRowsState = atom({
    key: 'filteredSportRowsState',
    default: [],
});

export const selectedSportState = atom({
    key: 'selectedSportState',
    default: [],
});

export const selectedSportIdsState = atom({
    key: 'selectedSportIdsState',
    default: [],
});

export const sportPageState = atom({
    key: 'sportPageState',
    default: 0,
});

export const sportRowsPerPageState = atom({
    key: 'sportRowsPerPageState',
    default: 10,
});