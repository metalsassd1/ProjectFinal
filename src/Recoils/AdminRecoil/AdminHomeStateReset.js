import { useResetRecoilState } from 'recoil';
import {
  searchHomeTermsState,
  homeRowsState,
  homeFilteredRowsState,
  homeSelectedRowsState,
  homePageState,
  homeRowsPerPageState,
  equipmentCountState,
  returnedCountState,
  totalLendState,
  userCountState
} from './AdminHomeRecoil';

export const useResetHomeStates = () => {
  const resetSearchTerms = useResetRecoilState(searchHomeTermsState);
  const resetRows = useResetRecoilState(homeRowsState);
  const resetFilteredRows = useResetRecoilState(homeFilteredRowsState);
  const resetSelectedRows = useResetRecoilState(homeSelectedRowsState);
  const resetPage = useResetRecoilState(homePageState);
  const resetRowsPerPage = useResetRecoilState(homeRowsPerPageState);
  const resetEquipmentCount = useResetRecoilState(equipmentCountState);
  const resetReturnedCount = useResetRecoilState(returnedCountState);
  const resetTotalLend = useResetRecoilState(totalLendState);
  const resetUserCount = useResetRecoilState(userCountState);

  return () => {
    resetSearchTerms();
    resetRows();
    resetFilteredRows();
    resetSelectedRows();
    resetPage();
    resetRowsPerPage();
    resetEquipmentCount();
    resetReturnedCount();
    resetTotalLend();
    resetUserCount();
  };
};