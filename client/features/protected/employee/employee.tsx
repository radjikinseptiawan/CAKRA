import { Container } from "@mui/material";
import EmployeeControllers from "./controllers/controllers";
import EmployeeAddDialog from "./dialogs/e.add";
import TableEmployee from "./table/table";

export default function EmployeeFeatures() {
  return (
    <Container className="my-4 w-full">
      <EmployeeControllers />
      <TableEmployee />
      <EmployeeAddDialog />
    </Container>
  );
}
