import RegisterController from "./r.controllers/controllers";
import RegisterForms from "./r.forms/forms";

export default function RegisterFeature() {
  return (
    <>
      <RegisterController>
        <RegisterForms />
      </RegisterController>
    </>
  );
}
