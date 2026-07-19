import { Container } from "@mui/material";
import EmployeeControllers from "./em.controllers/controllers";
import EmployeeAddDialog from "./em.dialogs/e.add";
import TableEmployee from "./em.table/table";
import { EmployeeProvider } from "./em.hooks/em.hooks";

export default function EmployeeFeatures() {
  return (
    <Container className="px-5 py-15">
      <EmployeeProvider>
        <EmployeeControllers />
        <TableEmployee />
        <EmployeeAddDialog />
      </EmployeeProvider>
    </Container>
  );
}
