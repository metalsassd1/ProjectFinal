import { atom } from "recoil";

export const formDataState = atom({
  key: 'formDataState',
  default: {
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
  },
});

export const selectedItemState = atom({
  key: 'selectedItemState',
  default: null,
});