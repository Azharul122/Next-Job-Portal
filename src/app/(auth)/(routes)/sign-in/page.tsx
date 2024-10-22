"use client";
import { continueWithCredentials } from "@/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { useFormState } from "react-dom";
import { toast } from "sonner";

interface Props { }

const SignIn: FC<Props> = () => {
  const router = useRouter()
  const [state, signInAction] = useFormState(continueWithCredentials, {});
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const { data, status } = useSession();
 
  useEffect(() => {
    if (state.success !== false || data) {
      router.refresh()

      if (state.success == undefined && data) {
        router.push("/")
      }
      else if (state.success == true) {
        router.push(redirectPath)
        toast.success("✔️ Login success")
      }


    }

    else if (state.success == false) {
      toast.error("❌ Invalid credential")
    }

  }, [data, redirectPath, router, state]);

 



  return (
    <AuthForm
      footerItems={[
        { label: "Create an account", linkText: "Sign Up", link: "/sign-up" },
       
      ]}
      btnLabel="Sign In"
      title="Log In"
      action={signInAction}
    >
      {
        state.error && <div className="flex justify-center items-center py-4 text-red-500 border-slate-800 duration-700">{state.error}</div>
      }
      <Input className="bg-transparent border-slate-700 border backdrop-blur-xl shadow-xl" placeholder="exmple@gmail.com" name="email" />
      {
        state.errors?.email && state.errors?.email.map((error, idx) => (<p key={idx} className="text-red-500">{error}</p>))
      }
      <Input className="bg-transparent border-slate-700 border backdrop-blur-xl shadow-xl" placeholder="Password" type="password" name="password" />

      {
        state.errors?.password && state.errors?.password.map((error, idx) => (<p key={idx} className="text-red-500">{error}</p>))
      }
    </AuthForm>
  );
};

export default SignIn;
