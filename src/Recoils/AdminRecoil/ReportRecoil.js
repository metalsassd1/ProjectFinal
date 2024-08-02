import { atom } from "recoil";

export const barChartState = atom({
  key: 'barChartState',
  default: [],
});

export const pieChartState = atom({
  key: 'pieChartState',
  default: [],
});

export const tableRowsState = atom({
  key: 'tableRowsState',
  default: [],
});

export const fileNameState = atom({
  key: 'fileNameState',
  default: 'Report',
});

export const showInputBoxState = atom({
  key: 'showInputBoxState',
  default: false,
});

export const reportPageState = atom({
    key: 'reportPageState',
    default: 0,
});

export const reportRowsPerPageState = atom({
    key: 'reportRowsPerPageState',
    default: 10,
});