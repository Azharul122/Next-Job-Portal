"use client";

import { generatePassResetLink } from "@/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import { Input } from "@/components/ui/input";
import { FC } from "react";
// import AuthForm from "../components/AuthForm";
// import { Input } from "@nextui-org/react";
// import { generatePassResetLink } from "../actions/auth";
import { useFormState } from "react-dom";

interface Props {}

const ForgetPassword: FC<Props> = () => {
  const [state, action] = useFormState(generatePassResetLink, {});

  return (
    <AuthForm
      action={action}
      error={state.error}
      message={state.message}
      btnLabel="Request Reset Link"
      title="Forget Password"
      footerItems={[
        { label: "Sign Up", linkText: "Create an account", link: "/sign-up" },
        {
          label: "Already have an account",
          linkText: "Sign In",
          link: "/sign-in",
        },
      ]}
    >
      <Input name="email" placeholder="a@gmail.com" type="text" />
    </AuthForm>
  );
};

export default ForgetPassword;
