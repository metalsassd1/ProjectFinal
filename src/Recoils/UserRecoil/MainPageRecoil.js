import { atom } from "recoil";

export const searchMainTermState = atom({
  key: 'searchTermState',
  default: "",
});

export const filterTypeState = atom({
  key: 'filterTypeState',
  default: "",
});

export const rowsMainState = atom({
  key: 'rowsState',
  default: [],
});

export const selectedItemsState = atom({
  key: 'selectedItemsState',
  default: [],
});