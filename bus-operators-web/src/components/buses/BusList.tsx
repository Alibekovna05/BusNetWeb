import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBus, deleteBus } from "../../api/busapi";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import React from "react";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import AddCar from "./AddBus";
import Stack from "@mui/material/Stack";
import EditBus from "./EditBus";
type BuslistProps = {
  logOut?: () => void;
};

function BusList({ logOut }: BuslistProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["buses"],
    queryFn: getBus,
  });

  const { mutate } = useMutation(deleteBus, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries(["buses"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });
  const columns: GridColDef[] = [
    { field: "licensePlate", headerName: "Registred Number", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "capacity", headerName: "Capacity", width: 200 },
    { field: "color", headerName: "Coloe", width: 150 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditBus busdata={params.row} />,
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete ${params.row.brand} ${params.row.model}?`
              )
            ) {
              mutate(params.row._links.car.href);
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching buses...</span>;
  } else {
    return (
      <>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <AddCar />
          <Button onClick={logOut}>Log out</Button>
        </Stack>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Bus deleted"
        />
      </>
    );
  }
}

export default BusList;
