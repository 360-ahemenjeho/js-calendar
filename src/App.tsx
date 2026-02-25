import { Box } from "@mui/material";
import { Calendar } from "./components/ui";

export default function App() {
  return (
    <Box sx={{ maxWidth: "90%", margin: "0 auto", padding: "20px" }}>
      <Calendar />
    </Box>
  );
}
