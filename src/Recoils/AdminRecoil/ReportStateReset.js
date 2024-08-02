import { useResetRecoilState } from 'recoil';
import {
  barChartState,
  pieChartState,
  tableRowsState,
  fileNameState,
  showInputBoxState,
  reportPageState,
  reportRowsPerPageState
} from './ReportRecoil';

export const useResetReportStates = () => {
  const resetBarChart = useResetRecoilState(barChartState);
  const resetPieChart = useResetRecoilState(pieChartState);
  const resetTableRows = useResetRecoilState(tableRowsState);
  const resetFileName = useResetRecoilState(fileNameState);
  const resetShowInputBox = useResetRecoilState(showInputBoxState);
  const resetPage = useResetRecoilState(reportPageState);
  const resetRowsPerPage = useResetRecoilState(reportRowsPerPageState);

  return () => {
    resetBarChart();
    resetPieChart();
    resetTableRows();
    resetFileName();
    resetShowInputBox();
    resetPage();
    resetRowsPerPage();
  };
};