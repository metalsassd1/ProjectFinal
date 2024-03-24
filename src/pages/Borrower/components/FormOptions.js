import { Button, FormLabel, Box, Typography } from "@mui/material";
import { useState } from "react";
const options = [
  { value: "student", label: "นักศึกษา" },
  { value: "inside", label: "บุคคลากรภายใน" },
  { value: "outside", label: "บุคคลากรภายนอก" },
];
export const FormOptions = ({ name, control, alert }) => {
  const [current, setCurrent] = useState("");
  const { onChange } = control.register(name);
  const onClicked = (value) => {
    setCurrent(value);
    onChange({ target: { name, value } });
  };

  return (
    <Box width={"100%"} display={'grid'} gap={1}>
      <Box
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
        gap={1}
      >
        <FormLabel>สถานภาพผู้ขอยืม *</FormLabel>
        {alert === true && (
          <h1 style={{ color: "#d32f2f", fontSize: "0.25rem" }}>
            โปรดเลือกสถานภาพ
          </h1>
        )}
      </Box>
      <Box width={"100%"} gap={1} display={"flex"} justifyContent={"center"}>
        {options.map((option) => {
          return (
            <Button
              key={option.value}
              variant={option.value === current ? "contained" : "outlined"}
              onClick={() => onClicked(option.value)}
            >
              {option.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
