import { useResetRecoilState } from 'recoil';
import {
  searchLoanTermsState,
  loanRowsState,
  loanFilteredRowsState,
  selectedLoDState,
  loanSelectedIdsState,
  loanPageState,
  loanRowsPerPageState
} from './LoanDetailRecoil';

export const useResetLoanDetailStates = () => {
  const resetSearchTerms = useResetRecoilState(searchLoanTermsState);
  const resetRows = useResetRecoilState(loanRowsState);
  const resetFilteredRows = useResetRecoilState(loanFilteredRowsState);
  const resetSelectedLoD = useResetRecoilState(selectedLoDState);
  const resetSelectedIds = useResetRecoilState(loanSelectedIdsState);
  const resetPage = useResetRecoilState(loanPageState);
  const resetRowsPerPage = useResetRecoilState(loanRowsPerPageState);

  return () => {
    resetSearchTerms();
    resetRows();
    resetFilteredRows();
    resetSelectedLoD();
    resetSelectedIds();
    resetPage();
    resetRowsPerPage();
  };
};