"use client";
import { continueWithCredentials } from "@/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC } from "react";
// import { Input } from "@nextui-org/react";
// import AuthForm from "@/app/components/AuthForm";
import { useFormState } from "react-dom";
// import { continueWithCredentials } from "@/app/actions/auth";

interface Props { }

const SignIn: FC<Props> = () => {
  const [state, signInAction] = useFormState(continueWithCredentials, {});
 
  const {data,status}=useSession();
  const loading=status==="loading"
  if(data || loading){
    redirect("/")
  }
  return (
    <AuthForm
      footerItems={[
        { label: "Create an account", linkText: "Sign Up", link: "/sign-up" },
        {
          label: "Having trouble",
          linkText: "Forget password",
          link: "/forget-password",
        },
      ]}
      btnLabel="Sign In"
      title="Log In"
      action={signInAction}
    >
      <Input placeholder="sonu@email.com" name="email" />
      <Input placeholder="********" type="password" name="password" />
    </AuthForm>
  );
};

export default SignIn;
