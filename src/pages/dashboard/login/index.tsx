import { Button } from "components/Button";
import { FieldText } from "components/FieldText";

export default function Login() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F8FA",
      }}
    >
      <div style={{ width: "416px" }}>
        <FieldText label="E-mail" />
        <FieldText label="Senha" />
        <Button>Acessar plataforma</Button>

        {/* <Button label="Oi" color="green" /> */}
      </div>
    </div>
  );
}
