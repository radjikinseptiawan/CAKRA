import EmployeeControllers from "./controllers/controllers";
import EmployeeAddDialog from "./dialogs/e.add";
import TableEmployee from "./table/table";

export default function EmployeeFeatures() {
  return (
    <div className="my-4 w-full">
      <EmployeeControllers />
      <TableEmployee />
      <EmployeeAddDialog />
    </div>
  );
}
