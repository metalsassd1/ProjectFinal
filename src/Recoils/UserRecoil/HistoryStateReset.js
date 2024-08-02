import { useResetRecoilState } from 'recoil';
import {
    allRowsState,
    HistoryfilteredRowsState,
    HistorypageState,
    showResultsState,
    errorState,
    isSearchingState,
    HistoryrowsPerPageState,
    HistorysearchTermState
} from './HistoryRecoil';

export const useResetHistoryStates = () => {
  const resetAllRows = useResetRecoilState(allRowsState);
  const resetFilteredRows = useResetRecoilState(HistoryfilteredRowsState);
  const resetSearchTerm = useResetRecoilState(HistorysearchTermState);
  const resetShowResults = useResetRecoilState(showResultsState);
  const resetError = useResetRecoilState(errorState);
  const resetIsSearching = useResetRecoilState(isSearchingState);
  const resetPage = useResetRecoilState(HistorypageState);
  const resetRowsPerPage = useResetRecoilState(HistoryrowsPerPageState);

  return () => {
    resetAllRows();
    resetFilteredRows();
    resetSearchTerm();
    resetShowResults();
    resetError();
    resetIsSearching();
    resetPage();
    resetRowsPerPage();
  };
};