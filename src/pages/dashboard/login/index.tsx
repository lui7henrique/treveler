import { Button } from "components/Button";
import { FieldText } from "components/FieldText";
import { useCallback } from "react";

import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = useCallback((data: LoginForm) => {
    const { email, password } = data;

    console.log({ email, password });
  }, []);

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
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "416px" }}>
        <FieldText
          {...register("email", {
            required: {
              value: true,
              message: "E-mail é um campo obrigatório.",
            },
          })}
          error={errors.email}
          label="E-mail"
        />
        <FieldText
          {...register("password", {
            required: {
              value: true,
              message: "E-mail é um campo obrigatório.",
            },
          })}
          error={errors.password}
          label="Senha"
        />

        <Button type="submit">Acessar plataforma</Button>

        {/* <Button label="Oi" color="green" /> */}
      </form>
    </div>
  );
}
