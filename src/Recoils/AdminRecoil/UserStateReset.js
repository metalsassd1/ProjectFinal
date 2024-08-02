import { useResetRecoilState } from 'recoil';
import {
  userRowsState,
  filteredUserRowsState,
  searchUserTermsState,
  selectedUserState,
  selectedUserIdsState,
  userPageState,
  userRowsPerPageState
} from './UserRecoil';

export const useResetUserStates = () => {
  const resetRows = useResetRecoilState(userRowsState);
  const resetFilteredRows = useResetRecoilState(filteredUserRowsState);
  const resetSearchTerms = useResetRecoilState(searchUserTermsState);
  const resetSelectedUser = useResetRecoilState(selectedUserState);
  const resetSelectedIds = useResetRecoilState(selectedUserIdsState);
  const resetPage = useResetRecoilState(userPageState);
  const resetRowsPerPage = useResetRecoilState(userRowsPerPageState);

  return () => {
    resetRows();
    resetFilteredRows();
    resetSearchTerms();
    resetSelectedUser();
    resetSelectedIds();
    resetPage();
    resetRowsPerPage();
  };
};