import { Container, Paper } from "@mui/material";
import HistoryTable from "./h.table/h.table";
import HistoryControllers from "./h.controllers";

export default function HistoryTemplate() {
  return (
    <Container className="py-15 px-5" component={Paper}>
      <HistoryControllers />
      <HistoryTable />
    </Container>
  );
}
