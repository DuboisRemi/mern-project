import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans",
  },
  palette: {
    primary: {
      main: "#1e88e5",
      contrastText: "#fafafa",
    },
    secondary: {
      main: "#fafafa",
      contrastText: "#1e88e5",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
