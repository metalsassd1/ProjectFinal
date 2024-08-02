import { useResetRecoilState } from 'recoil';
import {
  recreRowsState,
  searchRecreTermsState,
  filteredRecreRowsState,
  selectedRecreState,
  selectedRecreIdsState,
  recrePageState,
  recreRowsPerPageState
} from './RecreationalRecoil';

export const useResetRecreationalStates = () => {
  const resetRows = useResetRecoilState(recreRowsState);
  const resetSearchTerms = useResetRecoilState(searchRecreTermsState);
  const resetFilteredRows = useResetRecoilState(filteredRecreRowsState);
  const resetSelectedRecre = useResetRecoilState(selectedRecreState);
  const resetSelectedIds = useResetRecoilState(selectedRecreIdsState);
  const resetPage = useResetRecoilState(recrePageState);
  const resetRowsPerPage = useResetRecoilState(recreRowsPerPageState);

  return () => {
    resetRows();
    resetSearchTerms();
    resetFilteredRows();
    resetSelectedRecre();
    resetSelectedIds();
    resetPage();
    resetRowsPerPage();
  };
};