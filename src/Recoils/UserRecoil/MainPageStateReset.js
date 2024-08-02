import { useResetRecoilState } from 'recoil';
import {
  searchMainTermState,
  filterTypeState,
  rowsMainState,
  selectedItemsState
} from "./MainPageRecoil";

export const useResetMainPageStates = () => {
  const resetSearchTerm = useResetRecoilState(searchMainTermState);
  const resetFilterType = useResetRecoilState(filterTypeState);
  const resetRows = useResetRecoilState(rowsMainState);
  const resetSelectedItems = useResetRecoilState(selectedItemsState);

  return () => {
    resetSearchTerm();
    resetFilterType();
    resetRows();
    resetSelectedItems();
  };
};