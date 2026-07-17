import EmployeeControllers from "./controllerts/index.controllers";
import EmployeeAddDialog from "./dialogs/e.add";

export default function EmployeeFeatures() {
  return (
    <div className="my-4">
      <EmployeeControllers />
      <EmployeeAddDialog />
    </div>
  );
}
