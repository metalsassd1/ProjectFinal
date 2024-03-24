import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { Box, FormLabel } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function MuiDateRangePicker({ name, control, alert }) {
  const today = dayjs(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const disable_endDate = !startDate ? true : false;
  const { onChange } = control.register(name);
  useEffect(() => {
    if (startDate && endDate) {
      onChange({ target: { name, value: { start: startDate, end: endDate } } });
    }
  }, [startDate, endDate]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
      <Box width={"100%"} display={"grid"} gap={1}>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
          gap={1}
        >
          <FormLabel>ระยะเวลายืม *</FormLabel>
          {alert === true && (
            <h1 style={{ color: "#d32f2f", fontSize: "0.25rem" }}>
              โปรดเลือกระยะเวลายืม
            </h1>
          )}
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          gap={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <DatePicker
            label={"วันที่ยืม"}
            minDate={today}
            onChange={(g) => {
              setStartDate(dayjs(g).format("MM/DD/YYYY"));
            }}
          />

          <ArrowForwardIcon color={"primary"} />
          <DatePicker
            label={"วันที่คืน"}
            minDate={dayjs(startDate)}
            disabled={disable_endDate}
            onChange={(g) => {
              setEndDate(dayjs(g).format("MM/DD/YYYY"));
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
