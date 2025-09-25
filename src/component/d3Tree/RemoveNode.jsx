import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Icon from "@mdi/react";
import { mdiMinus } from "@mdi/js";

export default function RemoveNode() {
  return (
    <Stack spacing={2} direction="row" alignItems={"center"}>
      <Button variant="contained" startIcon={<Icon path={mdiMinus} size={1} />}>
        Remove Node
      </Button>
    </Stack>
  );
}
