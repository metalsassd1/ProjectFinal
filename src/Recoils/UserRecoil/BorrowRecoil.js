import { atom, selector } from 'recoil';

export const filterTypeState = atom({
  key: 'filterTypeState',
  default: "",
});
export const searchTermState = atom({
  key: 'searchTermState',
  default: "",
});

export const approvalStatusState = atom({
  key: 'approvalStatusState',
  default: null,
});

export const userState = atom({
  key: 'userState',
  default: "",
});

export const userEmailsState = atom({
  key: 'userEmailsState',
  default: [],
});

export const optionState = atom({
  key: 'optionState',
  default: "",
});

export const selectedItemsState = atom({
  key: 'selectedItemsState',
  default: [],
});

export const formDataState = atom({
  key: 'formDataState',
  default: {
    borrower_name: "",
    equip_name: "",
    identifier_number: "",
    phone: "",
    quantity_borrowed: 0,
    duration: "",
  },
});

// QR Code Generator
export const qrDataState = atom({
  key: 'qrDataState',
  default: null,
});

export const rowsState = atom({
  key: 'rowsState',
  default: [],
});

// Return Component
export const currentStatusState = atom({
  key: 'currentStatusState',
  default: "",
});

export const containerClassState = atom({
  key: 'containerClassState',
  default: 'qr-container',
});
