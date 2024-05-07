import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

export const MuiInput = ({ name, control, label, required = false, disabled = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box width={"100%"} bgcolor={"transparent"}>
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={`${label} ${required ? "*" : ""}`}
            variant="outlined"
            disabled={disabled}  // Now TextField will be disabled based on this prop
          />
        </Box>
      )}
    />
  );
};
