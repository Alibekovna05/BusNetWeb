import { useState } from "react";
import { Bus, BusEntry, BusResponse } from "../../data/types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { updateCar } from "../../api/busapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import BusDialogContent from "./BusDialogContent";

type FormProps = {
  busdata: BusResponse;
};

function EditBus({ busdata }: FormProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [bus, setBus] = useState<Bus>({
    licensePlate: "",
    model: "",
    color: "",
    capacity: 0,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBus({ ...bus, [event.target.name]: event.target.value });
  };
  const { mutate } = useMutation(updateCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["buses"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });
  const handleClickOpen = () => {
    setBus({
      licensePlate: busdata.licensePlate,
      model: busdata.model,
      color: busdata.color,
      capacity: busdata.capacity,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const url = busdata._links.self.href;
    const busEntry: BusEntry = { bus, url };
    mutate(busEntry);
    setBus({
      licensePlate: "",
      model: "",
      color: "",
      capacity: 0,
    });
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Edit bus">
        <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit bus</DialogTitle>
        <BusDialogContent bus={bus} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default EditBus;
