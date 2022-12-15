import { Button } from "components/Button";
import { FieldText } from "components/FieldText";
import { useCallback, useRef, useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { FieldPassword } from "components/FieldPassword";

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
        <FieldText {...register("email")} error={errors.email} label="E-mail" />

        <FieldPassword
          {...register("password")}
          label="Senha"
          error={errors.password}
        />

        <Button type="submit">Acessar plataforma</Button>
      </form>
    </div>
  );
}
