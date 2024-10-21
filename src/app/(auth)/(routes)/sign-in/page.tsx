"use client";
import { continueWithCredentials } from "@/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC } from "react";

import { useFormState } from "react-dom";

interface Props { }

const SignIn: FC<Props> = () => {
  const [state, signInAction] = useFormState(continueWithCredentials, {});
 
  const {data,status}=useSession();
  const loading=status==="loading"
  if(data){
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
      <Input className="bg-transparent border-slate-700 border backdrop-blur-xl shadow-xl" placeholder="exmple@gmail.com" name="email" />
      <Input className="bg-transparent border-slate-700 border backdrop-blur-xl shadow-xl" placeholder="Password" type="password" name="password" />
    </AuthForm>
  );
};

export default SignIn;
