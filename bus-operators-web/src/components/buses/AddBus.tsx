import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { Bus } from "../../data/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBus } from "../../api/busapi";
import React from "react";
import BusDialogContent from "./BusDialogContent";
function AddBus() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [bus, setBus] = useState<Bus>({
    licensePlate: "",
    model: "",
    color: "",
    capacity: 0,
  });
  const { mutate } = useMutation(addBus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["buses"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSave = () => {
    mutate(bus);
    setBus({
      licensePlate: "",
      model: "",
      color: "",
      capacity: 0,
    });
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBus({ ...bus, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Button onClick={handleClickOpen}>New Bus</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New bus</DialogTitle>

        <BusDialogContent bus={bus} handleChange={handleChange} />

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default AddBus;
