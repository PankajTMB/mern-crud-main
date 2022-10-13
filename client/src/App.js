import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import Routing from "./routing";

function App() {
  return (
    <div>
      <CssBaseline />

      <SnackbarProvider maxSnack={3}>
        <Routing />
      </SnackbarProvider>
    </div>
  );
}

export default App;
