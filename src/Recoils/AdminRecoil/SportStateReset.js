import { useResetRecoilState } from 'recoil';
import {
  sportRowsState,
  searchSportTermsState,
  filteredSportRowsState,
  selectedSportState,
  selectedSportIdsState,
  sportPageState,
  sportRowsPerPageState
} from './SportRecoil';

export const useResetSportStates = () => {
  const resetRows = useResetRecoilState(sportRowsState);
  const resetSearchTerms = useResetRecoilState(searchSportTermsState);
  const resetFilteredRows = useResetRecoilState(filteredSportRowsState);
  const resetSelectedSport = useResetRecoilState(selectedSportState);
  const resetSelectedIds = useResetRecoilState(selectedSportIdsState);
  const resetPage = useResetRecoilState(sportPageState);
  const resetRowsPerPage = useResetRecoilState(sportRowsPerPageState);

  return () => {
    resetRows();
    resetSearchTerms();
    resetFilteredRows();
    resetSelectedSport();
    resetSelectedIds();
    resetPage();
    resetRowsPerPage();
  };
};