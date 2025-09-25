import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "12px 12px",
  mb: 1,
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#FFAAAA",
  borderColor: "#FF9898",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#ffaaaaa7",
    borderColor: "#FF9898",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#ffaaaac9",
    borderColor: "#FF9898",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem #ffaaaad0",
    borderColor: "#FF9898",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],

  "&:hover": {
    backgroundColor: "rgba(123, 31, 162, 0.57)",

    border: "1px solid",
    borderColor: "rgba(123, 31, 162, 0.99)",
  },
}));

const DefaultButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "12px 12px",
  mb: 1,
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#FFAAAA",
  borderColor: "#FF9898",
  "&:hover": {
    backgroundColor: "#ffaaaaa7",
    borderColor: "#FF9898",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#ffaaaac9",
    borderColor: "#FF9898",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem #ffaaaad0",
    borderColor: "#FF9898",
  },
});

export default function CustomizedButtons({ onSend }) {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton variant="contained" onClick={() => onSend("D3Tree")}>
        Vertical{" "}
      </ColorButton>
      <BootstrapButton
        variant="contained"
        onClick={() => onSend("Theme")}
        disableRipple
      >
        Horizontal
      </BootstrapButton>

      {/* <DefaultButton
        variant="contained"
        onClick={() => onSend("Bootstrap Button clicked!")}
        disableRipple
      >
        Default
      </DefaultButton> */}
    </Stack>
  );
}
