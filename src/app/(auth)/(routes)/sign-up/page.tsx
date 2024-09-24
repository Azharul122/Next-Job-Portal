"use client";

import { signUp } from "@/actions/auth";
import { auth } from "@/auth";
import AuthForm from "@/components/auth/AuthForm";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { FC } from "react";
// import { Input } from "@nextui-org/react";
// import AuthForm from "@/app/components/AuthForm";
// import { signUp } from "@/app/actions/auth";
import { useFormState } from "react-dom";

interface Props {}

const SignIn: FC<Props> = () => {
  const [state, singUpAction] = useFormState(signUp, {});
  const {data,status}=useSession();
  const loading=status==="loading"
  if(data || loading){
    redirect("/")
  }

  return (
    <AuthForm
      action={singUpAction}
      footerItems={[
        {
          label: "Already have an account",
          linkText: "Sign In",
          link: "/sign-in",
        },
        {
          label: "Having trouble",
          linkText: "Forget password",
          link: "/forget-password",
        },
      ]}
      btnLabel="Sign Up"
      title="Sign Up"
      error={state.error}
      message={state.success ? "Please check your email." : ""}
    >
      <Input
        errorMessage={state.errors?.name?.join(", ")}
        isInvalid={state.errors?.name ? true : false}
        placeholder="Sonu Kumar"
        name="name"
      />
      <Input
        errorMessage={state.errors?.email?.join(", ")}
        isInvalid={state.errors?.email ? true : false}
        placeholder="sonu@email.com"
        name="email"
      />
      <Input
        errorMessage={state.errors?.password?.join(", ")}
        isInvalid={state.errors?.password ? true : false}
        placeholder="********"
        type="password"
        name="password"
      />
    </AuthForm>
  );
};

export default SignIn;
