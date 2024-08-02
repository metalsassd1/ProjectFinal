import { atom } from "recoil";

export const allRowsState = atom({
  key: 'allRowsState',
  default: [],
});

export const HistoryfilteredRowsState = atom({
  key: 'HistoryfilteredRowsState',
  default: [],
});

export const HistorysearchTermState = atom({
  key: 'HistorysearchTermState',
  default: "",
});

export const showResultsState = atom({
  key: 'showResultsState',
  default: false,
});

export const errorState = atom({
  key: 'errorState',
  default: "",
});

export const isSearchingState = atom({
  key: 'isSearchingState',
  default: false,
});

export const HistorypageState = atom({
  key: 'HistorypageState',
  default: 0,
});

export const HistoryrowsPerPageState = atom({
  key: 'HistoryrowsPerPageState',
  default: 10,
});