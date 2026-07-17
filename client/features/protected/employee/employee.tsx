import { Container } from "@mui/material";
import EmployeeControllers from "./controllers/controllers";
import EmployeeAddDialog from "./dialogs/e.add";
import TableEmployee from "./table/table";

export default function EmployeeFeatures() {
  return (
    <Container className="px-5 py-15">
      <EmployeeControllers />
      <TableEmployee />
      <EmployeeAddDialog />
    </Container>
  );
}
