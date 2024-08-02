import { atom } from "recoil";

export const isSidebarOpenState = atom({
  key: 'isSidebarOpenState',
  default: false,
});

export const searchHomeTermsState = atom({
  key: 'searchHomeTermsState',
  default: {
    id: "",
    equipment_name: "",
    equipment_type: "",
    borrower_name: "",
    borrow_date: "",
  },
});

export const homeRowsState = atom({
  key: 'homeRowsState',
  default: [],
});

export const homeFilteredRowsState = atom({
  key: 'homeFilteredRowsState',
  default: [],
});

export const homeSelectedRowsState = atom({
  key: 'homeSelectedRowsState',
  default: [],
});

export const homePageState = atom({
  key: 'homePageState',
  default: 0,
});

export const homeRowsPerPageState = atom({
  key: 'homeRowsPerPageState',
  default: 10,
});

export const equipmentCountState = atom({
  key: 'equipmentCountState',
  default: {},
});

export const returnedCountState = atom({
  key: 'returnedCountState',
  default: {},
});

export const totalLendState = atom({
  key: 'totalLendState',
  default: {},
});

export const userCountState = atom({
  key: 'userCountState',
  default: {},
});