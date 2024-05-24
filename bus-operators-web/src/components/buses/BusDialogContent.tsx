import { Bus } from "../../data/types";
import DialogContent from "@mui/material/DialogContent";
import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
type DialogFormProps = {
  bus: Bus;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
function BusDialogContent({ bus, handleChange }: DialogFormProps) {
  return (
    <DialogContent>
      <Stack spacing={2} mt={1}>
        <TextField
          label="Registration Number"
          name="licensePlate"
          value={bus.licensePlate}
          onChange={handleChange}
        />
        <TextField
          label="Model"
          name="model"
          value={bus.model}
          onChange={handleChange}
        />
        <TextField
          label="Color"
          name="color"
          value={bus.color}
          onChange={handleChange}
        />
        <TextField
          label="Capacity"
          name="capacity"
          value={bus.capacity}
          onChange={handleChange}
        />
      </Stack>
    </DialogContent>
  );
}
export default BusDialogContent;
