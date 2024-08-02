import { atom } from "recoil";

export const userRowsState = atom({
    key: 'userRowsState',
    default: [],
});

export const filteredUserRowsState = atom({
    key: 'filteredUserRowsState',
    default: [],
});

export const searchUserTermsState = atom({
    key: 'searchUserTermsState',
    default: {
      id: "",
      equipment_name: "",
      equipment_type: "",
      borrower_name: "",
      borrow_date: "",
    },
});

export const selectedUserState = atom({
    key: 'selectedUserState',
    default: [],
});

export const selectedUserIdsState = atom({
    key: 'selectedUserIdsState',
    default: [],
});

export const userPageState = atom({
    key: 'userPageState',
    default: 0,
});

export const userRowsPerPageState = atom({
    key: 'userRowsPerPageState',
    default: 10,
});