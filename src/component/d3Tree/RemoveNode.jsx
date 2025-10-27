import * as React from "react";
import Button from "@mui/material/Button";
import Icon from "@mdi/react";
import { mdiMinus } from "@mdi/js";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RemoveNode({ selectedNode, onRemove }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleRemove = () => {
    if (selectedNode) {
      onRemove(selectedNode.id);
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        startIcon={<Icon path={mdiMinus} size={1} />}
        onClick={() => setOpen(true)}
        disabled={!selectedNode}
      >
        Remove Node
      </Button>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the node{" "}
            <strong>{selectedNode?.name}</strong>?
            {selectedNode && (
              <>
                <br />
                <br />
                <em>
                  Note: All children of this node will also be removed.
                </em>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleRemove}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}