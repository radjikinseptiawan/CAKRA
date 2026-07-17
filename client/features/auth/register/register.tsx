import { Container } from "@mui/material";
import RegisterController from "./r.controllers/controllers";
import RegisterForms from "./r.forms/forms";

export default function RegisterFeature() {
  return (
    <Container className="py-5">
      <RegisterController>
        <RegisterForms />
      </RegisterController>
    </Container>
  );
}
