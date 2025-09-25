import * as React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AddNode({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    role: "",
    description: "",
    avatarUrl: "",
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.name) return; // simple validation
    onAdd(form);
    setForm({ id: "", name: "", role: "", description: "", avatarUrl: "" });
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<Icon path={mdiPlus} size={1} />}
        onClick={() => setOpen(true)}
      >
        Add Node
      </Button>

      <Dialog fullScreen={fullScreen} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Node</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: fullScreen ? "100%" : 400 }}>
            <TextField
              label="ID"
              name="id"
              value={form.id}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Avatar URL"
              name="avatarUrl"
              value={form.avatarUrl}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

